const express = require('express');
const ideaController = require('../controllers/ideaController');
const validarIdea = require('../middlewares/validarIdea');

const router = express.Router();

router.post('/registrar-idea', validarIdea, ideaController.registrarIdea);

module.exports = router;
