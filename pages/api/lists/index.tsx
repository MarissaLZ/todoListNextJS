import connectMongo from "../../../lib/connectMongo"
import ListNames from "../../../models/ListNames"
import { NextApiRequest, NextApiResponse } from "next"

// bc next allows for server sided rendering it allows us to create our own api
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { method } = req

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
