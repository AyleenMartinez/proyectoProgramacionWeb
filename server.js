// ===============================
// NEKOBRELLA CORPORATION
// Servidor principal con Express
// ===============================

// Importamos las dependencias principales del proyecto.
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const http = require('http');
const { Server } = require('socket.io');

// Importamos las rutas separadas del proyecto.
const authRoutes = require('./routes/authRoutes');
const reporteRoutes = require('./routes/reporteRoutes');
const ideaRoutes = require('./routes/ideaRoutes');

// Importamos el middleware que muestra las peticiones en consola.
const logger = require('./middlewares/logger');

// Importamos la configuración del chat Socket.IO.
const configurarChat = require('./socket/chatSocket');

// Creamos la aplicación de Express.
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Render entrega un puerto automático.
// Si no existe, usamos 3000 para trabajar en local.
const PORT = process.env.PORT || 3000;

// ===============================
// Middlewares principales
// ===============================

// Permite leer datos enviados desde formularios HTML.
app.use(express.urlencoded({ extended: true }));

// Permite trabajar con cookies.
app.use(cookieParser());

// Muestra en consola cada petición realizada.
app.use(logger);

// Permite servir archivos estáticos desde la carpeta public.
// Ejemplos:
// /css/style.css
// /js/app.js
// /img/logo.png
// /pages/index.html
app.use(express.static(path.join(__dirname, 'public')));

// ===============================
// Ruta principal
// ===============================

// Cuando se entra a http://localhost:3000/
// se muestra la página principal ubicada en public/pages/index.html.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'index.html'));
});

// ===============================
// Rutas del sistema
// ===============================

// Rutas de login.
app.use(authRoutes);

// Rutas de reportes biológicos.
app.use(reporteRoutes);

// Rutas de registro de propuestas experimentales.
app.use(ideaRoutes);

// ===============================
// Ruta para páginas no encontradas
// ===============================

app.use((req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>404 - NEKOBRELLA</title>
            <link rel="stylesheet" href="/css/style.css">
        </head>
        <body class="respuesta-body">
            <main class="respuesta-servidor respuesta-error">
                <p class="etiqueta-alerta">NEKOBRELLA ERROR SYSTEM</p>
                <h1>404 - Recurso no encontrado</h1>
                <p>La ruta solicitada no existe dentro de NEKOBRELLA CORPORATION.</p>
                <a href="/" class="boton-respuesta">Volver al inicio</a>
            </main>
        </body>
        </html>
    `);
});

// Configuramos el chat de Socket.IO.
configurarChat(io);

// ===============================
// Inicio del servidor
// ===============================

server.listen(PORT, () => {
    console.log(`Servidor NEKOBRELLA CORPORATION activo en puerto ${PORT}`);
});