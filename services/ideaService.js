const saveIdea = (ideaObj) => {
    // En este proyecto no hay base de datos. Registramos en consola para auditoría.
    console.log('Idea registrada:');
    console.log(ideaObj);
    return true;
};

module.exports = {
    saveIdea,
};
