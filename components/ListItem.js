import React from "react"
import Link from "next/Link"

export default function ListItem({ item }) {
  return (
    <li>
      <Link href={`/${item._id}`}>{item.name}</Link>
    </li>
  )
}
