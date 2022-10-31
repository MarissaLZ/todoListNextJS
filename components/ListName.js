import React from "react"
import Link from "next/Link"
import ListItem from "@mui/material/ListItem"

export default function ListName({ item }) {
  return (
    <ListItem>
      <Link href={`/${item._id}`}>{item.name}</Link>
    </ListItem>
  )
}
