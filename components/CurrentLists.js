import React from "react"
import ListItem from "./ListItem"

export default function CurrentLists({ listNames }) {
  return (
    <ul>
      {listNames.map((item) => (
        <ListItem key={item._id} item={item} />
      ))}
    </ul>
  )
}
// [{ _id: "6354d986c88f4060c9763176", name: "mffvcf", __v: 0 }]
