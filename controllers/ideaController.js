const ideaService = require('../services/ideaService');
const { generarRespuesta } = require('../services/respuestaService');

const registrarIdea = (req, res) => {
    const { nombre, departamento, idea } = req.body;

    // Aquí la idea ya viene validada desde el middleware validarIdea.
    ideaService.saveIdea({ nombre, departamento, idea });

    // Cookie solicitada en la actividad.
    res.cookie('tokenSesion', 'ST-777', {
        maxAge: 600000,
        httpOnly: true,
    });

    return res.send(generarRespuesta({
        tipo: 'respuesta-ok',
        titulo: 'Propuesta registrada',
        mensaje: `La propuesta experimental de ${nombre} fue registrada correctamente para el departamento ${departamento}.`,
        botonTexto: 'Registrar otra propuesta',
        botonLink: '/pages/registro.html',
        imagen: '/img/sujeto-m01.svg'
    }));
};

module.exports = {
    registrarIdea,
};