import connectMongo from "../../../lib/connectMongo"
import ListNames from "../../../models/ListNames"

// bc next allows for server sided rendering it allows us to create our own api
export default async function handler(req, res) {
  const { method } = req
  console.log("method:", method)

  //connect to database
  await connectMongo()

  switch (method) {
    // case "GET":
    //   try {
    //     //find all the names of the lists in our databse
    //     const allNames = await ListNames.find({})
    //     res.status(200).json({ success: true, data: allNames })
    //   } catch (error) {
    //     res.status(400).json({ success: false })
    //   }
    //   break
    case "POST":
      try {
        const listNames = await ListNames.create(req.body)
        // create a new model in the databse
        res.status(201).json({ success: true, data: listNames })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
