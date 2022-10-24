import React from "react"

export default function Task({ item }) {
  return (
    <>
      <li>
        {item}
        {/* <Link href={`/list/${id}`}>{item}</Link> */}
      </li>
    </>
  )
}
