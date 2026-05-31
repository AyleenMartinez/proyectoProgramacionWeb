const authService = require('../services/authService');
const { generarRespuesta } = require('../services/respuestaService');

const login = (req, res) => {
    const { usuario, clave } = req.body;

    if (!authService.validateCredentials(usuario, clave)) {
        return res.send(generarRespuesta({
            tipo: 'error',
            titulo: 'Acceso denegado',
            mensaje: 'Usuario o clave incorrectos. El acceso está restringido al personal autorizado.',
            botonTexto: 'Volver al login',
            botonLink: '/pages/login.html',
            imagen: '/img/sujeto-m13.svg'
        }));
    }

    if (req.cookies.nekoSession === 'active') {
        return res.send(generarRespuesta({
            tipo: 'success',
            titulo: 'Acceso autorizado',
            mensaje: 'Sesión ya activa. El personal ha sido reconocido por el sistema.',
            botonTexto: 'Volver al panel',
            botonLink: '/',
            imagen: '/img/sujeto-m07.svg'
        }));
    }

    res.cookie('nekoSession', 'active', {
        maxAge: 3600000,
        httpOnly: true,
    });

    res.send(`
        <h1>Acceso autorizado</h1>
        <p>Credenciales verificadas. Se ha creado una sesión segura en el equipo.</p>
        <a href="/">Volver al panel</a>
    `);
};

module.exports = {
    login,
};
