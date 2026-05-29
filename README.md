# NEKOBRELLA CORPORATION

## Nombre del proyecto
NEKOBRELLA CORPORATION — Panel interno de investigación felina

## Descripción
NEKOBRELLA CORPORATION es un proyecto de ejemplo que simula un sistema interno de monitoreo y gestión de incidentes biológicos felinos. Provee un panel oscuro orientado a personal autorizado con funcionalidades de login, envío de reportes y registro de propuestas experimentales.

## Arquitectura del proyecto
- `public/` - Recursos estáticos (HTML, CSS, JS, assets).
- `routes/` - Definición de rutas Express que delegan la lógica a controladores.
- `controllers/` - Handlers que procesan peticiones y generan respuestas.
- `middlewares/` - Middlewares personalizados (logger, validaciones, etc.).
- `services/` - Lógica reutilizable y puntos de integración (simulados sin DB).
- `server.js` - Punto de arranque que monta middlewares y rutas.
- `README.md` - Documentación del proyecto.

## Tecnologías utilizadas
- Node.js
- Express
- cookie-parser
- HTML, CSS

## Instalación y ejecución
1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Ejecutar el servidor:
   ```bash
   npm start
   ```
3. Abrir en el navegador:
   ```
   http://localhost:3000
   ```

## Rutas principales
- `POST /login` — Acceso seguro (preserva `usuario` y `clave`).
- `POST /enviar` — Envío de reportes (preserva `nombre`, `apellido`, `email`, `comentario`).
- `POST /registrar-idea` — Registro de propuesta experimental (campos `nombre`, `departamento`, `idea`).

## Notas importantes
- La ruta `/registrar-idea` valida que si `departamento === "Informática"` la `idea` tenga al menos 20 caracteres; de lo contrario responde con el error: "Las propuestas técnicas requieren más detalle.".
- Al registrar una propuesta exitosa se crea la cookie `tokenSesion` con valor `ST-777`.
- No existe persistencia en base de datos; las propuestas se registran en consola mediante `services/ideaService.js`.

## Semana
- Actividad Semana 8 - Programación Web
