const express = require('express');
const reporteController = require('../controllers/reporteController');

const router = express.Router();

router.post('/enviar', reporteController.enviarReporte);

module.exports = router;
