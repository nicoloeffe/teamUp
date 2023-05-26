const express= require ('express');
const router= express.Router();

const controllerUtenti= require('../controllers/controllerUtente');
const controllerCampi= require('../controllers/controllerCampo')

router.post('/login',controllerUtenti.loginUtente);
router.post('/signin', controllerUtenti.registrazioneUtente);
router.post('/changepass',controllerUtenti.cambioPassword);
router.post('/addcampo',controllerCampi.inserisciCampo);
router.get('/getorari', controllerCampi.getOrariPrenotazione);
router.post('/addprenotazione', controllerCampi.inserisciPrenotazioneCampo)

module.exports=router;