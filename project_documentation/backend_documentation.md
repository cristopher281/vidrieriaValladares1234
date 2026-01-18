# Documentación del Backend y Base de Datos - Vidriería Valladares

## 1. Descripción Técnica

Este backend es una API RESTful diseñada para ser segura, escalable y eficiente.
*   **Lenguaje:** Node.js
*   **Framework:** Express.js
*   **Base de Datos:** Supabase (PostgreSQL)
*   **Almacenamiento:** Supabase Storage (Buckets S3-compatible)

### Dependencias y Librerías
Lista de tecnologías instaladas en el proyecto (`package.json`):

| Librería | Versión Aprox. | Propósito |
| :--- | :--- | :--- |
| **express** | `^5.2.1` | Motor principal del servidor web y manejo de rutas. |
| **@supabase/supabase-js** | `^2.90.1` | SDK oficial para conectar con la base de datos y Auth de Supabase. |
| **multer** | `^1.4.5` | Middleware para manejar la subir archivos (`multipart/form-data`). |
| **cors** | `^2.8.5` | Permite peticiones desde el navegador (Frontend). |
| **dotenv** | `^17.2.3` | Carga variables de entorno (secretos) desde `.env`. |
| **nodemon** | `^3.1.11` | (Dev) Reinicia el servidor automáticamente al guardar cambios. |

---

## 2. Configuración y Entorno

El servidor corre por defecto en el puerto `3000`.
Requiere un archivo `.env` con las siguientes variables:

| Variable | Descripción |
| :--- | :--- |
| `SUPABASE_URL` | URL del proyecto Supabase. |
| `SUPABASE_KEY` | Clave API pública (anon/public). **Nota:** El backend usa esta clave pero escala privilegios usando el Token del usuario. |

---

## 3. Seguridad y Autenticación

El sistema implementa un modelo de seguridad "Zero Trust" en el backend:

1.  **Sin Clave Maestra:** Ya no se usa `ADMIN_SECRET`.
2.  **Tokens JWT:** Para crear, editar o borrar, el Frontend **debe** enviar el Token de sesión del usuario de Supabase.
3.  **Validación:** El middleware `requireAuth` verifica:
    *   Que el header `Authorization: Bearer <token>` exista.
    *   Que el token sea válido y no haya expirado (consultando a Supabase Auth).

### Base de Datos (RLS)
Las políticas de seguridad (Row Level Security) en Supabase están activas:
*   **Lectura (SELECT):** Pública (cualquiera puede ver productos).
*   **Escritura (INSERT/UPDATE/DELETE):** Restringida solo a usuarios autenticados.

---

## 4. API Endpoints

### 🟢 Rutas Públicas

#### `GET /api/products`
Obtiene el catálogo.
*   **Query Params**: `?category=espejos` (opcional).

#### `GET /api/products/:id`
Obtiene un producto por su ID.

---

### 🔒 Rutas Privadas (Admin)
**Requisito:** Header `Authorization: Bearer <TOKEN_SUPABASE>`

#### `POST /api/products` (Crear Producto)
Sube una imagen y crea el registro.

*   **Tipo de Contenido:** `multipart/form-data` (No JSON)
*   **Campos del Formulario:**
    *   `name` (Texto, Requerido)
    *   `price` (Número, Requerido)
    *   `description` (Texto)
    *   `category` (Texto)
    *   `image` (Archivo/Binario) -> **Se sube a Supabase Storage**

#### `PUT /api/products/:id` (Editar Producto)
Actualiza datos o cambia la imagen.

*   **Tipo de Contenido:** `multipart/form-data`
*   **Campos:** Cualquiera de los anteriores. Si se envía `image`, se reemplaza la anterior.

#### `DELETE /api/products/:id` (Eliminar)
Desactiva el producto (Soft Delete).

*   **Respuesta:** `200 OK`

---

## 5. Historial de Cambios
*   **Fase 1 (Legacy):** Imágenes por Google Drive links y Auth por contraseña simple.
*   **Fase 2 (Actual):** Migración completa a Supabase Storage (imágenes nativas) y Supabase Auth (seguridad por Token).
