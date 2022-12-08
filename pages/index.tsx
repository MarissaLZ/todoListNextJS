import React, { useState } from "react"
import AddForm from "../components/AddForm"
import CurrentLists from "../components/CurrentLists"
import connectMongo from "../lib/connectMongo"
import ListNames from "../models/listNames"
import { GetServerSideProps } from "next"

export interface ListInfo {
  name: string
  __v: number
  _id: string
}

interface HomeProps {
  listNames: ListInfo[]
}

export default function Home({ listNames }: HomeProps) {
  //best practice to pass the props from getServerSidedProps in the initial state

  console.log("listNames", listNames)
  const [ListNames, setListNames] = useState(listNames)

  const addList = (newList: ListInfo) => {
    setListNames([...ListNames, newList])
  }
  return (
    <>
      <AddForm label="Add a List" path="lists" requestType={addList} />
      <CurrentLists listNames={ListNames} />
    </>
  )
}

// ssp method runs on the backend, gets data, and sends it into
// the React component via props. The code within getServerSideProps()
// is never sent to the client. This makes it a great place to implement our MongoDB queries
//NextJS uses this function to prerender our page with the data returned by this function.
//getServerSideProps is server-side code even though it is in a client-side file.
// When you call a server-side route (e.g., api/users) from getServerSideProps or other static functions, it doesn't work.

// get listNames data from mongo
export const getServerSideProps: GetServerSideProps = async () => {
  //connect to MONGODB
  await connectMongo()

  try {
    //throw new Error()
    //finds all items in the collection when using only the {}
    const result = await ListNames.find({})
    const listNames = result.map((doc) => {
      const listName = doc.toObject<ListInfo>()
      listName._id = listName._id.toString()
      return listName
    })

    return {
      props: { listNames: listNames },
    }
  } catch (error) {
    console.log("error is ssp", error)
    //Setting the notFound prop to true in the catch block, we trigger Next.js’s internal error handling system to return a 404 page
    return {
      notFound: true,
    }
  }
}
