
import express from 'express'
import { register } from "../controllers/authController.js";


const Route = express.Router() ;

Route.post('/register' ,register);



export default Route ;