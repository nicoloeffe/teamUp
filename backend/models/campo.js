const mongoose=require ('mongoose');
const bcrypt= require ('bcryptjs');

const schemaCampo= new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    posizione:{
        type: String,
        required: true
    },
    descrizione:{
        type: String
    },
    prenotazioni:{
        type: [mongoose.Types.ObjectId],
        ref: 'prenotazioni'
    },
    gestore:{
        type: mongoose.Types.ObjectId,
        ref: 'utente'
    },
    report :{
        type: [mongoose.Types.ObjectId],
        ref: ''
    }
})