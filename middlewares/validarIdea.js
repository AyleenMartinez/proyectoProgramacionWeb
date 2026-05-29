const validarIdea = (req, res, next) => {
    const { departamento, idea } = req.body;

    if (departamento === 'Informática' && (!idea || idea.length < 20)) {
        return res.status(400).send(`
            <h1>Error</h1>
            <p>Las propuestas técnicas requieren más detalle.</p>
            <a href="/">Volver al inicio</a>
        `);
    }

    next();
};

module.exports = validarIdea;
