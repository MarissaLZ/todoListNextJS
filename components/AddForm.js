import React, { useState } from "react"
import { IconButton } from "@mui/material"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import Paper from "@mui/material/Paper"
import InputBase from "@mui/material/InputBase"

export default function AddForm({ label }) {
  const [input, setInput] = useState({ name: "" })
  console.log("input", input)

  const handleChange = (e) => {
    setInput({ name: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    postData(input)
    console.log("input", input)
    setInput({ name: "" })
  }

  //POST method to add entry to MONGODB
  const postData = async (input) => {
    try {
      const res = await fetch("/api/lists", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      })
      //Throw error if FETCH API request fails
      if (!res.ok) {
        throw new Error(res.status)
      }
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
