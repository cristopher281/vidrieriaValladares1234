# Documentación del Frontend (Client) - Vidriería Valladares

## 1. Descripción Técnica

El frontend es una Single Page Application (SPA) moderna construida con **React** y empaquetada con **Vite**, diseñada para ser rápida, responsiva y fácil de mantener.

*   **Framework:** React 18
*   **Build Tool:** Vite
*   **Estilos:** Tailwind CSS (v4)
*   **Lenguaje:** JavaScript (ES Modules)

### Estructura de Directorios (`client/src`)

| Carpeta | Descripción |
| :--- | :--- |
| `components/` | Componentes reutilizables de UI (Botones, Cartas, Navbar). |
| `pages/` | Vistas principales de la aplicación (Home, Catálogo, Login). |
| `contexts/` | Manejo de estado global (ej: Autenticación, Carrito). |
| `services/` | Lógica de conexión con APIs externas y Supabase. |
| `assets/` | Recursos estáticos (imágenes, iconos). |
| `App.jsx` | Componente raíz y configuración de Rutas. |
| `main.jsx` | Punto de entrada de la aplicación. |
| `supabase.js` | Cliente de conexión a Supabase (Frontend). |

---

## 2. Dependencias Clave (`package.json`)

| Librería | Propósito |
| :--- | :--- |
| **react-router-dom** | Manejo de navegación y rutas (`/`, `/admin`, `/products`). |
| **@supabase/supabase-js** | Conexión directa a Supabase para Auth y consultas públicas. |
| **react-dom** | Renderizado de React en el navegador. |
| **tailwindcss** | Framework de CSS utilitario para el diseño visual. |
| **vite** | Servidor de desarrollo y herramienta de construcción optimizada. |

---

## 3. Configuración y Scripts

El proyecto se encuentra en la carpeta `backend-vidrieria/client`.

### Comandos Disponibles
*   `npm run dev`: Inicia el servido de desarrollo local (usualmente en `http://localhost:5173`).
*   `npm run build`: Genera la versión de producción en la carpeta `dist`.
*   `npm run preview`: Previsualiza la versión de producción localmente.
*   `npm run lint`: Busca errores de código con ESLint.

---

## 4. Notas de Integración (Backend)

Para que el frontend funcione correctamente con el Backend Seguro implementado:

1.  **Imágenes:** El formulario de creación de productos debe usar `<input type="file" />` y enviar `FormData` al endpoint `POST /api/products`.
2.  **Autenticación:** Las peticiones al backend para crear/editar deben incluir el Header: `Authorization: Bearer <TOKEN_DE_SUPABASE>`.
3.  **Supabase:** El frontend usa su propia instancia de `createClient` (en `supabase.js`) para el Login y para leer datos públicos, pero delega las escrituras complejas al Backend.
