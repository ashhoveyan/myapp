import express from 'express';
import controller from '../controllers/userController.js'
import validate from '../middlewares/validate.js'
import userSchemas from '../schemas/user.js'


const router = express.Router();

router.get('/users',function(req,res,next){
    res.render('index')
})



export default router;