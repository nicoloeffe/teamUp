const mongoose= require ('mongoose');
const bcrypt= require ('bcryptjs');

const prenotazioneSchema= new mongoose.Schema({
    nome:{
        type: String,
        ref : 'nome'
    },
    data:{
        type: Date,
        required: true
    },
    orario:{
        type: String,
        ref: 'orario'
    }, 
    report:{
        type: mongoose.Types.ObjectId,
        ref: ''
    }
})

module.exports= mongoose.model('prenotazione',prenotazioneSchema);