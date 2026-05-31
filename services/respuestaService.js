function generarRespuesta({ tipo, titulo, mensaje, botonTexto, botonLink, imagen }) {
    return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${titulo} - NEKOBRELLA</title>
            <link rel="stylesheet" href="/css/style.css">
        </head>
        <body class="respuesta-body">
            <main class="respuesta-servidor ${tipo}">
                <p class="etiqueta-alerta">NEKOBRELLA RESPONSE SYSTEM</p>

                <img 
                    src="${imagen}" 
                    alt="${titulo}" 
                    class="respuesta-img">

                <h1>${titulo}</h1>
                <p>${mensaje}</p>

                <a href="${botonLink}" class="boton-respuesta">
                    ${botonTexto}
                </a>
            </main>
        </body>
        </html>
    `;
}

module.exports = { generarRespuesta };