import express from 'express';
import controller from '../controllers/userController.js'
import validate from '../middlewares/validate.js'
import userSchemas from '../schemas/user.js'


const router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', { title: 'Home' });
});

router.get('/register', function (req, res, next) {
    res.render('register', { title: 'Register' });
});

router.post('/register',validate(userSchemas.register),  controller.register);

router.get('/users', controller.getUsersList);

router.get('/login', function (req, res, next) {
    res.render('login', { title: 'Login' });
});

router.post('/login', validate(userSchemas.login), controller.login);


router.get('/profile/:id',validate(userSchemas.getProfile), controller.getProfile)

router.get('/update', function (req, res, next) {
    res.render('update', { title: 'Update User' });
});
router.get('/delete/:id', function (req, res, next) {
    res.render('update', { title: 'Update User' });
});
router.post('/update', validate(userSchemas.updateProfile), controller.updateProfile);
router.post('/delete/:id', validate(userSchemas.deleteProfile), controller.deleteProfile);

export default router;