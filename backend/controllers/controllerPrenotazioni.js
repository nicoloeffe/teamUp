// controllers/controllerPrenotazioni.js
const Prenotazione = require('../models/prenotazione');

exports.creaPrenotazione = async (req, res) => {
  try {
    // Estrarre i dettagli della prenotazione dal corpo della richiesta    
    const { nome, data, orario } = req.body;

    if(nome === "" || data === "" || orario === ""){
      return res.status(400).json({success: false, message: "compilare tutti i campi"})
    }
    
    // Creare una nuova prenotazione utilizzando il modello Prenotazione
    const prenotazione = new Prenotazione({
      nome,
      data,
      orario,
    });

    // Salvare la prenotazione nel database
    await prenotazione.save();

    // Restituire una risposta di successo
    res.status(201).json({success: true, message: 'Prenotazione creata con successo' });
  } catch (errore) {
    // Gestire eventuali errori
    console.error(errore);
    res.status(500).json({success: false, message: 'Si è verificato un errore' });
  }
};