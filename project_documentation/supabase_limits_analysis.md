# Análisis de Límites: Plan Gratuito de Supabase

Este documento analiza si el plan gratuito de Supabase es suficiente para **Vidriería Valladares**, considerando el tráfico y el almacenamiento de imágenes.

---

## 1. Límites Principales (Free Tier)

| Recurso | Límite Gratuito (Mensual) | ¿Qué significa? |
| :--- | :--- | :--- |
| **Banda de Ancha (Egress)** | **5 GB** | La cantidad de datos que tus clientes descargan (al ver imágenes) cada mes. |
| **Almacenamiento (Base de Datos)** | **500 MB** | Espacio para texto (productos, usuarios, ventas). Es *muchísimo* para texto. |
| **Almacenamiento (Archivos/Images)** | **1 GB** | Espacio total para guardar tus fotos en la nube. |
| **Usuarios Activos (MAU)** | **50,000** | Personas distintas que inician sesión en un mes. |

---

## 2. Análisis del Caso: Vidriería Valladares

### Escenario: Uso de Imágenes
El consumo principal será la **Banda de Ancha** al cargar las fotos de los productos.

*   **Suposición:**
    *   Cada foto de producto (optimizada) pesa: **200 KB** (0.2 MB).
    *   Límite de Banda Ancha: **5 GB** (5,000 MB).

*   **Cálculo:**
    $$ 5,000 \text{ MB} / 0.2 \text{ MB por foto} = 25,000 \text{ visualizaciones de fotos} $$

**Conclusión:**
Tus clientes pueden ver **25,000 fotos al mes** antes de llegar al límite.
*   Si un cliente ve 10 productos por visita, eso equivale a **2,500 visitas de clientes al mes**.
*   Para un negocio local, este límite es **bastante holgado**.

### ¿Qué pasa si te pasas?
1.  **No se bloquea inmediatamente:** Supabase suele enviar advertencias primero.
2.  **Límites Duros:** Si el exceso es abusivo, podrían restringir el acceso temporalmente hasta el siguiente mes o pedirte que actualices al plan Pro ($25/mes).

---

## 3. Recomendaciones para Ahorrar Datos (Optimización)

Para que el plan gratuito dure "para siempre", sigue estros consejos técnicos:

1.  **Optimizar Imágenes:** No subas fotos de 5MB directas de la cámara.
    *   Usa formatos modernos como **WebP**.
    *   Comprime las imágenes antes de subirlas (hay herramientas online gratuitas como TinyPNG).
2.  **Lazy Loading:** Asegúrate de que tu página web use "Lazy Loading" (carga diferida). Esto significa que la imagen solo se descarga si el cliente hace scroll hasta ella.
3.  **Caching:** Los navegadores de los clientes guardan las imágenes (caché). Si un cliente vuelve a entrar mañana, no descarga la imagen de nuevo, no gastando tus datos.

## 4. Veredicto

✅ **Es seguro para empezar.**
Para una vidriería que funciona como catálogo digital, el plan gratuito es más que suficiente. Solo deberías preocuparte si te vuelves viral a nivel nacional o tienes miles de visitas diarias.
