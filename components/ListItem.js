import React from "react"
import Link from "next/Link"

export default function ListItem({ item }) {
  return (
    <li>
      {item}
      {/* <Link href={`/list/${id}`}>{item}</Link> */}
    </li>
  )
}
