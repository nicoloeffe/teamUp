const express= require ('express');
const router= express.Router();

const controllerUtenti= require('../controllers/controllerUtente');

router.post('/login',controllerUtenti.loginUtente);
router.get('/',controllerUtenti.getping);

module.exports=router;