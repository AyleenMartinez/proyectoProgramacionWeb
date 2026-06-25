// chat.js - Cliente de chat para NEKOBRELLA CORPORATION.
// Se conecta a Socket.IO y mantiene el historial local por sala.

const socket = io();

const usuarioInput = document.getElementById('usuario-nombre');
const salaSelect = document.getElementById('sala-seleccion');
const botonUnirse = document.getElementById('boton-unirse');
const salaActivaLabel = document.getElementById('sala-activa');
const usuarioConectadoLabel = document.getElementById('usuario-conectado');
const buscarHistorialInput = document.getElementById('buscar-historial');
const chatMensajes = document.getElementById('chat-mensajes');
const mensajeTextoInput = document.getElementById('mensaje-texto');
const archivoAdjuntoInput = document.getElementById('archivo-adjunto');
const archivoNombreSpan = document.getElementById('archivo-nombre');
const botonEnviar = document.getElementById('boton-enviar');
const emojiButtons = document.querySelectorAll('.chat-actions button');

const HISTORIAL_BATCH = 15;
let salaActual = null;
let usuarioActual = null;
let historialActual = [];
let historialInicio = 0;
let cargandoMas = false;
let busquedaActiva = false;
let audioContext = null;

// Crea o reutiliza un AudioContext para reproducir un sonido corto.
// Esto se hace en el cliente para evitar dependencias externas
// y para que el sonido no rompa la aplicación si el navegador bloquea autoplay.
function crearAudioContext() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) {
        return null;
    }

    try {
        if (!audioContext) {
            audioContext = new AudioCtx();
        }

        if (audioContext.state === 'suspended') {
            audioContext.resume().catch(() => {
                // Si el navegador bloquea autoplay, no detener el chat.
            });
        }

        return audioContext;
    } catch (error) {
        console.warn('No se puede crear AudioContext:', error);
        return null;
    }
}

function reproducirSonidoMensaje() {
    const ctx = crearAudioContext();
    if (!ctx) {
        return;
    }

    try {
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.value = 520;
        gain.gain.value = 0.08;

        oscillator.connect(gain);
        gain.connect(ctx.destination);

        oscillator.start();
        oscillator.stop(ctx.currentTime + 0.12);
    } catch (error) {
        console.warn('Error reproduciendo sonido de mensaje:', error);
    }
}

const notificacion = document.createElement('div');
notificacion.className = 'chat-notificacion';
notificacion.style.position = 'fixed';
notificacion.style.right = '20px';
notificacion.style.top = '20px';
notificacion.style.padding = '12px 18px';
notificacion.style.background = 'rgba(209, 47, 47, 0.92)';
notificacion.style.color = '#fff';
notificacion.style.borderRadius = '18px';
notificacion.style.boxShadow = '0 14px 40px rgba(0,0,0,0.32)';
notificacion.style.opacity = '0';
notificacion.style.transition = 'opacity 0.3s ease';
notificacion.style.zIndex = '999';
notificacion.style.pointerEvents = 'none';
document.body.appendChild(notificacion);

// Función para generar el nombre de la clave de localStorage para una sala.
function obtenerClaveHistorial(sala) {
    return `nekobrella_chat_historial_${sala}`;
}

// Carga el historial completo de una sala desde localStorage.
function cargarHistorial(sala) {
    const raw = localStorage.getItem(obtenerClaveHistorial(sala));
    if (!raw) {
        return [];
    }

    try {
        return JSON.parse(raw);
    } catch (error) {
        console.warn('Historial corrupto en localStorage, se reiniciará.', error);
        localStorage.removeItem(obtenerClaveHistorial(sala));
        return [];
    }
}

// Guarda el historial completo de una sala en localStorage.
function guardarHistorial(sala, mensajes) {
    localStorage.setItem(obtenerClaveHistorial(sala), JSON.stringify(mensajes));
}

