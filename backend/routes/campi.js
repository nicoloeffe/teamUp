const express= require ('express');
const campiRouter = express.Router();

const controllerCampi= require('../controllers/controllerCampo')

campiRouter.post('/addcampo',controllerCampi.inserisciCampo);
campiRouter.get('/getorari', controllerCampi.getOrariPrenotazione);

module.exports = campiRouter;