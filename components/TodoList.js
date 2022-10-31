import React from "react"
import Task from "./Task"
import List from "@mui/material/List"

export default function TodoList({
  list,
  deleteTask,
  toggleTaskComplete,
  listTitle,
}) {
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
