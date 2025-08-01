
import mongoose from "mongoose";

const connectDb = async () => {

   mongoose.connection.on('connection' , () => 
  {
    console.log( " Database Connected ")
  })

  await  mongoose.connect(process.env.MONGO_URL);

}


export default connectDb ;