// Guarda un mensaje en localStorage si no existe ya.
function guardarMensaje(sala, mensaje) {
    const historial = cargarHistorial(sala);

    if (historial.some((item) => item.id === mensaje.id)) {
        return historial;
    }

    historial.push(mensaje);
    guardarHistorial(sala, historial);
    return historial;
}

// Formatea la fecha en una cadena legible.
function formatearFecha(isoString) {
    const fecha = new Date(isoString);
    const horas = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    return `${horas}:${minutos}`;
}

// Convierte el formato recibido desde el servidor a un objeto
// uniforme para que el resto del cliente siempre trabaje igual.
function normalizarMensajeServer(data) {
    if (data && typeof data.texto === 'object') {
        const payload = data.texto;
        return {
            id: payload.id || `${Date.now()}_${Math.random().toString(16).slice(2)}`,
            usuario: payload.usuario || data.usuario || 'Sistema',
            texto: payload.mensaje || payload.texto || '',
            fecha: payload.fecha || data.fecha || new Date().toISOString(),
            archivo: payload.archivo || null,
            imagen: payload.imagen || data.imagen || null,
            sala: payload.sala || salaActual || 'Desconocido',
        };
    }

    return {
        id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
        usuario: data.usuario || 'Sistema',
        texto: data.texto || '',
        fecha: data.fecha || new Date().toISOString(),
        archivo: data.archivo || null,
        imagen: data.imagen || null,
        sala: salaActual || 'Desconocido',
    };
}

// Crea un elemento de mensaje DOM para mostrar en pantalla.
function crearElementoMensaje(mensaje) {
    const mensajeElemento = document.createElement('article');
    mensajeElemento.className = 'chat-mensaje';

    const cabecera = document.createElement('div');
    cabecera.className = 'mensaje-cabecera';
    cabecera.innerHTML = `<strong>${mensaje.usuario}</strong> <span>${formatearFecha(mensaje.fecha)}</span>`;

    const contenido = document.createElement('p');
    contenido.className = 'mensaje-texto';
    contenido.textContent = mensaje.texto || '';

    mensajeElemento.appendChild(cabecera);
    mensajeElemento.appendChild(contenido);

    // Si el mensaje contiene una imagen en Base64,
    // se crea dinámicamente una etiqueta <img>.
    if (mensaje.imagen) {
        const imagen = document.createElement('img');
        imagen.src = mensaje.imagen;
        imagen.alt = mensaje.archivo || 'Imagen adjunta';
        imagen.className = 'mensaje-imagen';
        mensajeElemento.appendChild(imagen);
    }

    if (mensaje.archivo) {
        const archivoEtiqueta = document.createElement('p');
        archivoEtiqueta.className = 'mensaje-archivo';
        archivoEtiqueta.textContent = `Archivo adjunto: ${mensaje.archivo}`;
        mensajeElemento.appendChild(archivoEtiqueta);
    }

    if (mensaje.usuario === usuarioActual) {
        mensajeElemento.classList.add('mensaje-yo');
    } else if (mensaje.usuario === 'Sistema') {
        mensajeElemento.classList.add('mensaje-sistema');
    } else {
        mensajeElemento.classList.add('mensaje-otro');
    }

    return mensajeElemento;
}

// Renderiza un conjunto de mensajes en el DOM.
function renderizarMensajes(mensajes, opciones = {}) {
    const { limpiar = false, prepend = false } = opciones;

    if (limpiar) {
        chatMensajes.innerHTML = '';
    }

    mensajes.forEach((mensaje) => {
        const elemento = crearElementoMensaje(mensaje);
        if (prepend) {
            chatMensajes.prepend(elemento);
        } else {
            chatMensajes.appendChild(elemento);
        }
    });
}

// Muestra una notificación visual breve en la página.
function mostrarNotificacion(texto) {
    notificacion.textContent = texto;
    notificacion.style.opacity = '1';

    setTimeout(() => {
        notificacion.style.opacity = '0';
    }, 2600);
}

