import mongoose from "mongoose"

//Ts is telling us that the value we are passing to the function might be undefined,
//which is not compatible with the type of the function's parameter, which only expects a string

const connectMongo = async () => {
  //const URI = process.env.MONGODB_URI
  let MONGODB_URI = process.env.MONGODB_URI

  if (!MONGODB_URI) {
    throw new Error("Invalid URI")
  } else {
    console.log("connect mongo runs")
    return await mongoose.connect(MONGODB_URI)
  }
}

export default connectMongo
