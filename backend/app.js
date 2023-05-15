const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000; // Puoi modificare la porta se necessario

// Connessione a MongoDB
mongoose.connect('mongodb://127.0.0.1/prenotazioni', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connessione a MongoDB avvenuta con successo');
  })
  .catch((error) => {
    console.error('Errore durante la connessione a MongoDB', error);
  });

// Configurazione del middleware per il parsing del corpo delle richieste
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Avvio del server
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});

const Booking = require('./booking');

/* Rotte per le operazioni CRUD, In queste rotte, stiamo gestendo le
 richieste HTTP per creare una nuova prenotazione, recuperare tutte le 
 prenotazioni, recuperare una singola prenotazione in base all'ID, 
 aggiornare una prenotazione esistente e cancellare una prenotazione.*/

// Creazione di una nuova prenotazione
app.post('/bookings', (req, res) => {
    const { name, surname, date, time } = req.body;

    // Check if the booking date and time is in the past
  const bookingDateTime = new Date(`${date} ${time}`);
  if (bookingDateTime < new Date()) {
    console.log('Cannot book a date and time in the past');
    return res.status(400).json({ error: 'Cannot book a date and time in the past' });
  }
  
    const booking = new Booking({ name, surname, date, time });
  
    booking.save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Errore durante la creazione della prenotazione' });
      });
  });
  
  // Recupero di tutte le prenotazioni
  app.get('/bookings', (req, res) => {
    Booking.find()
      .then((bookings) => {
        res.json(bookings);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Errore durante il recupero delle prenotazioni' });
      });
  });
  
  // Recupero di una singola prenotazione
  app.get('/bookings/:id', (req, res) => {
    const { id } = req.params;
  
    Booking.findById(id)
      .then((booking) => {
        if (!booking) {
          res.status(404).json({ error: 'Prenotazione non trovata' });
        } else {
          res.json(booking);
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'Errore durante il recupero della prenotazione' });
      });
  });
  
  // Aggiornamento di una prenotazione
  app.put('/bookings/:id', (req, res) => {
    const { id } = req.params;
    const { name, surname, date, time } = req.body;
  
    Booking.findByIdAndUpdate(id, { name, surname, date, time }, { new: true })
      .then((booking) => {
        if (!booking) {
          res.status(404).json({ error: 'Prenotazione non trovata' });
        } else {
          res.json(booking);
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'Errore durante l\'aggiornamento della prenotazione' });
      });
  });
  
  // Cancellazione di una prenotazione
  app.delete('/bookings/:id', (req, res) => {
    const { id } = req.params;
  
    Booking.findByIdAndDelete(id)
      .then((booking) => {
        if (!booking) {
          res.status(404).json({ error: 'Prenotazione non trovata' });
        } else {
          res.json({ message: 'Prenotazione cancellata con successo' });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'Errore durante la cancellazione della prenotazione' });
      });
  });

  app.use(express.static('public'));

  
