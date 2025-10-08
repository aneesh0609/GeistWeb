import jwt from 'jsonwebtoken' ;
import bcrypt from 'bcrypt' ;
import userModel from '../models/authModel.js';




export const register = async (req,res) => 
{
   const{name,email,password} = req.body ;



   if(!name || !email || !password)
   {
      return res.json({success: false , message : "Missing Fields || fill all the fields"}) ;
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


export const login = async (req,res) => 
{

    const{email,password} = req.body ;

    try {

      if(!email || !password)
      {
        return res.status(400).json({success: false , message: "missing fields"});
      }

      const user = await userModel.findOne({email}) ;

      if(!user)
      {
          return res.status(400).json({success: false , message: "invalid email and password"});
      }

       const compPassw =   await bcrypt.compare(password , user.password ) ;

      if(!compPassw)
      {
        return res.status(400).json({success: false , message : "invalid email and password" }) ;
      }

      const token = jwt.sign({id : user._id} , process.env.JWT_SECRET , {expiresIn : '7d' })

      res.cookie('token' , token , {
        httpOnly : true ,
        secure: process.env.NODE_ENV === 'production',
            sameSite:   process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 
      })

       return res.status(200).json({success: true , message: "login Successfully"});
      
    } catch (error) {
      return res.status(500).json({success: false , message: `Internal Server Error `})
    }

}


 export const logout = async (req,res) => 
 {

  try {
      res.clearCookie('token',{
         httpOnly : true ,
        secure: process.env.NODE_ENV === 'production',
            sameSite:   process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      })


      return res.status(200).json({success: true , message: "Logout Successfully"})
  } catch (error) {
     return res.status(500).json({success: false , message: `Internal Server Error `})
  }



 }
