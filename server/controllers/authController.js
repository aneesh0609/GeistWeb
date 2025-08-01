import jwt from 'jsonwebtoken' ;
import bcrypt from 'bcrypt' ;
import userModel from '../models/authModel.js';




export const register = async (req,res) => 
{
   const{name,email,password} = req.body ;



   if(!name || !email || !password)
   {
      return res.json({success: false , message : "Missing Fields"}) ;
   }

   try {
      
   const existingUser = await userModel.findOne({email}) ;
   
   if(existingUser)
   {
     return res.json({success: false , message: "User Already Exists"}) ;
   }

   const hashedPassword = await bcrypt.hash(password, 10) ;

   const user = new userModel({name,email,password: hashedPassword}) ;
  
   await user.save() ;
  
   const token = jwt.sign({id : user._id} ,process.env.JWT_SECRET , {expiresIn : '7d'}  )

   res.cookie('token' , token , {
    httpOnly: true ,
            secure: process.env.NODE_ENV === 'production',
            sameSite:   process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 
   })
  
   return res.json({success: true , message : "User Registered Successfully"})
    
   } catch (error) {
    
    return res.status(500).json({success: false , message: `Internal Server Error RF`})
    
   }
}

