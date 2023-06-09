const express= require ('express');
const controllerCampi= require('../controllers/controllerCampo')


const router= express.Router();



router.post('/addcampo',controllerCampi.inserisciCampo);
router.get('/getorari', controllerCampi.getOrariPrenotazione);
router.get('/all', controllerCampi.getAllCampi);

module.exports=router;