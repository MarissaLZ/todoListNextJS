import React from "react"
import Link from "next/link"
import ListItem from "@mui/material/ListItem"
import { ListInfo } from "../pages/index"

interface ListNameProps {
  item: ListInfo
}

export default function ListName({ item }: ListNameProps): JSX.Element {
  return (
    <ListItem>
      {/* sending the id in query */}
      <Link href={`/${item._id}`}>{item.name}</Link>
    </ListItem>
  )
}
