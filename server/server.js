
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import connectDb from './Database/database.js';


const app = express() ;

connectDb();

app.use(express.json()) ;
app.use(cookieParser()) ;
app.use(cors({credentials : true}));

app.get('/' , (req,res) => {
    res.send("hey mate") ;
} )

app.listen(8000, () => console.log("server started" ) ) ;