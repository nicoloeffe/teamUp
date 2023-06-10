const Utente = require('../models/utente');
const Report = require('../models/report');
const Campo = require('../models/campo');
const Prenotazione = require('../models/prenotazione');

exports.inserisciCampo = async (req, res) => {
  const { nome, posizione, descrizione, gestore } = req.body;

  try {
    // Cerca un campo con il nome specificato
    const findCampo = await Campo.findOne({ nome });

    if (!findCampo) {
      // Cerca l'utente gestore con l'email specificata
      const findGest = await Utente.findOne({ email: gestore.email });

      if (!findGest) {
        // Se non viene trovato il gestore indicato, restituisce un messaggio di errore
        return res.status(400).json({
          success: false,
          message: "Impossibile trovare il gestore indicato",
        });
      }

      // Crea un nuovo campo con i dati forniti
      const newCampo = new Campo({
        nome,
        posizione,
        descrizione,
        gestore: findGest,
      });

      // Salva il nuovo campo nel database
      await newCampo.save();

      res.status(200).json({ success: true, message: "Campo creato correttamente" });
    } else {
      // Se il campo già esiste, restituisce un messaggio di errore
      res.status(400).json({ success: false, message: "Il campo esiste già" });
    }
  } catch (error) {
    //console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getOrariPrenotazione = async (req, res) => {
  const { nome, data } = req.body;

  try {
    // Trova il campo con il nome specificato e popola le prenotazioni con gli orari che corrispondono alla data specificata
    const findCampo = await Campo.findOne({ nome })
      .populate({
        path: 'prenotazioni',
        match: { data },
        select: 'orario',
      });

    if (!findCampo) {
      // Se il campo non viene trovato, restituisce un messaggio di errore
      return res.status(404).json({ success: false, message: "Campo non trovato!" });
    }

    res.status(200).json({ success: true, findCampo });
  } catch (error) {
    //console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getCampi = async (req, res) => {
  try {
    // Trova tutti i campi nel database
    const findCampo = await Campo.find();

    if (findCampo.length === 0) {
      // Se non vengono trovati campi, restituisce un messaggio di errore
      return res.status(404).json({ success: false, message: "Nessun campo non trovato!" });
    }

    res.status(200).json({ findCampo });
  } catch (error) {
    //console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
