require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 3000;

// --- 1. CONFIGURACIÓN ---
app.use(cors()); 
app.use(express.json());

// Verificación de variables de entorno
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.error("❌ Error: Faltan las credenciales de SUPABASE en el archivo .env");
  process.exit(1);
}

// Conexión a Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// --- 2. UTILIDADES ---

/**
 * Procesa enlaces de Google Drive para intentar obtener una URL directa de imagen.
 * NOTA: Google Drive tiene límites de tasa. Para producción, se recomienda Supabase Storage.
 */
const processDriveLink = (originalLink) => {
  if (!originalLink) return null;
  try {
    // Soporta formatos completos y IDs directos
    const idMatch = originalLink.match(/\/d\/([a-zA-Z0-9_-]+)/) || originalLink.match(/^([a-zA-Z0-9_-]+)$/);
    
    if (!idMatch || !idMatch[1]) return null;

    const fileId = idMatch[1];
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  } catch (error) {
    return null;
  }
};

/**
 * Middleware de seguridad simple
 * En el futuro, usar autenticación real (Supabase Auth).
 * Por ahora, pediremos un header 'x-admin-secret' para escribir datos.
 */
const requireAdmin = (req, res, next) => {
  // Puedes poner una clave secreta en tu .env como ADMIN_SECRET
  // Si no existe, permitimos el paso (Modo desarrollo inseguro)
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret) return next(); 

  const providedSecret = req.headers['x-admin-secret'];
  if (providedSecret !== adminSecret) {
    return res.status(403).json({ error: 'No autorizado. Se requiere clave de administrador.' });
  }
  next();
};

// --- 3. RUTAS (ENDPOINTS) ---

app.get('/', (req, res) => {
  res.send('API de Vidriería Valladares - Estado: Activo 🟢');
});

/**
 * GET /api/products
 * Soporta filtros: ?category=espejos
 */
app.get('/api/products', async (req, res) => {
  try {
    const { category } = req.query;
    
    let query = supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    // Aplicar filtro si existe categoría
    if (category) {
      query = query.ilike('category', `%${category}%`); // Búsqueda flexible (case insensitive)
    }

    const { data, error } = await query;

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos: ' + error.message });
  }
});

/**
 * GET /api/products/:id
 * Obtener un solo producto por ID
 */
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Producto no encontrado' });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/products
 * Crear nuevo producto
 */
app.post('/api/products', requireAdmin, async (req, res) => {
  const { name, description, price, category, driveLink } = req.body;

  // Validaciones
  if (!name || !price) {
    return res.status(400).json({ error: 'Nombre y Precio son obligatorios.' });
  }
  if (parseFloat(price) <= 0) {
    return res.status(400).json({ error: 'El precio debe ser mayor a 0.' });
  }

  const directImageUrl = processDriveLink(driveLink);

  try {
    const { data, error } = await supabase
      .from('products')
      .insert([
        { 
          name, 
          description, 
          price: parseFloat(price), 
          category: category || 'General', 
          image_url: directImageUrl,
          original_drive_link: driveLink
        }
      ])
      .select();

    if (error) throw error;
    res.status(201).json({ message: 'Producto creado', product: data[0] });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * PUT /api/products/:id
 * Actualizar producto (Precio, Stock, Info)
 */
app.put('/api/products/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, driveLink, is_active } = req.body;

  const updates = {};
  if (name) updates.name = name;
  if (description) updates.description = description;
  if (price) updates.price = parseFloat(price);
  if (category) updates.category = category;
  if (is_active !== undefined) updates.is_active = is_active;
  if (driveLink) {
    updates.original_drive_link = driveLink;
    updates.image_url = processDriveLink(driveLink);
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) throw error;
    res.json({ message: 'Producto actualizado', product: data[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE /api/products/:id
 * Eliminado lógico (solo desactiva el producto, no lo borra de la BD)
 * Esto es más seguro para mantener historial de ventas.
 */
app.delete('/api/products/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from('products')
      .update({ is_active: false }) // Soft Delete
      .eq('id', id)
      .select();

    if (error) throw error;
    res.json({ message: 'Producto eliminado (desactivado)', product: data[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`✅ Servidor Vidriería Valladares corriendo en puerto ${port}`);
});
