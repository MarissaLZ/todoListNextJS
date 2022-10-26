import { Schema, model, models } from "mongoose"

// Models are defined using the Schema interface.
// The Schema allows you to define the fields stored
// in each document along with their validation requirements
//  and default values.

// Schemas are then "compiled" into models using the mongoose.model()
//  method. Once you have a model you can use it to find,
//  create, update, and delete objects of the given type.

const listNamesSchema = new Schema({
  name: String,
})

const ListNames = models.ListNames || model("ListNames", listNamesSchema)

export default ListNames

//  _someId: Schema.Types.ObjectId,
//export default mongoose.models?.Village || mongoose.model("Village", VillageSchema);
