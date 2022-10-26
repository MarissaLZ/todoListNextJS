import React from "react"
import Task from "./Task"
export default function List({ list }) {
  return (
    <>
      <ul>
        {list.map((item) => (
          <Task key={item._id} item={item} />
        ))}
      </ul>
    </>
  )
}