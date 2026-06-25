// Guarda los usuarios conectados junto con la sala donde participan.
const usuarios = {};

function configurarChat(io) {

    // Se ejecuta cada vez que un cliente se conecta al servidor.
    io.on('connection', (socket) => {

        console.log(`Usuario conectado: ${socket.id}`);

        // Permite que un usuario ingrese a una sala del chat.
        socket.on('joinRoom', ({ usuario, sala }) => {

            if (!usuario || !sala) return;

            usuarios[socket.id] = { usuario, sala };

            socket.join(sala);

            // Notifica a todos los integrantes de la sala.
            io.to(sala).emit('message', {
                usuario: 'Sistema',
                texto: `${usuario} se ha unido a la sala ${sala}`,
                fecha: new Date().toISOString(),
            });
        });

        // Recibe un mensaje desde un cliente y lo distribuye a la sala.
        socket.on('chatMessage', (mensaje) => {

            const usuarioConectado = usuarios[socket.id];

            if (!usuarioConectado) return;

            const { usuario, sala } = usuarioConectado;

            io.to(sala).emit('message', {
                usuario,
                texto: mensaje.mensaje || '',
                fecha: mensaje.fecha || new Date().toISOString(),
                archivo: mensaje.archivo || null,
                imagen: mensaje.imagen || null,
                sala,
            });
        });

        // Elimina al usuario cuando abandona el chat.
        socket.on('disconnect', () => {

            const usuarioDesconectado = usuarios[socket.id];

            if (usuarioDesconectado) {

                const { usuario, sala } = usuarioDesconectado;

                io.to(sala).emit('message', {
                    usuario: 'Sistema',
                    texto: `${usuario} ha abandonado la sala ${sala}`,
                    fecha: new Date().toISOString(),
                });

                delete usuarios[socket.id];
            }

            console.log(`Usuario desconectado: ${socket.id}`);
        });

    });

}

module.exports = configurarChat;