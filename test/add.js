import connectMongo from "../../../lib/connectMongo"
import Test from "../../../models/testModel"

//every file we create in this api directory will
// be treated as an individual API endpoint.
//creating an API route and we can write back-end code
// in that file and call it as a REST API.

export default async function addTest(req, res) {
  try {
    console.log("CONNECTING TO MONGO")
    await connectMongo()
    console.log("CONNECTED TO MONGO")

    console.log("CREATING DOCUMENT")
    const test = await Test.create(req.body)
    console.log("CREATED DOC UMENT")

    res.json({ test })
    console.log(res.json({ test }))
  } catch (error) {
    console.log(error)
    res.json({ error })
  }
}

// next.js supports multiple different ways to get data. We can create API endpoints
//  get data by running server-side rendered functions
//  for a particular page, or even generate static pages
//  by getting our data at build-time.

//Each Next.js page component allows us to fetch data server-side
//thanks to a function called getStaticProps
//When this function is called, it forces the initial page load is
//rendered server-side, which is great for SEO.
//The page doesn't render until this function completes
//in getStaticprops we are making a fetch call somewhere and then storing
//data in props called data
