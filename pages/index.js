import React, { useState } from "react"
import Head from "next/head"
import Link from "next/Link"
import AddForm from "../components/AddForm"
import CurrentLists from "../components/CurrentLists"
import connectMongo from "../lib/connectMongo"
import ListNames from "../models/ListNames"

export default function Home({ listNames }) {
  //best practice to pass the props from getServerSidedProps in the initial state?
  const [ListNames, setListNames] = useState(listNames)

  const addList = (name) => {
    setListNames([...ListNames, name])
  }
  return (
    <>
      <AddForm label={"Add a List"} path={"lists"} requestType={addList} />
      <CurrentLists listNames={ListNames} />
    </>
  )
}

// ssp method runs on the backend, gets data, and sends it into
// the React component via props. The code within getServerSideProps()
// is never sent to the client. This makes it a great place to implement our MongoDB queries

// get listNames data from mongo
export async function getServerSideProps() {
  //connect to MONGODB
  await connectMongo()

  try {
    //finds all items in the collection when using only the {}
    const result = await ListNames.find({})
    const listNames = result.map((doc) => {
      const listName = doc.toObject()
      listName._id = listName._id.toString()
      return listName
    })
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
