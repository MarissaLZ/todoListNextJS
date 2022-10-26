import React, { useState } from "react"
import Head from "next/head"
import Link from "next/Link"
import AddForm from "../components/AddForm"
import CurrentLists from "../components/CurrentLists"
import connectMongo from "../lib/connectMongo"
import ListNames from "../models/ListNames"
//Each Next.js page component allows us to fetch data server-side
//thanks to a function called getStaticProps
//When this function is called, it forces the initial page load is
//rendered server-side, which is great for SEO.
//The page doesn't render until this function completes
//in getStaticprops we are making a fetch call somewhere and then storing
//data in props called data

export default function Home({ listNames }) {
  //best practice to pass the props from getServerSidedProps in the initial state?
  //don't need to use spread for initial state
  const [ListNames, setListNames] = useState(listNames)
  console.log("ListNames state", ListNames)

  const addList = (name) => {
    setListNames([...ListNames, name])
  }
  return (
    <>
      {/* make resuable and pass function? */}
      <AddForm label={"Add a List"} path={"lists"} requestType={addList} />
      <CurrentLists listNames={ListNames} />
    </>
  )
}

// method runs on the backend, gets data, and sends it into
// the React component via props. The code within getServerSideProps()
// is never sent to the client. This makes it a great place to implement
// our MongoDB queries

// get listNames data from mongo
export async function getServerSideProps() {
  //connect to MONGODB
  await connectMongo()

  try {
    //finds all items in the collection with the {}
    const result = await ListNames.find({})
    console.log("result", result)
    const listNames = result.map((doc) => {
      const listName = doc.toObject()
      console.log("listName", listName)
      listName._id = listName._id.toString()
      return listName
    })
    console.log("listNames in getServerSidedProps", listNames)
    return {
      props: { listNames: listNames },
    }
  } catch (error) {
    console.log(error)
    return {
      notFound: true,
    }
  }
}
