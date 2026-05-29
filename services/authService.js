const validateCredentials = (usuario, clave) => {
    return usuario === 'admin' && clave === '1234';
};

module.exports = {
    validateCredentials,
};
