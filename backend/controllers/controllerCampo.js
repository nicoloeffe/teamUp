const Utente= require('../models/utente');
const Report= require('../models/report');
const Campo= require('../models/campo');
const Prenotazione= require('../models/prenotazione');


exports.inserisciCampo= async (req,res)=>{        //in questa funzione viene creato il campo. Non gestisco la creazione di prenotazioni o report
                                                  //perché alla creazione del campo non vengono forniti. Quando viene creata la prenotazione viene
                                                  //automaticamente inserita dal controllerPrenotazione nel rispettivo campo e utente
    
    
    const {nome,posizione,descrizione, gestore}=req.body;
    try{
        const findCampo = await Campo.findOne({nome: nome});
        if(!findCampo){
            //Se non viene trovato il campo, procedo con la creazione
            const newCampo = new Campo({
                nome: nome,
                posizione: posizione,
                descrizione: descrizione,
            })
            const findGest = await Utente.findOne({email: gestore.email})
            if(!findGest){
                //se non viene trovato il gestore indicato viene ritornato un messaggio di errore
                res.status(400).json({success:false, message:" Impossibile trovare il gestore indicato"})
            }
            newCampo.gestore = findGest;
            const nuovoCampo = newCampo.save();
            //newCampo.save();
            res.status(200).json({success:true, message: "Campo creato correttamente"})
        }else res.status(400).json({success:false, message: "Il campo esiste già"})
       
    }catch(error){
        console.log(error)
        res.status(400).json({success:false, message: error})
    }
}

exports.getOrariPrenotazione = async (req,res)=>{        //funzione che, dato il nome del campo e la data
    const {nome, data} = req.body                        //ritorna gli orari in cui ci sono prenotazioni

    try{
        //ricerco il campo con il nome e richiamo la populate per avere il campo prenotazioni con gli oggetti prenotazione
        const findCampo = await Campo
            .findOne({nome: nome})
            .populate({
                path:'prenotazioni', //specifico il path da popolare 
                match: {data: data}, //specifico la data 
                select: 'orario '    //select dell'orario
            }
                
            );

        if (!findCampo) {//se non trovo il campo ritorno errore
            return res.status(404).json({success:false, message: "Campo non trovato!"});
        }
        res.status(200).json({success: true, findCampo})

    }catch(error){
        console.log(error);
        res.status(400).json({success:false, message: error})
    }
}

exports.getCampi = async (req,res)=>{  

  try {
    const findCampo = await Campo.find({  });

    if (findCampo.length === 0) {
      return res.status(404).json({ success: false, message: "Nessun campo non trovato!" });
    }

    res.status(200).json({findCampo });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error });
  }
};