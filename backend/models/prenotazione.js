const mongoose= require ('mongoose');
const bcrypt= require ('bcryptjs');

const prenotazioneSchema= new mongoose.Schema({
    campo:{
        type: mongoose.Types.ObjectId,
        ref : 'campo'
    },
    dataInizio:{
        type: Date,
        required: true
    },
    durata: int, 
    utente:{
        type: mongoose.Types.ObjectId,
        ref: 'utente'
    },
    report:{
        type: mongoose.Types.ObjectId,
        ref: ''
    }
})

module.exports= mongoose.model('prenotazione',prenotazioneSchema);