
import express from 'express'
import { login, register } from "../controllers/authController.js";


const Route = express.Router() ;

Route.post('/register' ,register);
Route.post('/login', login);



export default Route ;