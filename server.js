const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const reporteRoutes = require('./routes/reporteRoutes');
const ideaRoutes = require('./routes/ideaRoutes');
const logger = require('./middlewares/logger');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'index.html'));
});
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger);

app.use(authRoutes);
app.use(reporteRoutes);
app.use(ideaRoutes);

app.listen(PORT, () => {
    console.log(`Servidor NEKOBRELLA CORPORATION activo en: http://localhost:${PORT}`);
});


/*
// 1. Importar las bibliotecas necesarias
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

// 2. Crear la aplicación
const app = express();

// 3. Definir el puerto
const PORT = 3000;

// 4. Middlewares principales
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 5. Ruta para registrar ideas
app.post('/registrar-idea', (req, res) => {
    const { nombre, departamento, idea } = req.body;

    // Validación solicitada en la clase:
    // Si el departamento es Informática, la idea debe tener más de 20 caracteres.
    if (departamento === 'Informática' && idea.length < 20) {
        return res.status(400).send(`
            <h1>Error</h1>
            <p>Las propuestas técnicas requieren más detalle.</p>
            <a href="/">Volver al inicio</a>
        `);
    }

    // Crear cookie de seguimiento
    res.cookie('tokenSesion', 'ST-777', {
        maxAge: 600000,
        httpOnly: true
    });

    res.send(`
        <h1>Excelente trabajo, ${nombre}</h1>
        <p>Tu idea para el departamento de ${departamento} ha sido capturada correctamente.</p>
        <p><strong>Idea registrada:</strong> ${idea}</p>
        <a href="/">Volver al inicio</a>
    `);
});

// 6. Ruta para formulario de contacto
app.post('/enviar', (req, res) => {
    const { nombre, apellido, email, comentario } = req.body;

    console.log(`Datos recibidos: ${nombre} ${apellido} - ${email}`);
    console.log(`Comentario: ${comentario}`);

    res.send(`
        <h1>Gracias ${nombre}</h1>
        <p>Tu comentario ha sido recibido en el servidor.</p>
        <a href="/">Volver al inicio</a>
    `);
});

// 7. Ruta para login con cookie
app.post('/login', (req, res) => {
    const { usuario, clave } = req.body;

    if (req.cookies.miGalleta === 'true') {
        return res.send(`
            <h1>Bienvenido de nuevo, Admin</h1>
            <p>Ya tenías una sesión iniciada gracias a tu cookie.</p>
            <a href="/">Volver al inicio</a>
        `);
    }

    if (usuario === 'admin' && clave === '1234') {
        res.cookie('miGalleta', 'true', {
            maxAge: 3600000,
            httpOnly: true
        });

        res.send(`
            <h1>Bienvenido por primera vez, Admin</h1>
            <p>Se ha guardado una cookie en tu navegador.</p>
            <a href="/">Volver al inicio</a>
        `);
    } else {
        res.send(`
            <h1>Error</h1>
            <p>Usuario o contraseña incorrectos.</p>
            <a href="/">Volver a intentar</a>
        `);
    }
});

// 8. Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}`);
    console.log('Presiona Ctrl + C para detener el servidor.');
});
*/