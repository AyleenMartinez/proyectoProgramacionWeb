const ideaService = require('../services/ideaService');

const registrarIdea = (req, res) => {
    const { nombre, departamento, idea } = req.body;

    // Guardado lógico (sin DB)
    ideaService.saveIdea({ nombre, departamento, idea });

    // Crear cookie de sesión/registro
    res.cookie('tokenSesion', 'ST-777', {
        maxAge: 600000,
        httpOnly: true,
    });

    res.send(`
        <h1>Propuesta registrada</h1>
        <p>Gracias ${nombre}. Su propuesta para el departamento ${departamento} ha sido registrada.</p>
        <a href="/">Volver al panel</a>
    `);
};

module.exports = {
    registrarIdea,
};