// Actualiza la información de estado de sala y usuario en el panel.
function actualizarEstado() {
    salaActivaLabel.textContent = salaActual || 'No conectado';
    usuarioConectadoLabel.textContent = usuarioActual || 'Sin sesión';
}

// Deshabilita o habilita la interfaz de envío según el estado de conexión.
function actualizarEstadoEnvio() {
    const activo = Boolean(salaActual && usuarioActual);
    mensajeTextoInput.disabled = !activo;
    archivoAdjuntoInput.disabled = !activo;
    botonEnviar.disabled = !activo;
    emojiButtons.forEach((boton) => {
        boton.disabled = !activo;
    });
}

// Carga la página más reciente del historial al unirse a una sala.
function cargarHistorialInicial() {
    historialActual = cargarHistorial(salaActual);
    historialInicio = Math.max(0, historialActual.length - HISTORIAL_BATCH);

    const mensajesParaMostrar = historialActual.slice(historialInicio);
    renderizarMensajes(mensajesParaMostrar, { limpiar: true });
    scrollAlFinal();
}

// Agrega un nuevo mensaje al historial y lo guarda.
function registrarMensajeLocal(mensaje) {
    historialActual = guardarMensaje(salaActual, mensaje);
}

// Envía un mensaje al servidor usando Socket.IO.
// Si hay imagen adjunta, la convierte a Base64 con FileReader.
function enviarMensaje() {
    if (!salaActual || !usuarioActual) {
        return;
    }

    const texto = mensajeTextoInput.value.trim();
    const archivo = archivoAdjuntoInput.files[0];

    if (!texto && !archivo) {
        return;
    }

    // Si existe archivo y es imagen, se convierte a Base64.
    if (archivo && archivo.type.startsWith('image/')) {
        const lector = new FileReader();

        lector.onload = function (event) {
            enviarAlServidor(texto, archivo.name, event.target.result);
        };

        lector.readAsDataURL(archivo);
        return;
    }

    // Si no hay archivo o no es imagen, se envía solo el nombre.
    const nombreArchivo = archivo ? archivo.name : null;
    enviarAlServidor(texto, nombreArchivo, null);
}

// Construye el objeto del mensaje y lo envía mediante Socket.IO.
function enviarAlServidor(texto, nombreArchivo, imagenBase64) {
    const mensaje = {
        id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
        usuario: usuarioActual,
        sala: salaActual,
        mensaje: texto,
        fecha: new Date().toISOString(),
        archivo: nombreArchivo,
        imagen: imagenBase64,
    };

    socket.emit('chatMessage', mensaje);
    registrarMensajeLocal(mensaje);

    mensajeTextoInput.value = '';
    archivoAdjuntoInput.value = '';

    if (archivoNombreSpan) {
        archivoNombreSpan.textContent = '';
    }
}

function actualizarNombreArchivo() {
    if (!archivoNombreSpan) {
        return;
    }

    const archivo = archivoAdjuntoInput.files[0];
    archivoNombreSpan.textContent = archivo ? archivo.name : '';
}

archivoAdjuntoInput.addEventListener('change', actualizarNombreArchivo);

// Muestra mensajes previos cuando el usuario llega al inicio del panel.
function cargarMasHistorial() {
    if (cargandoMas || busquedaActiva) {
        return;
    }

    if (historialInicio <= 0) {
        return;
    }

    cargandoMas = true;
    const anteriorInicio = Math.max(0, historialInicio - HISTORIAL_BATCH);
    const mensajesAnteriores = historialActual.slice(anteriorInicio, historialInicio);
    const desplazamientoAntes = chatMensajes.scrollHeight;

    renderizarMensajes(mensajesAnteriores, { prepend: true });
    historialInicio = anteriorInicio;

    // Ajuste de scroll para mantener la posición del usuario.
    const desplazamientoDespues = chatMensajes.scrollHeight;
    chatMensajes.scrollTop = desplazamientoDespues - desplazamientoAntes;
    cargandoMas = false;
}

