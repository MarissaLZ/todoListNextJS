import connectMongo from "../../../../lib/connectMongo"
import Tasks from "../../../../models/tasks"
// bc next allows for server sided rendering it allows us to create our own api
export default async function handler(req, res) {
  const { method } = req
  console.log("req.body", req.body)
  console.log("method:", method)

  //connect to database
  await connectMongo()

  switch (method) {
    case "POST":
      try {
        const tasks = await Tasks.create(req.body)
        // create a new model in the databse
        res.status(201).json({ success: true, data: tasks })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
