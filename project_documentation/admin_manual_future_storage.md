# Manual del Futuro: Subida de Imágenes con Supabase Storage

Este documento describe cómo funcionará el sistema para el Administrador una vez que se implemente la mejora de **Supabase Storage**.

---

## 1. Comparativa de Métodos

| Característica | Método Actual (Google Drive) | Método Futuro (Supabase Storage) |
| :--- | :--- | :--- |
| **Acción Principal** | Copiar y Pegar Enlace | Clic y Seleccionar Archivo |
| **Pasos Requeridos** | 5 pasos (Foto -> Drive -> Permisos -> Copiar -> Pegar) | 3 pasos (Clic -> Seleccionar -> Guardar) |
| **Dependencia** | Requiere cuenta de Google y gestión manual de permisos. | Todo ocurre dentro de tu página web. |
| **Riesgo de Error** | Alto (olvidar ponerlo público, copiar mal el link). | Nulo (el sistema lo maneja todo). |

---

## 2. Flujo de Trabajo del Administrador (Futuro)

Una vez implementada la mejora, esto es lo único que tendrás que hacer para crear un producto con imagen:

### Paso 1: Ingresar al Panel
Entras a tu página de administración como siempre.

### Paso 2: Llenar Datos
Escribes el nombre, precio y descripción del producto.

### Paso 3: Seleccionar Imagen (El Cambio Principal)
En lugar de ver una caja de texto para pegar un link "raro", verás un botón o un área que dice:
> **"Subir Imagen del Producto"**
> *Arrastra tu imagen aquí o haz clic para buscarla*

1.  Haces **Clic** en ese botón.
2.  Se abre la ventana de archivos de tu computadora o celular.
3.  Seleccionas la foto del producto.

### Paso 4: Guardar
Presionas "Crear Producto".
*   **Automáticamente:** Una barra de carga aparecerá mientras la imagen se sube a la nube segura.
*   Al finalizar (1-2 segundos), el producto aparecerá listo en tu catálogo.

---

## 3. Requisitos para Lograrlo
Para que esto sea una realidad, el programador (o tú siguiendo la guía técnica) debe realizar los siguientes cambios en la página web (Frontend):

1.  **Eliminar Intermediarios:** Quitar el campo de texto `driveLink`.
2.  **Añadir Selector:** Agregar un componente `<input type="file" />` que permita elegir archivos JPG/PNG.
3.  **Conexión:** Conectar ese selector con la función de subida que ya está habilitada en el Backend (ver `improvement_guide.md`).

---

**Resumen:**
El cambio transforma la gestión de la vidriería de un proceso manual y técnico a una experiencia fluida tipo "Red Social".
