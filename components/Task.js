import React from "react"

export default function Task({ item }) {
  console.log("item in Task", item)
  return (
    <>
      <li>
        {item.name}
        {/* <Link href={`/list/${id}`}>{item}</Link> */}
      </li>
    </>
  )
}
