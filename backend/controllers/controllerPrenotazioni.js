 //require da utilizzare
 const Prenotazione= require('../models/prenotazione');
 const Campo =require('../models/campo')
 const Utente = require('../models/utente')
 
 exports.creaPrenotazione = async (req, res) => {             //funzione che crea la prenotazione e la inserisce
                                                              //nei documenti del campo e dell'utente
     const{nome, data, utente, orario} = req.body;
     try{
         //controllo che i campi siano compilati correttamente
         if(!nome || !data || !utente || !orario){
             res.status(400).json({success:false, message: "Compilare tutti i campi "})
             
         }
         //ricerco il campo per inserire la relativa prenotazione
         const findCampo= await Campo.findOne({nome: nome});
         //se non trovo il campo inserito ritorno errore
         if(!findCampo){
             res.status(400).json({success:false, message: "Impossibile trovare il campo inserito. Ricontrollare"})
         }
         //altrimenti procedo con la prenotazione
 
         const nuovaPrenotazione= new Prenotazione({
             campo: findCampo,
             data: data,
             orario: orario
         });
         const findUtente= await Utente.findOne({email: utente.email}) //controllo che l'utente esista
         if(!findUtente){
             //se non esiste ritorno errore
             res.status(400).json({success:false, message:"Impossibile creare la prenotazione: Utente non trovato"})
         }else{
             //altrimenti assegno l'utente e procedo
             nuovaPrenotazione.utente=findUtente;
             //pusho la prenotazione nell'array del relativo campo
             findCampo.prenotazioni.push(nuovaPrenotazione);
             //pusho la prenotazione nell'array del relativo utente
             findUtente.prenotazioni.push(nuovaPrenotazione);
             findUtente.save();
             findCampo.save();
             //salvo
             nuovaPrenotazione.save();
 
             res.status(200).json({success:true, message: "nuova prenotazione creata : "+ nuovaPrenotazione.id})
         }
     }catch(error){
         res.status(401).json({success:false, message: error})
     }
   };
 