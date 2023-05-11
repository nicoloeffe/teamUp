const jwt = require('jsonwebtoken');
const config = require('../config');

const Utente=require('../models/utente');

exports.loginUtente = async (req, res) => {
    const { email, password } = req.body

    // controllo su campi mancanti
    if (!email || !password)
        return res.status(400).json({ success: false, message: "Compilare tutti i campi" })

    try {
        // recupero utente dal database
        const utente = await Utente.findOne({ email: email })

        // se non esiste, ritorno un errore
        if (!utente)
            return res.status(400).json({ success: false, message: "Utente inesistente" })

        // controllo la password
        const passwordCorretta = await utente.checkPassword(password)

        if (!passwordCorretta)
            return res.status(400).json({ success: false, message: "Password incorretta" })

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

        res.status(200).json({ success: true, token: token })

    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}
