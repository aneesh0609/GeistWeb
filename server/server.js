
import express, { json } from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'


const app = express() ;


app.use(express.json()) ;
app.use(cookieParser()) ;
app.use(cors({credentials : true}));

app.get('/' , (req,res) => {
    res.send("hey mate") ;
} )

app.listen(8000, () => console.log("server started" ) ) ;