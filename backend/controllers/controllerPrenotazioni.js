// controllers/controllerPrenotazioni.js
const Prenotazione = require('../models/prenotazione');

exports.creaPrenotazione = async (req, res) => {
  try {
    // Estrarre i dettagli della prenotazione dal corpo della richiesta
    const { utenteId, dataPrenotazione, oraPrenotazione } = req.body;

    // Creare una nuova prenotazione utilizzando il modello Prenotazione
    const prenotazione = new Prenotazione({
      utenteId,
      dataPrenotazione,
      oraPrenotazione,
    });

    // Salvare la prenotazione nel database
    await prenotazione.save();

    // Restituire una risposta di successo
    res.status(201).json({ messaggio: 'Prenotazione creata con successo' });
  } catch (errore) {
    // Gestire eventuali errori
    console.error(errore);
    res.status(500).json({ errore: 'Si è verificato un errore' });
  }
};

// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/controllerPrenotazioni');

router.post('/', bookingController.creaPrenotazione);

module.exports = router;
