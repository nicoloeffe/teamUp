const express= require ('express');
const router= express.Router();

const controllerUtenti= require('../controllers/controllerUtente');
const controllerPrenotazioni= require('../controllers/controllerPrenotazione');
const checkAuth=require('../middleware/check-auth');

router.post('/login',controllerUtenti.loginUtente);
router.post('/signin', controllerUtenti.registrazioneUtente);
router.post('/changepass',controllerUtenti.cambioPassword);
router.post('/reservation',checkAuth,controllerPrenotazioni.inserisciPrenotazione);

module.exports=router;