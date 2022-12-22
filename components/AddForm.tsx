import React, { useState } from "react"
import { IconButton } from "@mui/material"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import Paper from "@mui/material/Paper"
import InputBase from "@mui/material/InputBase"
import { NextRouter, useRouter } from "next/router"
import { ObjectId } from "bson"

interface AddFormProps {
  label: string
  path: string
  requestType: Function
}

export interface Input {
  name: string
}
const AddForm = ({ label, path, requestType }: AddFormProps) => {
  const router = useRouter()

  //grab id of clicked list
  // id will appear if there is dynamic routing
  const [input, setInput] = useState({ name: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput({ name: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    postData(input)
    setInput({ name: "" })
  }

  //POST method to add entry to MONGODB
  const postData = async (input: Input) => {
    try {
      let result

      if (router === null) {
        console.log("router is null ")
        throw new Error("router is null")
      }
      console.log(
        "router.query",
        router.query,
        "Object.keys(router.query).length",
        Object.keys(router.query).length
      )
      if (input.name.trim() === "") {
        throw new Error("unacceptable input ")
      } else if (Array.isArray(router.query.id)) {
        throw new Error("query is an array")
      } else if (router.query.hasOwnProperty("id")) {
        const myObjectId = new ObjectId(router.query.id)
        console.log("myObjectId", myObjectId)
        result = { ...input, listId: myObjectId }
      } else if (
        typeof router.query === "object" &&
        router.query !== null &&
        router.query.hasOwnProperty("id") === false
      ) {
        result = input
        // {name: "list a"}
      }
      console.log("result", result)
      //structure sent
      // {name: "task",
      // listId: ObjectId("283747477484")
      //}
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
          //catch only response to throwing an error if it is a server 500 error
          //this would be different if it was axios
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
      console.log("Failed to add list name in api:", error)
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
export default AddForm
