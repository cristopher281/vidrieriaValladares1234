# Documentación del Backend y Base de Datos - Vidriería Valladares

## 1. Descripción General
Este backend es una API RESTful construida con **Node.js** y **Express**, que se conecta a una base de datos **Supabase (PostgreSQL)**. Su función principal es gestionar el catálogo de productos de la vidriería.

## 2. Configuración y Entorno
El servidor corre por defecto en el puerto `3000`.
Requiere un archivo `.env` con las siguientes variables:

| Variable | Descripción |
| :--- | :--- |
| `SUPABASE_URL` | URL del proyecto Supabase. |
| `SUPABASE_KEY` | Clave API pública (anon/public) de Supabase. |
| `ADMIN_SECRET` | (Opcional) Clave secreta para proteger las rutas de escritura (POST, PUT, DELETE). |

> [!WARNING]
> Si `ADMIN_SECRET` no está configurado, el sistema entra en "Modo de desarrollo inseguro" y permite modificaciones sin autenticación.

## 3. Base de Datos (Supabase)
**Proyecto:** `cristopher281's Project` (ID: `gwctixepteuhmalkudlx`)
**Estado:** Activo

### Esquema de Tablas

#### Tabla: `products`
Esta tabla almacena todo el catálogo. Actualmente contiene **0 registros**.

| Columna | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| `id` | `bigint` | **PK**, Identity | Identificador único del producto. |
| `created_at` | `timestamptz` | Default `now()` | Fecha de creación. |
| `name` | `text` | Not Null | Nombre del producto. |
| `description` | `text` | Nullable | Descripción detallada. |
| `price` | `numeric` | Not Null | Precio del producto. |
| `category` | `text` | - | Categoría (ej: "Espejos", "Ventanas"). |
| `image_url` | `text` | - | URL directa de la imagen (procesada para Drive). |
| `original_drive_link` | `text` | Nullable | Link original de Google Drive (si aplica). |
| `is_active` | `boolean` | Default `true` | Indica si el producto es visible (Soft Delete). |

## 4. API Endpoints

### Público

#### `GET /`
- **Descripción**: Verifica el estado de la API.
- **Respuesta**: `"API de Vidriería Valladares - Estado: Activo 🟢"`

#### `GET /api/products`
- **Descripción**: Obtiene la lista de productos activos.
- **Query Params**:
    - `category`: (Opcional) Filtra por categoría (búsqueda flexible).
- **Ejemplo**: `/api/products?category=espejos`

#### `GET /api/products/:id`
- **Descripción**: Obtiene los detalles de un producto específico.

### Privado (Requiere Admin)
Estas rutas requieren el header `x-admin-secret` si `ADMIN_SECRET` está configurado.

#### `POST /api/products`
- **Descripción**: Crea un nuevo producto.
- **Body JSON**:
  ```json
  {
    "name": "Espejo Decorativo",
    "description": "Espejo con marco de madera",
    "price": 150.00,
    "category": "Espejos",
    "driveLink": "https://drive.google.com/..."
  }
  ```
- **Nota**: Convierte automáticamente enlaces de Google Drive a URLs directas.

#### Guía para Administradores: Imágenes desde Google Drive
El sistema permite al administrador "subir" imágenes pegando el enlace de Google Drive.
1. **Subir imagen a Drive**: Sube la foto del producto a tu Google Drive.
2. **Compartir públicamente**: 
   - Clic derecho en la imagen > Compartir.
   - En "Acceso general", cambiar a **"Cualquier persona con el enlace"**.
3. **Copiar enlace**: Copia el enlace y pégalo en el campo `driveLink` al crear el producto.
   - Formato soportado: `https://drive.google.com/file/d/12345abcde.../view...`
4. **Validación**: El sistema extraerá automáticamente el ID `12345abcde...` y generará una imagen visible para la web.

#### `PUT /api/products/:id`
- **Descripción**: Actualiza un producto existente.
- **Body JSON**: Campos a actualizar (`name`, `price`, `is_active`, etc.).

#### `DELETE /api/products/:id`
- **Descripción**: Elimina un producto lógicamente (Soft Delete).
- **Acción**: Establece `is_active = false`. El producto no se borra de la base de datos.

## 5. Notas Adicionales
- **Imágenes**: El sistema está diseñado para procesar enlaces de Google Drive. Se recomienda usar Supabase Storage en producción para mejorar el rendimiento.
- **Autenticación**: Actualmente es básica (clave compartida). Se sugiere implementar Supabase Auth para un panel de administración real.
