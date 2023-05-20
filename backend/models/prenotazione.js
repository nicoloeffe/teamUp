const mongoose= require ('mongoose');
const bcrypt= require ('bcryptjs');

const prenotazioneSchema= new mongoose.Schema({
    campo:{
        type: mongoose.Types.ObjectId,
        ref : 'campo'
    },
    dataInizio:{
        type: String,
        required: true
    },
    durata: String, 
    utente:{
        type: mongoose.Types.ObjectId,
        ref: 'utente'
    },
    report:{
        type: mongoose.Types.ObjectId,
        ref: 'report'
    }
})

module.exports= mongoose.model('prenotazione',prenotazioneSchema);