import React from "react"
import List from "@mui/material/List"
import ListItem from "./ListName"

import { ListInfo } from "../pages/index"

interface CurrentListsProps {
  //each element is this is array is of typeListInfo
  listNames: ListInfo[]
}

//listNames is an array of objects
// [{ _id: "6354d986c88f4060c9763176", name: "mffvcf", __v: 0 }]
export default function CurrentLists({
  listNames,
}: CurrentListsProps): JSX.Element {
  return (
    <List>
      {listNames.map((item) => (
        <ListItem key={item._id} item={item} />
      ))}
    </List>
  )
}
