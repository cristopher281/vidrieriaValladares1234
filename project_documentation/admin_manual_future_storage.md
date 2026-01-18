# Manual de Administrador: Gestión de Productos

Este documento describe el proceso para gestionar productos con el nuevo sistema de **Supabase Storage**.

---

## 1. Nuevo Flujo de Trabajo

El sistema ahora funciona de manera intuitiva, eliminando la necesidad de usar Google Drive.

| Característica | Sistema |
| :--- | :--- |
| **Acción** | Subida Directa (Clic y Seleccionar) |
| **Almacenamiento** | Nube de Supabase (Privado y Seguro) |
| **Seguridad** | Requiere inicio de sesión (Token Seguro) |

---

## 2. Pasos para Crear un Producto

### Paso 1: Ingresar al Panel
Inicias sesión en tu aplicación. El sistema te identificará de forma segura.

### Paso 2: Llenar Datos
Ingresas la información básica:
*   Nombre del Producto
*   Precio
*   Descripción
*   Categoría

### Paso 3: Subir la Imagen
En el formulario verás un botón para cargar la foto.
1.  Haces clic en **"Seleccionar Imagen"**.
2.  Eliges la foto desde tu computadora o celular.
3.  **Listo.** No necesitas hacer nada más.

### Paso 4: Guardar
Al presionar "Crear":
1.  La imagen se sube automáticamente a la nube.
2.  El producto se registra en la base de datos.
3.  Aparece inmediatamente en el catálogo público.

---

## 3. Notas para el Desarrollador (Frontend)

Para habilitar esta experiencia en la interfaz visual, asegúrate de:
1.  Usar un `<input type="file" />` en el formulario.
2.  Enviar los datos al backend usando `FormData`.
3.  Incluir el Token de acceso del usuario en los headers (`Authorization: Bearer ...`).

---

**Estado del Sistema:**
✅ Backend: **Listo y Seguro**
✅ Base de Datos: **Lista y Segura**
⏳ Frontend: **Pendiente de Actualización** (requiere cambios visuales)
