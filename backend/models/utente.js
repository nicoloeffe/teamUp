const mongoose= require ('mongoose');
const bcrypt= require ('bcryptjs');

const schemaUtente= new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        // regex per controllo email valida
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password:{
        type: String,
        required: true
    },
    ruolo:{
        type: String,
        enum: ['utente','admin'],
        required: true
    },
    prenotazioni:{
        type: [mongoose.Types.ObjectId],
        ref: 'prenotazione'
    },
    campi:{//nel caso di un admin vengono salvati nel documento anche la lista di campi
        type:[mongoose.Types.ObjectId],
        ref:'campo'
    },
    tokenRecuperoPassword: String,
    scadenzaRecuperoPassword: String
})

module.exports=mongoose.model('utente',schemaUtente);