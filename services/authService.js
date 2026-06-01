// Servicio encargado de validar las credenciales del login.
// En esta versión académica no usamos base de datos,
// por eso las credenciales están definidas directamente aquí.

const validarUsuario = (usuario, clave) => {
    return usuario === 'admin' && clave === '1234';
};

module.exports = {
    validarUsuario,
};