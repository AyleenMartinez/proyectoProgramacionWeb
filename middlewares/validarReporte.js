const { generarRespuesta } = require('../services/respuestaService');

const validarReporte = (req, res, next) => {
    const { nombre, apellido, email, comentario } = req.body;

    // Validamos que ningún campo llegue vacío.
    if (!nombre || !apellido || !email || !comentario) {
        return res.status(400).send(generarRespuesta({
            tipo: 'respuesta-error',
            titulo: 'Reporte incompleto',
            mensaje: 'Debe completar todos los campos antes de enviar el reporte biológico.',
            botonTexto: 'Volver al reporte',
            botonLink: '/pages/reporte.html',
            imagen: '/img/sujeto-m13.svg'
        }));
    }

    // Validamos que el comentario tenga al menos 10 caracteres reales.
    if (comentario.trim().length < 10) {
        return res.status(400).send(generarRespuesta({
            tipo: 'respuesta-error',
            titulo: 'Reporte rechazado',
            mensaje: 'El reporte biológico debe tener al menos 10 caracteres de descripción.',
            botonTexto: 'Volver al reporte',
            botonLink: '/pages/reporte.html',
            imagen: '/img/biohazard-report.svg'
        }));
    }

    next();
};

module.exports = validarReporte;