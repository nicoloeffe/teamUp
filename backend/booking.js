const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  // Altri campi della prenotazione se necessario
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
