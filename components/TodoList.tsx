import React from "react"
import Task from "./Task"
import List from "@mui/material/List"

export interface Todo {
  completed: boolean
  deleted: boolean
  listId: string
  name: string
  __v: number
  _id: string
}

interface TodoListProps {
  list: Todo[]
  deleteTask: Function
  toggleTaskComplete: Function
  listTitle?: string
}

export default function TodoList({
  list,
  deleteTask,
  toggleTaskComplete,
  listTitle,
}: TodoListProps) {
  return (
    <>
      <List>
        <h3>{listTitle}</h3>

        {list.map((item) => (
          <Task
            key={item._id}
            item={item}
            deleteTask={deleteTask}
            toggleTaskComplete={toggleTaskComplete}
          />
        ))}
      </List>
    </>
  )
}
