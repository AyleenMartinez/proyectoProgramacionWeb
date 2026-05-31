const { generarRespuesta } = require('../services/respuestaService');

const enviarReporte = (req, res) => {
    const { nombre, apellido, email, comentario } = req.body;

    console.log('Reporte biológico recibido:');
    console.log(`Nombre: ${nombre} ${apellido}`);
    console.log(`Correo: ${email}`);
    console.log(`Comentario: ${comentario}`);

    return res.send(generarRespuesta({
        tipo: 'respuesta-ok',
        titulo: 'Reporte enviado',
        mensaje: 'El incidente ha sido registrado y enviado al equipo de respuesta de NEKOBRELLA.',
        botonTexto: 'Volver al reporte',
        botonLink: '/pages/reporte.html',
        imagen: '/img/biohazard-report.svg'
    }));
};

module.exports = {
    enviarReporte,
};