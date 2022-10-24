import React from "react"
import ListItem from "./ListItem"

export default function CurrentLists({ listNames }) {
  return (
    <ul>
      {listNames.map((item) => (
        <ListItem key={item} item={item} />
      ))}
    </ul>
  )
}
