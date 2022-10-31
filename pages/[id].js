import React from "react"
import { useState } from "react"
import AddForm from "../components/AddForm"
import Tasks from "../models/tasks"
import connectMongo from "../lib/connectMongo"
import { ObjectId, ObjectID } from "bson"
import TodoList from "../components/TodoList"
//Do Not Fetch an API Route from getStaticProps or getStaticPaths bc these only run server sided

// get tasks data from mongo
//use id to go to the db and find all the items that match. return as prop
export async function getServerSideProps({ params }) {
  //connect to MONGODB
  await connectMongo()

  try {
    const incompleteResult = await Tasks.find({
      listId: ObjectId(params.id),
      deleted: false,
      completed: false,
    })
    const incompleteTasks = incompleteResult.map((doc) => {
      const incomplete = doc.toObject()
      incomplete._id = incomplete._id.toString()
      incomplete.listId = incomplete.listId.toString()
      return incomplete
    })

    const completedResult = await Tasks.find({
      listId: ObjectId(params.id),
      deleted: false,
      completed: true,
    })
    const completedTasks = completedResult.map((doc) => {
      const completed = doc.toObject()
      completed._id = completed._id.toString()
      completed.listId = completed.listId.toString()
      return completed
    })
    console.log("completed", completedTasks)

    return {
      props: {
        incompleteTasksData: incompleteTasks,
        completedTasksData: completedTasks,
      },
    }
  } catch (error) {
    console.log(error)
    return {
      notFound: true,
    }
  }
}

export default function TaskList({ incompleteTasksData, completedTasksData }) {
  //array of objects
  const [incompleteTasks, setIncompleteTasks] =
    React.useState(incompleteTasksData)
  const [completedTasks, setCompletedTasks] = React.useState(completedTasksData)

  const addTask = (task) => {
    setIncompleteTasks([...incompleteTasks, task])
  }
  const toggleTaskComplete = (task) => {
    console.log("toggleTaskComplet", task)
    if (task.completed) {
      setCompletedTasks([...completedTasks, task])
      //remeve from incomplete list
      const newList = incompleteTasks.filter((item) => item._id != task._id)
      setIncompleteTasks([...newList])
    } else {
      setIncompleteTasks([...incompleteTasks, task])
      //remove from completed list
      const newList = completedTasks.filter((item) => item._id != task._id)
      setCompletedTasks([...newList])
    }
  }
  const deleteIncompleteTask = (id) => {
    const newList = incompleteTasks.filter((task) => task._id != id)
    setIncompleteTasks([...newList])
  }
  const deleteCompletedTask = (id) => {
    const newList = completedTasks.filter((task) => task._id != id)
    setCompletedTasks([...newList])
  }

  return (
    <>
      <AddForm
        label={"Add a task"}
        path={"lists/tasks"}
        requestType={addTask}
      />
      <TodoList
        list={incompleteTasks}
        deleteTask={deleteIncompleteTask}
        toggleTaskComplete={toggleTaskComplete}
      />
      <TodoList
        list={completedTasks}
        deleteTask={deleteCompletedTask}
        toggleTaskComplete={toggleTaskComplete}
        listTitle={"Completed Tasks"}
      />
    </>
  )
}
