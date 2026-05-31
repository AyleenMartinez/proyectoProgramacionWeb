// Cuando el HTML ya cargó completo, se activan las funciones del sitio.
// Esto evita errores por intentar buscar elementos antes de que existan.
document.addEventListener('DOMContentLoaded', () => {
    // Contador para el formulario de registro de propuesta experimental.
    activarContadorTexto('idea', 'contador-idea', 20);

    // Contador para el formulario de reporte de incidente biológico.
    activarContadorTexto('comentario', 'contador-comentario', 10);
});

// Función reutilizable para contar caracteres en cualquier input o textarea.
// Recibe:
// idCampo: el id del input/textarea que se quiere contar.
// idContador: el id del elemento donde se mostrará el contador.
// minimo: cantidad mínima de caracteres esperada.
function activarContadorTexto(idCampo, idContador, minimo) {
    // Busca el campo de texto según el id recibido.
    const campo = document.getElementById(idCampo);

    // Busca el contador visual según el id recibido.
    const contador = document.getElementById(idContador);

    // Si la página actual no tiene ese campo o ese contador, no hace nada.
    // Esto permite usar el mismo app.js en todas las páginas sin que se rompa.
    if (!campo || !contador) {
        return;
    }

    // Esta función cuenta los caracteres y actualiza el mensaje del contador.
    const actualizarContador = () => {
        const cantidad = campo.value.length;

        // Muestra cuántos caracteres lleva escritos el usuario.
        contador.textContent = `${cantidad} / ${minimo} caracteres mínimos`;

        // Si cumple el mínimo, cambia el estilo a correcto.
        if (cantidad >= minimo) {
            contador.classList.add('contador-ok');
            contador.classList.remove('contador-error');
        } else {
            // Si todavía no cumple, mantiene el estilo de advertencia.
            contador.classList.add('contador-error');
            contador.classList.remove('contador-ok');
        }
    };

    // Cada vez que el usuario escribe o borra, se actualiza el contador.
    campo.addEventListener('input', actualizarContador);

    // Se ejecuta una vez al cargar para mostrar el contador desde 0.
    actualizarContador();
}