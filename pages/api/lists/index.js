import connectMongo from "../../../lib/connectMongo"
import ListNames from "../../../models/ListNames"

export default async function handler(req, res) {
  const { method } = req
  console.log("method", method)

  //connect to database
  await connectMongo()

  switch (method) {
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
