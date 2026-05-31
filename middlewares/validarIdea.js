const { generarRespuesta } = require('../services/respuestaService');

const validarIdea = (req, res, next) => {
    const { nombre, departamento, idea } = req.body;

    // Validar que ningún campo venga vacío
    if (!nombre || !departamento || !idea) {
        return res.status(400).send(generarRespuesta({
            tipo: 'respuesta-error',
            titulo: 'Datos incompletos',
            mensaje: 'Debe completar nombre, departamento e idea antes de registrar la propuesta.',
            botonTexto: 'Volver al registro',
            botonLink: '/pages/registro.html',
            imagen: '/img/sujeto-m13.svg'
        }));
    }

    // Validar que todas las propuestas tengan más detalle
    if (idea.length < 20) {
        return res.status(400).send(generarRespuesta({
            tipo: 'respuesta-error',
            titulo: 'Propuesta rechazada',
            mensaje: 'Todas las propuestas experimentales requieren más detalle antes de ser registradas (20 caracteres mínimo).',
            botonTexto: 'Volver al registro',
            botonLink: '/pages/registro.html',
            imagen: '/img/sujeto-m13.svg'
        }));
    }

    next();
};

module.exports = validarIdea;