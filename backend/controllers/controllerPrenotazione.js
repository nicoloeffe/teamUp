const jwt = require('jsonwebtoken');
const config = require('../config');        //require da utilizzare
const Utente=require('../models/utente');
const invioEmail= require('./email');
const Prenotazione= require('../models/prenotazione');

exports.inserisciPrenotazione= async(req,res)=>{
    const {campo, dataInizio, durata, utente}= req.body;
    const bookingDateTime = new Date(`${date} ${time}`);
    try{
    if(bookingDateTime<new Date()){
        return res.status(400).json({success:false, message:"Invalid date "})
    }
    const booking=new Prenotazione({campo: campo, dataInizio:dataInizio,durata:durata,utente:utente})
    booking.save();
}catch(err){
    res.status(401).json({success:false, message:err})
}
}