// Cuando la página termina de cargar, recién se ejecuta el código.
// Esto evita que JavaScript busque elementos que todavía no existen en el HTML.
document.addEventListener('DOMContentLoaded', () => {
    iniciarContadorIdea();
});

// Función encargada de activar el contador del formulario de registro.
function iniciarContadorIdea() {
    // Aquí se busca el textarea donde el usuario escribe la idea experimental.
    const ideaTextarea = document.getElementById('idea');

    // Aquí se busca el texto donde se mostrará el número de caracteres escritos.
    const contadorIdea = document.getElementById('contador-idea');

    // Si esta página no tiene el textarea o el contador, la función se detiene.
    // Esto permite usar el mismo app.js en varias páginas sin que dé error.
    if (!ideaTextarea || !contadorIdea) {
        return;
    }

    // Esta función cuenta los caracteres y actualiza el mensaje visual.
    const actualizarContador = () => {
        const cantidad = ideaTextarea.value.length;

        // Se muestra al usuario cuántos caracteres lleva escritos.
        contadorIdea.textContent = `${cantidad} / 20 caracteres mínimos`;

        // Si llega a 20 o más, se marca como correcto.
        if (cantidad >= 20) {
            contadorIdea.classList.add('contador-ok');
            contadorIdea.classList.remove('contador-error');
        } else {
            // Si tiene menos de 20, se mantiene como error visual.
            contadorIdea.classList.add('contador-error');
            contadorIdea.classList.remove('contador-ok');
        }
    };

    // Cada vez que el usuario escribe o borra texto, se actualiza el contador.
    ideaTextarea.addEventListener('input', actualizarContador);

    // Se ejecuta una vez al cargar la página para mostrar el estado inicial.
    actualizarContador();
}