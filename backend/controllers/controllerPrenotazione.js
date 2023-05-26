     //require da utilizzare
const Prenotazione= require('../models/prenotazione');
const Campo =require('../models/campo')

exports.creaPrenotazione = async (req, res) => {
    const{campo, durata, data, utente}= req.body;
    console.log("received")
    try{
        //controllo che i campi siano compilati correttamente
        if(!campo || !durata || !data || !utente){
            res.status(400).json({success:false, message: "Compilare tutti i campi "})
        }
        //ricerco il campo per inserire la relativa prenotazione
        const findCampo= await Campo.findOne({nome: campo.nome});
        //se non trovo il campo inserito ritorno errore
        if(!findCampo){
            res.status(400).json({success:false, message: "Impossibile trovare il campo inserito. Ricontrollare"})
        }
        //altrimenti procedo con la prenotazione
        const nuovaPrenotazione= new Prenotazione({
            campo: campo,
            durata: durata,
            data: data,
            utente: utente
        });
        //pusho la prenotazione nell'array del relativo campo
        findCampo.prenotazioni.push(nuovaPrenotazione);
        findCampo.save();
        //salvo
        nuovaPrenotazione.save();

        res.status(200).json({success:true, message: "nuova prenotazione creata"+ nuovaPrenotazione})

    }catch(error){
        res.status(401).json({success:false, message: error})
    }
  };
