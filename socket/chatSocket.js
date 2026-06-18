const usuarios = {};

function configurarChat(io) {
    io.on('connection', (socket) => {
        console.log(`Usuario conectado: ${socket.id}`);

        socket.on('joinRoom', ({ usuario, sala }) => {
            if (!usuario || !sala) return;

            usuarios[socket.id] = { usuario, sala };
            socket.join(sala);

            io.to(sala).emit('message', {
                usuario: 'Sistema',
                texto: `${usuario} se ha unido a la sala ${sala}`,
                fecha: new Date().toISOString(),
            });
        });

        socket.on('chatMessage', (mensaje) => {
            const usuarioConectado = usuarios[socket.id];
            if (!usuarioConectado) return;

            const { usuario, sala } = usuarioConectado;

            io.to(sala).emit('message', {
                usuario,
                texto: mensaje,
                fecha: new Date().toISOString(),
            });
        });

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
