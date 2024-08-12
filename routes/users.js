import express from 'express';
import controller from '../controllers/userController.js'
import userController from "../controllers/userController.js";
const router = express.Router();

router.get('/',function(req,res,next){
    res.render('index')
})



export default router;