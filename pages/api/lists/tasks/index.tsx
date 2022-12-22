import connectMongo from "../../../../lib/connectMongo"
import Tasks from "../../../../models/tasks"
import { NextApiRequest, NextApiResponse } from "next"

// bc next allows for server sided rendering it allows us to create our own api
//request is from browser and response is what I send back
//look at express request and response
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  console.log("req in api/lists/ tasks", req.body)
  const id = req.body.id
  //the first is the post request
  //req.query only works with parameters and api routes
  // console.log("req.query", req.query)
  // console.log("req id in task", id)
  console.log("re.body.deleted", req.body.deleted)
  console.log("re.body.completed", req.body.completed)
  //usually here you would process/sanitize the body here

  //connect to database
  await connectMongo()

  switch (method) {
    case "PUT" /* Edit a model by its ID */:
      try {
        const id = req.body.id
        const tasks = await Tasks.findByIdAndUpdate(
          id,
          {
            deleted: req.body.deleted,
            completed: req.body.completed,
          },
          { returnDocument: "after" }
        )
        if (!tasks) {
          return res.status(400).json({ success: false })
        }
        console.log("put response with after", tasks)
        res.status(200).json({ success: true, data: tasks })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
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
