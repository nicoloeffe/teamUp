
const express = require('express');
const prenotazioniRouter = express.Router();

const controllerPrenotazioni = require('../controllers/controllerPrenotazione');

// middleware > 
prenotazioniRouter.post('/', controllerPrenotazioni.creaPrenotazione);
prenotazioniRouter.get('/',controllerPrenotazioni.getPrenotazioniUtente);

module.exports = prenotazioniRouter;
