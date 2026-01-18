# Plan de Mejoras: Supabase Storage y Auth

Este documento detalla los pasos técnicos necesarios para migrar de soluciones temporales a una arquitectura más robusta utilizando las capacidades nativas de Supabase.

---

## 1. Migración a Supabase Storage (Imágenes)

**Objetivo:** Reemplazar el uso de enlaces de Google Drive por un almacenamiento de imágenes optimizado y escalable, mejorando la velocidad de carga (CDN) y la gestión de archivos.

### Pasos de Implementación

#### A. Configuración en Supabase Dashboard
1.  Ir a la sección **Storage** del panel de Supabase.
2.  Crear un nuevo **Bucket** llamado `products`.
3.  Configurarlo como **Public Bucket** (para que las imágenes sean accesibles vía URL sin firmar cada petición).
4.  Establecer políticas de acceso (RLS Policies):
    *   **SELECT (Read):** Permitir a todo público (`anon`).
    *   **INSERT/UPDATE/DELETE:** Permitir solo a usuarios autenticados (ver sección Auth).

#### B. Modificaciones en el Backend (`index.js`)
1.  **Dependencias:** Si se planea subir archivos desde el backend, instalar `multer` para procesar `multipart/form-data`.
    ```bash
    npm install multer
    ```
2.  **Lógica de Subida:**
    *   Crear una función que reciba el archivo (buffer) y lo suba al bucket:
        ```javascript
        const { data, error } = await supabase.storage
          .from('products')
          .upload(`public/${fileName}`, fileBuffer, { contentType: fileMimeType });
        ```
    *   Construir la URL pública:
        ```javascript
        const { data } = supabase.storage.from('products').getPublicUrl(`public/${fileName}`);
        const publicUrl = data.publicUrl;
        ```
3.  **Actualizar Endpoint `POST /api/products`:**
    *   Cambiar la recepción de `driveLink` a recepción de un archivo.
    *   Guardar `publicUrl` en el campo `image_url` de la base de datos (ignorar `original_drive_link`).

---

## 2. Implementación de Supabase Auth (Seguridad)

**Objetivo:** Reemplazar la clave compartida (`ADMIN_SECRET`) por un sistema de autenticación real basado en usuarios (JWT), permitiendo roles y mayor seguridad.

### Pasos de Implementación

#### A. Configuración en Supabase Dashboard
1.  Ir a la sección **Authentication**.
2.  En **Providers**, asegurar que **Email** esté habilitado.
3.  Desactivar "Allow new users to sign up" si solo tú serás el administrador, o implementar una lógica para aprobar nuevos admins.
4.  Crear tu usuario administrador manualmente desde la tabla de usuarios o registrándote una vez y luego cerró el registro.

#### B. Modificaciones en el Backend (`index.js`)

1.  **Nuevo Middleware de Autenticación:**
    Reemplazar la función actual `requireAdmin` por una que verifique el Token JWT enviado por el cliente.

    ```javascript
    const requireAuth = async (req, res, next) => {
      // 1. Obtener el token del header (Authorization: Bearer <token>)
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ error: 'Token no proporcionado' });

      const token = authHeader.split(' ')[1];

      // 2. Verificar el usuario con Supabase
      const { data: { user }, error } = await supabase.auth.getUser(token);

      if (error || !user) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
      }

      // (Opcional) Verificar si el usuario tiene rol de 'admin' si decides usar roles.
      
      req.user = user; // Guardar usuario en la request
      next();
    };
    ```

2.  **Proteger Rutas:**
    Aplicar `requireAuth` en las rutas de escritura:
    *   `app.post('/api/products', requireAuth, ...)`
    *   `app.put('/api/products/:id', requireAuth, ...)`
    *   `app.delete('/api/products/:id', requireAuth, ...)`

3.  **Endpoint de Login (Opcional en Backend):**
    Generalmente el Login se hace en el Frontend directamente con Supabase Client. El Frontend obtiene el token y se lo envía al Backend en cada petición.
    *   *Si decides hacerlo todo vía API:* Crear `POST /api/login` que reciba email/password y use `supabase.auth.signInWithPassword`.

### Resumen de Impacto

| Característica | Estado Actual | Estado Propuesto (Mejorado) |
| :--- | :--- | :--- |
| **Imágenes** | Depende de Google Drive (lento, rate limits). | Hospedadas en Supabase CDN (rápido, optimizado). |
| **Seguridad** | Clave única compartida en `.env`. | Usuarios individuales, Tokens JWT, revocación de acceso. |
| **Escalabilidad** | Baja. Riesgo de bloqueo si crece el tráfico. | Alta. Arquitectura estándar de la industria. |
