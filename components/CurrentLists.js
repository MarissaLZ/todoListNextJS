import React from "react"
import List from "@mui/material/List"
import ListItem from "./ListName"

export default function CurrentLists({ listNames }) {
  return (
    <List>
      {listNames.map((item) => (
        <ListItem key={item._id} item={item} />
      ))}
    </List>
  )
}
// [{ _id: "6354d986c88f4060c9763176", name: "mffvcf", __v: 0 }]