// Devuelve el historial filtrado por la búsqueda activa.
function filtrarHistorial(busqueda) {
    const textoBusqueda = busqueda.toLowerCase();

    if (!textoBusqueda) {
        return historialActual.slice(historialInicio);
    }

    return historialActual.filter((mensaje) => {
        const contenido = `${mensaje.usuario} ${mensaje.texto} ${mensaje.archivo || ''}`.toLowerCase();
        return contenido.includes(textoBusqueda);
    });
}

// Ajusta el panel de mensajes para bajar al final.
function scrollAlFinal() {
    chatMensajes.scrollTop = chatMensajes.scrollHeight;
}

// Maneja el evento de unirse a sala.
function manejarUnirseSala() {
    const nombreUsuario = usuarioInput.value.trim();
    const sala = salaSelect.value;

    if (!nombreUsuario) {
        usuarioInput.focus();
        usuarioInput.classList.add('input-error');
        setTimeout(() => usuarioInput.classList.remove('input-error'), 1000);
        return;
    }

    usuarioActual = nombreUsuario;
    salaActual = sala;
    busquedaActiva = false;
    buscarHistorialInput.value = '';

    actualizarEstado();
    actualizarEstadoEnvio();
    cargarHistorialInicial();

    socket.emit('joinRoom', { usuario: usuarioActual, sala: salaActual });
    mostrarNotificacion(`Conectado a la sala ${salaActual}`);
}

// Maneja la llegada de mensajes desde Socket.IO.
socket.on('message', (data) => {
    if (!salaActual) {
        return;
    }

    const mensaje = normalizarMensajeServer(data);
    registrarMensajeLocal(mensaje);

    // Si hay búsqueda activa, solo mostramos si coincide con la consulta.
    if (busquedaActiva) {
        const textoBusqueda = buscarHistorialInput.value.trim().toLowerCase();
        const contenido = `${mensaje.usuario} ${mensaje.texto} ${mensaje.archivo || ''}`.toLowerCase();
        if (!textoBusqueda || !contenido.includes(textoBusqueda)) {
            return;
        }
    }

    renderizarMensajes([mensaje], { limpiar: false, prepend: false });
    scrollAlFinal();

    if (mensaje.usuario !== usuarioActual || mensaje.usuario === 'Sistema') {
        reproducirSonidoMensaje();
    }

    mostrarNotificacion(`Nuevo mensaje de ${mensaje.usuario}`);
});

// Conecta las acciones del DOM a las funciones del chat.
botonUnirse.addEventListener('click', manejarUnirseSala);
botonEnviar.addEventListener('click', enviarMensaje);

mensajeTextoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        enviarMensaje();
    }
});

buscarHistorialInput.addEventListener('input', () => {
    const termino = buscarHistorialInput.value.trim();
    busquedaActiva = Boolean(termino);
    const mensajes = filtrarHistorial(termino);
    renderizarMensajes(mensajes, { limpiar: true });
    if (!busquedaActiva) {
        scrollAlFinal();
    }
});



chatMensajes.addEventListener('scroll', () => {
    if (chatMensajes.scrollTop === 0) {
        cargarMasHistorial();
    }
});

emojiButtons.forEach((boton) => {
    boton.addEventListener('click', () => {
        mensajeTextoInput.value += boton.textContent;
        mensajeTextoInput.focus();
    });
});

/* ======================================
   BOTÓN ABANDONAR CANAL
====================================== */

const botonAbandonar = document.getElementById('boton-abandonar');

if (botonAbandonar) {
    botonAbandonar.addEventListener('click', () => {

        // Recarga la página para volver al estado inicial del chat.
        // Es una forma simple de cerrar la sesión del chat y reconectar
        // automáticamente cuando el usuario vuelva a ingresar.
        location.reload();

    });
}



// Inicia la interfaz en modo no conectado para evitar envíos antes de unirse.
actualizarEstadoEnvio();
