import mongoose, { Schema, model, models, Model } from "mongoose"

interface ITasksSchema extends mongoose.Document {
  listId: mongoose.Schema.Types.ObjectId
  name: String
  deleted: boolean
  completed: boolean
}

const tasksSchema = new Schema<ITasksSchema>({
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ListNames",
  },
  name: {
    type: String,
    required: true,
    //unique: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  completed: {
    type: Boolean,
    default: false,
  },
})

const Tasks =
  (models.Tasks as Model<ITasksSchema>) ||
  model<ITasksSchema>("Tasks", tasksSchema)

export default Tasks

//status: active, deleted, complete
// - Items <-- collection
// 	{
// 		_id: <mongo_id>,
// 		title,
// 		status,
// 	}
// db.collection('Items').find({list_id : <id>, status : 'active'}).sort({_id: 1})
