import express from 'express';
import controller from '../controllers/tasksController.js'
import validate from "../middlewares/validate.js";
import checkToken from '../middlewares/checkXToken.js';

import userSchemas from "../schemas/tasks.js";
const router = express.Router();



router.post('/create', checkToken, validate(userSchemas.createTask, 'body'), controller.createTask);
router.get('/list', checkToken, controller.getTasksList);
router.get('/single/:userId', checkToken, validate(userSchemas.getTask, 'params'), controller.getTask);
router.put('/update', checkToken, validate(userSchemas.updateTask, 'body'), controller.updateTask);
router.delete('/delete/:userId', checkToken, validate(userSchemas.deleteTask, 'params'), controller.deleteTask);






export default router;