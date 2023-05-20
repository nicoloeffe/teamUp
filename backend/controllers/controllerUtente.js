const jwt = require('jsonwebtoken');
const config = require('../config');        //require da utilizzare
const Utente=require('../models/utente');
const invioEmail= require('./email');

//funzione per la registrazione degli utenti
exports.registrazioneUtente= async (req,res)=>{

    //recupero i campi dal body della richiesta
    const {nomeUtente, email, password}= req.body;
    console.log(nomeUtente +" "+ email)

    //controllo che tutti i campi siano compilati
    if(!email || !nomeUtente || !password){
        return res.status(400).json({succes: false, message: "Compilare tutti i campi!"})//se tutti i campi non sono compilati ritorno 400
    }
    //controllo che l'utente non sia gia registrato
    try{
        const findUtente= await Utente.findOne({email: email})
        if(findUtente){
            return res.status(400).json({succes: false, message: "Utente già registrato"})//se l'utente è gia registrato ritorno 400
        }

        //altrimenti procedo con la registrazione

        const newUtente= new Utente({
            nome: nomeUtente,
            email: email,
            password: password,
            ruolo: 'Utente'
        })
        const nuovoUtente= await newUtente.save()
        res.status(201).json({succes:true, message:nuovoUtente})
    }catch (err){
        res.status(500).json({succes:false, message: err})
    }
}

exports.loginUtente = async (req, res) => {
    console.log("Request for login received")
    const { email,password } = req.body
    console.log(email+" "+ password)

    // controllo su campi mancanti
    if (! email || !password)
        return res.status(400).json({ success: false, message: "Compilare tutti i campi" })

    try {
        // recupero utente dal database
        const utente = await Utente.findOne({ email: email })
        

        // se non esiste ritorno 400
        if (!utente)
            return res.status(400).json({ success: false, message: "Utente inesistente" })

        // controllo la password
        const passwordCorretta = await utente.checkPassword(password)

        if (!passwordCorretta)
            return res.status(400).json({ success: false, message: "Password incorretta" })//Se la password è incorretta ritorno 4000

        // se tutto va bene, creo il token aggiungendo i vari campi utili
        const token = jwt.sign({
            id: utente._id,
            nome: utente.nome,
            email: utente.email,
            ruolo: utente.ruolo,
        },
            config.SECRET_KEY,
            {
                // il token scade dopo 1 giorno
                expiresIn: "1 day"
            })

        res.status(200).json({ success: true, token: token })//ritorno 200 se la richiesta va a buon fine

    } catch (err) {
        res.status(500).json({ success: false, error: err.message })//se invece ci sono errori diversi ritorno 500
    }
}


exports.recuperaPassword= async (req,res)=>{ //funzione da fare
    console.log("Received request for password recovery")
    const {email}=req.body

    //controllo che il campo inserito sia valido
    if(!email)
        return res.status(400).json({succes:false, message:"email not provided"})
   
    try{
        //controllo se esiste l'utente
        const user= await Utente.findOne({email:email})
        if(!user){
            return res.status(400).json({success:false, message:"Could not find the email"})
        }
        //creo un token random e lo salvo 

        const resetToken= crypto.randomBytes(20).toString('hex')

        user.tokenRecuperoPassword=crypto.createHash('sha256').update(resetToken).digest('hex')

        //impostazione del tempo massimo per eseguire la procedura di reset
        user.scadenzaRecuperoPassword=Date.now() + 10*60*1000 //10 minuti (?)

        await user.save();
        const resetURL = `http://${config.HOST}:${config.FRONT_PORT}/resetpassword/${resetToken}`

        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password</p>
            <a href=${resetURL} clicktracking=off>${resetURL}`

            try{
                await invioEmail({
                    to:user.email,
                    subject:'Richiesta reset password',
                    text: message
                })
                res.status(200).json({success:true, messaggio:'email correctly sent'})
            }catch(err){
                //reset dei campi nel database, operazione non andata a buon fine
                user.tokenRecuperoPassword=undefined;
                user.scadenzaRecuperoPassword=undefined;
                await user.save();
                res.status(500).json({success:false, message: err})
            }
    }catch(err){
        res.status(500).json({success:false,message:err})
    }
}

//funzione per il cambio password
exports.cambioPassword= async (req,res)=>{
    
    //recupero i campi dal body della richiesta
    const{email, oldPassword, newPassword}=req.body;
    
    //controllo che i campi non siano vuoti
    if(!email||!oldPassword || !newPassword){
        res.status(400).json({succes:false, message:"Empty fields were given in the request"})//se vuoti ritorno 400
    }
    try{
        const userFind= await Utente.findOne({email:email});//cerco l'utente
        
        if(!userFind){
            res.status(400).json({succes:false, message:"User non found"})//se non viene trovato invio 400
        }
        const correctPassword= await userFind.checkPassword(oldPassword);//check della password
        
        if(!correctPassword){
            return res.status(401).json({succes:false, message:"Old password provided is wrong"})//se incorretta ritorno 401
        }
        //setto la nuova password e salvo le modifiche
        userFind.password=newPassword; 

        await userFind.save();

        res.status(200).json({success:true, message:"Succesfully changed your password"})//ritorno 200 se la richiesta va a buon fine
    }catch(err){
        res.status(500).json({succes:false,message:err})
    }

}
