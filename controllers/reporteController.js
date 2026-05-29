const enviarReporte = (req, res) => {
    const { nombre, apellido, email, comentario } = req.body;

    console.log('Reporte biológico recibido:');
    console.log(`Nombre: ${nombre} ${apellido}`);
    console.log(`Correo: ${email}`);
    console.log(`Comentario: ${comentario}`);

    res.send(`
        <h1>Reporte enviado</h1>
        <p>El incidente ha sido registrado y enviado al equipo de respuesta de NEKOBRELLA.</p>
        <a href="/">Volver al panel</a>
    `);
};

module.exports = {
    enviarReporte,
};
