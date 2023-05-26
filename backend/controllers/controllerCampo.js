const config = require('../config'); 
const Campo= require('../models/campo');
const Prenotazione= require('../models/prenotazione');

exports.inserisciCampo= async (req,res)=>{
    const {nome,posizione,descrizione, prenotazioni, gestore, report}=req.body;
    console.log(nome+ " " + posizione);
    try{
    
        //creo intanto il campo
        const newCampo = new Campo({
            nome: nome,
            descrizione: descrizione,
            posizione: posizione,
            gestore: gestore,
            report: report,
        })
        //controllo che il campo prenotazioni esista
        if(!prenotazioni){
            //se non esiste salvo il campo creato senza prenotazioni all'interno
            const nuovoCampo= await newCampo.save();
            console.log(nuovoCampo + " Campo senza prenotazioni creato");
            res.status(200).json({success:true, message: "Campo senza prenotazioni creato"+ " /n" +nuovoCampo})
        }else{
            //in questo caso ci viene fornita la prenotazione. Procedo a crearne una (niente controlli sui campi inseriti)
            const newPrenotazione= new Prenotazione({
                orario: prenotazioni.orario,
                data:prenotazioni.data,
                report: prenotazioni.report,
                campo: newCampo,
                durata: prenotazioni.durata
               })
               //faccio il push della prenotazione creata nel rispettivo array del campo
                newCampo.prenotazioni.push(newPrenotazione)
                //salvo la prenotazione nel rispettivo documento
                newPrenotazione.save()
                //salvo il campo solo dopo la save della prenotazione per evitare pending promises
                const nuovoCampo= await newCampo.save();
                //log di controllo
                console.log(nuovoCampo);
                res.status(200).json({success:true, message: "Campo con prenotazioni creato"+ " /n"+ nuovoCampo})
        }
        
  
       
    }catch(error){
        console.log(error)
        res.status(400).json({success:false, message: error})
    }
}
exports.inserisciPrenotazioneCampo= async (req,res)=>{
    //salvo i parametri del body
    const {nomeCampo, prenotazione}= req.body;
    try{
        //controllo che i parametri esistano
        if(!nomeCampo){
            res.status(400).json({success: false, message : "Il nome del campo risulta vuoto"})
        }
        if(!prenotazione){
            res.status(400).json({success:false, message: "Nessuna prenotazione inserita nella richiesta"})
        }
        //cerco il campo
        const campoTrovato= await Campo.findOne({nome: nomeCampo});
        //controllo che il campo esista
        if(!campoTrovato){
            res.status(400).json({success:false, message: "Impossibile trovare un campo con questo nome"})
        }
        //se il campo esiste allora procedo con la creazione della prenotazione
        const nuovaPrenotazione= new Prenotazione({
            orario: prenotazione.orario,
            report: prenotazione.report,
            durata: prenotazione.durata,
            campo: campoTrovato,
        })
        //salvo la prenotazione facendo il push nel relativo campo
        campoTrovato.prenotazioni.push(nuovaPrenotazione);
        //salvo evitando pending promises
        campoTrovato.save();
        nuovaPrenotazione.save();
        //ritorno codice di successo
        res.status(200).json({success:true, message:"Inserita prenotazione correttamente:"+ " "+nuovaPrenotazione+" nel rispettivo campo " })
    }catch(error){
        res.status(401).json({success:false, message: error})
    }
}

exports.getOrariPrenotazione= async (req,res)=>{
    const {nome}= req.body

    try{
        const findCampo = await Campo
            .findOne({nome: nome})
            .populate('prenotazioni',"-_id orario");

        if (!findCampo) {
            return res.stauts(404).json({success:false, message: "Campo non trovato!"});
        }
        console.log(findCampo.prenotazioni)
        res.status(200).json({success: true, message: findCampo.prenotazioni})

    }catch(error){
        console.log(error);
        res.status(400).json({success:false, message: error})
    }
}