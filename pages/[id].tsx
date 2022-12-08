import React from "react"
import AddForm from "../components/AddForm"
import Tasks from "../models/tasks"
import connectMongo from "../lib/connectMongo"
import { ObjectId } from "bson"
import TodoList from "../components/TodoList"
import { Todo } from "../components/TodoList"
import { GetServerSideProps, GetServerSidePropsResult, PreviewData } from "next"
import { GetServerSidePropsContext } from "next"
import { ParsedUrlQuery } from "querystring"
//Do Not Fetch an API Route from getStaticProps or getStaticPaths bc these only run server sided
// get tasks data from mongo
//use id to go to the db and find all the items that match. return as prop

//consider writing this is a different way

// interface Params extends ParsedUrlQuery {
//   params: { id: string }
// }

interface ReturnItems {
  props: { [key: string]: any }
}

//why is this working? { props: { [key: string]: any } }. Before there was no object
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<ReturnItems> => {
  console.log("context", context)
  //connect to MONGODB
  await connectMongo()

  try {
    // check if context is undefined or falsy
    // if (!context.params.id) {
    //params could bve possible be undefined.  params: undefined
    if (!context.params) {
      throw new Error(`too many params}`)
    }
    //check if key id exists on params
    if (!context.params.id) {
      throw new Error(`too many params}`)
    }
    // if context.params is an array of parameters theb throw an error
    if (Array.isArray(context.params.id)) {
      throw new Error(`too many params}`)
    }
    const incompleteResult = await Tasks.find({
      listId: new ObjectId(context.params.id), //{id: "3u487474747"} possibly an array [{id: "39e9r9r"}, {}]
      deleted: false,
      completed: false,
    })
    //check if matches schema
    const incompleteTasks = incompleteResult.map((doc) => {
      const incomplete = doc.toObject<Todo>()
      incomplete._id = incomplete._id.toString()
      incomplete.listId = incomplete.listId.toString()
      return incomplete
    })

    //finding in mongodb the item that matches this structure and the
    const completedResult = await Tasks.find({
      listId: new ObjectId(context.params.id),
      deleted: false,
      completed: true,
    })

    const completedTasks = completedResult.map((doc) => {
      const completed = doc.toObject<Todo>() //id becomes unknown when converting to object. Change the type from task model to Todo interface
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
    console.log("error in [id] while getting ssp", error)
    throw error
    //ask sbout making this a type for the return
    // return {
    //   notFound: true,
    // }
  }
}

interface TaskListProps {
  incompleteTasksData: Todo[]
  completedTasksData: Todo[]
}
export default function TaskList({
  incompleteTasksData,
  completedTasksData,
}: TaskListProps) {
  //array of objects
  const [incompleteTasks, setIncompleteTasks] =
    React.useState(incompleteTasksData)
  const [completedTasks, setCompletedTasks] = React.useState(completedTasksData)

  console.log("incompleteData", incompleteTasksData)

  const addTask = (task: Todo) => {
    setIncompleteTasks([...incompleteTasks, task])
  }
  const toggleTaskComplete = (task: Todo) => {
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
  const deleteIncompleteTask = (id: string) => {
    const newList = incompleteTasks.filter((task) => task._id != id)
    setIncompleteTasks([...newList])
  }
  const deleteCompletedTask = (id: string) => {
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
