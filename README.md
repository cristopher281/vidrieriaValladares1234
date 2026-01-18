# Backend Vidriería Valladares

## Requisitos previos
- Node.js 18 o superior
- npm (Node Package Manager)
- Una cuenta y proyecto en [Supabase](https://supabase.com/)

## Variables de entorno
Crea un archivo `.env` dentro de la carpeta `backend-vidrieria` con el siguiente contenido:

```
SUPABASE_URL=tu_url_de_supabase
SUPABASE_KEY=tu_clave_anon_de_supabase
PORT=3000 # Opcional, por defecto 3000
```

## Instalación
Desde la carpeta `backend-vidrieria`, ejecuta:

```
npm install
```

## Ejecución en desarrollo

```
npm install -g nodemon # Si no tienes nodemon global
nodemon index.js
```

O bien, puedes agregar este script en `package.json`:

```
"scripts": {
  "dev": "nodemon index.js"
}
```
Y luego ejecutar:
```
npm run dev
```

## Endpoints
El backend se levanta por defecto en `http://localhost:3000/`.

## Notas
- Asegúrate de tener las variables de entorno correctamente configuradas.
- Si falta alguna variable, el servidor no iniciará y mostrará un error.
- Para producción, considera usar un gestor de procesos como PM2.
