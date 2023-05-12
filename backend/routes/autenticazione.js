const express= require ('express');
const router= express.Router();

const controllerUtenti= require('../controllers/controllerUtente');

router.post('/login',controllerUtenti.loginUtente);
router.get('/',controllerUtenti.getping);
router.post('/signin', controllerUtenti.registrazioneUtente);
router.post('/changepass',controllerUtenti.cambioPassword);

module.exports=router;