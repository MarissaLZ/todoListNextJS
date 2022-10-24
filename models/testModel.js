import mongoose from "mongoose"
import { Schema, model, models } from "mongoose"

//test schema
const testSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
})

const Test = models.Test || model("Test", testSchema)

export default Test
