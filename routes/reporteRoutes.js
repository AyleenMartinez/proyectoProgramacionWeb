const express = require('express');
const reporteController = require('../controllers/reporteController');
const validarReporte = require('../middlewares/validarReporte');

const router = express.Router();

router.post('/enviar', validarReporte, reporteController.enviarReporte);

module.exports = router;