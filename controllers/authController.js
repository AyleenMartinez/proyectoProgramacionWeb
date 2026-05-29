const authService = require('../services/authService');

const login = (req, res) => {
    const { usuario, clave } = req.body;

    if (!authService.validateCredentials(usuario, clave)) {
        return res.send(`
            <h1>Acceso denegado</h1>
            <p>Usuario o clave incorrectos. El acceso está restringido al personal autorizado.</p>
            <a href="/">Volver al inicio</a>
        `);
    }

    if (req.cookies.nekoSession === 'active') {
        return res.send(`
            <h1>Acceso autorizado</h1>
            <p>Sesión ya activa. El personal ha sido reconocido por el sistema.</p>
            <a href="/">Volver al panel</a>
        `);
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
