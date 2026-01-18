require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 3000;

// --- 1. CONFIGURACIÓN ---
app.use(cors());
app.use(express.json());

// Configuración de Multer (Almacenamiento en memoria para subir a Supabase)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Verificación de variables de entorno
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.error("❌ Error: Faltan las credenciales de SUPABASE en el archivo .env");
  process.exit(1);
}

// Cliente "Admin" original (para lecturas públicas)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// --- 2. MIDDLEWARES & UTILIDADES ---

/**
 * Middleware de Autenticación (Supabase Auth)
 * Verifica que el usuario tenga un token válido (JWT).
 */
const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Falta el encabezado de autorización (Token)' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      throw new Error('Token inválido o expirado');
    }

    req.user = user; // Guardar usuario en la petición
    next();
  } catch (error) {
    return res.status(401).json({ error: 'No autorizado: ' + error.message });
  }
};

// --- 3. RUTAS (ENDPOINTS) ---

app.get('/', (req, res) => {
  res.send('API de Vidriería Valladares - Estado: Activo 🟢 (Modo Seguro)');
});

// GET Publico
app.get('/api/products', async (req, res) => {
  try {
    const { category } = req.query;
    let query = supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (category) {
      query = query.ilike('category', `%${category}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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
 * POST /api/products (Protegido + Upload)
 * Sube imagen a Supabase Storage y crea el registro.
 * Espera: multipart/form-data
 * Campos: name, price, description, category, image (archivo)
 */
app.post('/api/products', requireAuth, upload.single('image'), async (req, res) => {
  const { name, description, price, category } = req.body;
  const file = req.file;

  if (!name || !price) {
    return res.status(400).json({ error: 'Nombre y Precio son obligatorios.' });
  }

  let finalImageUrl = null;

  try {
    // 1. Crear cliente con contexto de usuario (para respetar RLS si fuera necesario)
    // O usar el token para pasar autenticación.
    // Nota: Si las políticas de Storage son "Authenticated", necesitamos pasar el token.
    const userSupabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
      { global: { headers: { Authorization: req.headers.authorization } } }
    );

    // 2. Subir Imagen (si existe)
    if (file) {
      const fileExt = file.originalname.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
      const filePath = `public/${fileName}`;

      const { data: uploadData, error: uploadError } = await userSupabase.storage
        .from('products')
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Obtener URL Publica
      const { data: urlData } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      finalImageUrl = urlData.publicUrl;
    }

    // 3. Crear Registro en Base de Datos
    // Usamos 'userSupabase' para que el INSERT también sea autenticado
    const { data, error } = await userSupabase
      .from('products')
      .insert([
        {
          name,
          description,
          price: parseFloat(price),
          category: category || 'General',
          image_url: finalImageUrl,
          // original_drive_link ya no es necesario, pero lo dejamos null
        }
      ])
      .select();

    if (error) throw error;
    res.status(201).json({ message: 'Producto creado', product: data[0] });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * PUT /api/products/:id (Protegido)
 */
app.put('/api/products/:id', requireAuth, upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, is_active } = req.body;
  const file = req.file;

  const updates = {};
  if (name) updates.name = name;
  if (description) updates.description = description;
  if (price) updates.price = parseFloat(price);
  if (category) updates.category = category;
  if (is_active !== undefined) updates.is_active = is_active;

  try {
    const userSupabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
      { global: { headers: { Authorization: req.headers.authorization } } }
    );

    // Si hay nueva imagen, subirla y actualizar URL
    if (file) {
      const fileExt = file.originalname.split('.').pop();
      const fileName = `${Date.now()}_${id}.${fileExt}`;
      const filePath = `public/${fileName}`;

      const { error: uploadError } = await userSupabase.storage
        .from('products')
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: true
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      updates.image_url = urlData.publicUrl;
    }

    const { data, error } = await userSupabase
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
 * DELETE /api/products/:id (Protegido)
 */
app.delete('/api/products/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const userSupabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
      { global: { headers: { Authorization: req.headers.authorization } } }
    );

    const { data, error } = await userSupabase
      .from('products')
      .update({ is_active: false })
      .eq('id', id)
      .select();

    if (error) throw error;
    res.json({ message: 'Producto eliminado (desactivado)', product: data[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`✅ Servidor Vidriería Valladares (Seguro + Storage) corriendo en puerto ${port}`);
});
