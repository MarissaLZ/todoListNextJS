import React, { useState } from "react"
import { IconButton } from "@mui/material"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import Paper from "@mui/material/Paper"
import InputBase from "@mui/material/InputBase"
import { useRouter } from "next/router"
import { ObjectId } from "bson"

interface AddFormProps {
  label: string
  path: string
  requestType: Function
}

const AddForm = ({ label, path, requestType }: AddFormProps) => {
  const router = useRouter() // look at why this works when commented out
  //grab id of clicked list
  // id will appear if there is dynamic routing
  const id = router.query.id
  console.log("id", id)

  const [input, setInput] = useState({ name: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput({ name: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    postData(input)
    setInput({ name: "" })
  }

  interface Input {
    name: string
  }

  //POST method to add entry to MONGODB
  const postData = async (input: Input) => {
    let result
    if (typeof id === "string") {
      const myObjectId = new ObjectId(id)
      console.log("m,yObjectId", myObjectId)
      result = { ...input, listId: myObjectId }
    } else {
      result = input
    }
    console.log("result", result)
    //strucutre send it
    // {name: "marissa",
    // listId: ObjectId("283747477484")
    //}
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
          //catch only response to throwing an error if it is a server 500 error
          //this wouod be different if it was axios
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
export default AddForm
