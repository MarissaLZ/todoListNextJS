import mongoose, { Schema, model, models, Model } from "mongoose"

// Models are defined using the Schema interface.
// The Schema allows you to define the fields stored
// in each document along with their validation requirements and default values.

// Schemas are then "compiled" into models using the mongoose.model()
//  method. Once you have a model you can use it to find, create, update, and delete objects of the given type.

export interface IListNames extends mongoose.Document {
  name: String
}
//creating schema
const listNamesSchema = new Schema<IListNames>({
  name: String,
})

const ListNames =
  (models.ListNames as Model<IListNames>) ||
  model<IListNames>("ListNames", listNamesSchema)

export default ListNames
