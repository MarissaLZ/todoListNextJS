import React from "react"
import { useState } from "react"
import AddForm from "../components/AddForm"
import Tasks from "../models/tasks"
import connectMongo from "../lib/connectMongo"
import { ObjectId, ObjectID } from "bson"
import List from "../components/List"
//Do Not Fetch an API Route from getStaticProps or getStaticPaths bc these only run server sided

// get tasks data from mongo
export async function getServerSideProps({ params }) {
  console.log("params typeof", typeof params.id)
  //connect to MONGODB
  await connectMongo()

  try {
    const result = await Tasks.find({ listId: ObjectId(params.id) })
    console.log("result", result)
    const task = result.map((doc) => {
      const task = doc.toObject()
      task._id = task._id.toString()
      task.listId = task.listId.toString()
      return task
    })
    console.log("Tasks getServerSidedProps", task)
    return {
      props: { taskData: task },
    }
  } catch (error) {
    console.log(error)
    return {
      notFound: true,
    }
  }
}

export default function TaskList({ taskData }) {
  //array of objects
  const [tasks, setTasks] = React.useState(taskData)
  console.log("tasks state", tasks)

  const addTask = (task) => {
    console.log("task inside addTask", task)
    setTasks([...tasks, task])
  }

  return (
    <>
      {/* need to pass the id */}
      <AddForm
        label={"Add a task"}
        path={"lists/tasks"}
        requestType={addTask}
      />
      <List list={tasks} />
    </>
  )
}
//call get ssp and look at the request and then grab the Id
//use id to go to the db and find all the items that match the listSubheaderClasses. return as prop
