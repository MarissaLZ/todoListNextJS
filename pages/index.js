import React, { useState } from "react"
import Head from "next/head"
import Link from "next/Link"
import AddForm from "../components/AddForm"
import CurrentLists from "../components/CurrentLists"

//Each Next.js page component allows us to fetch data server-side
//thanks to a function called getStaticProps
//When this function is called, it forces the initial page load is
//rendered server-side, which is great for SEO.
//The page doesn't render until this function completes
//in getStaticprops we are maing a fetch call somewhere and then storing
//data in props called data

// method runs on the backend, gets data, and sends it into
// the React component via props. The code within getServerSideProps()
// is never sent to the client. This makes it a great place to implement
// our MongoDB queries

// export async function getServerSideProps() {
//   try {
//     console.log("CONNECTING TO MONGO")
//     await connectMongo()
//     console.log("CONNECTED TO MONGO")

//     console.log("FETCHING DOCUMENTS")
//     const tests = await ListNames.find()
//     console.log("FETCHED DOCUMENTS")

//     return {
//       props: {
//         namesData: JSON.parse(JSON.stringify(namesData)),
//       },
//     }
//   } catch (error) {
//     console.log(error)
//     return {
//       notFound: true,
//     }
//   }
// }

export default function Home() {
  const [ListNames, setListNames] = useState([])
  // console.log("Listname", ListNames)

  return (
    <>
      {/* make resuable and pass function? */}
      <AddForm label={"Add a List"} />
      <CurrentLists listNames={ListNames} />
    </>
  )
}
