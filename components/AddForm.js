import React, { useState } from "react"
import { IconButton } from "@mui/material"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import Paper from "@mui/material/Paper"
import InputBase from "@mui/material/InputBase"
import { useRouter } from "next/router"
import { ObjectId } from "bson"

export default function AddForm({ label, path, requestType }) {
  const router = useRouter()
  const { id } = router.query

  const [input, setInput] = useState({ name: "" })

  const handleChange = (e) => {
    setInput({ name: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    postData(input)
    setInput({ name: "" })
  }

  //POST method to add entry to MONGODB
  const postData = async (input) => {
    const result = id ? { ...input, listId: ObjectId(id) } : input
    //strucutre send it
    // {name: "marissa",
    // listId: ObjectId("283747477484")
    //}
    //consider using axios or library to shorten code
    //or nextjs swr
    try {
      const res = await fetch(`/api/${path}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      })
        .then((res) => res.json())
        .then((res) => {
          if (!res.success) {
            console.log("error running")
            throw new Error(res.status)
          } else {
            //set state here if no error with a callback
            console.log("res", res)
            requestType(res.data)
          }
        })
      //Throw error if FETCH API request fails
    } catch (error) {
      console.log("Failed to add list name ", error)
    }
  }

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={label}
        inputProps={{ "aria-label": label }}
        value={input.name}
        onChange={handleChange}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="addInput">
        <AddCircleOutlineIcon />
      </IconButton>
    </Paper>
  )
}
