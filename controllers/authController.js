const authService = require('../services/authService');
const { generarRespuesta } = require('../services/respuestaService');

const login = (req, res) => {
    const { usuario, clave } = req.body;

    // Se valida el usuario y la clave usando el servicio de autenticación.
    const credencialesValidas = authService.validarUsuario(usuario, clave);

    // Si las credenciales no son válidas, se responde con error visual.
    if (!credencialesValidas) {
        return res.status(401).send(generarRespuesta({
            tipo: 'respuesta-error',
            titulo: 'Acceso denegado',
            mensaje: 'Usuario o clave incorrectos. El acceso está restringido al personal autorizado.',
            botonTexto: 'Volver al login',
            botonLink: '/pages/login.html',
            imagen: '/img/loginIncorrecto.png'
        }));
    }

    // Si las credenciales son correctas, se crea una cookie de sesión.
    res.cookie('nekoSesion', 'active', {
        maxAge: 600000,
        httpOnly: true,
    });

    // Respuesta visual para login correcto.
    return res.send(generarRespuesta({
        tipo: 'respuesta-ok',
        titulo: 'Acceso autorizado',
        mensaje: 'Credenciales verificadas. Se ha creado una sesión segura en el equipo.',
        botonTexto: 'Volver al panel',
        botonLink: '/pages/index.html',
        imagen: '/img/loginCorrecto.png'
    }));
};

module.exports = {
    login,
};