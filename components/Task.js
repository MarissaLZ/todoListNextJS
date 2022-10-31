import React from "react"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"

export default function Task({ item, deleteTask, toggleTaskComplete }) {
  // this grabs the id from [id].js
  // const router = useRouter()
  // const { id } = router.query
  // or grab id from id

  // console.log("item in task", item.deleted, item.completed)
  const [checked, setChecked] = React.useState({ completed: item.completed })
  const [status, setStatus] = React.useState({
    deleted: item.deleted,
  })

  const handleToggle = (e) => {
    console.log("checked?", e.target.checked)
    setChecked({ completed: e.target.checked })
    changeCompletionRequest({ completed: e.target.checked })
  }
  const handleClick = () => {
    setStatus({ deleted: !status.deleted })
    deleteTaskRequest({ deleted: !status.deleted })
  }

  //PUT method to mark entry complete to MONGODB
  const changeCompletionRequest = async (updatedTask) => {
    console.log("updated task", updatedTask)
    try {
      const res = await fetch("/api/lists/tasks", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...updatedTask, ...status, id: item._id }),
      })

      const response = await res.json()
      console.log("data from api?", response)

      if (!response.success) {
        console.log("error running")
        throw new Error(response.status)
      } else {
        const updated = response.data
        toggleTaskComplete(updated)
      }
      //Throw error if FETCH API request fails
    } catch (error) {
      console.log("Failed to add task ", error)
    }
  }

  //PUT method to add entry to MONGODB
  const deleteTaskRequest = async (updatedTask) => {
    try {
      //with dynamic api routing
      //const res = await fetch(`/api/lists/tasks/${item._id}` andchange name of file to [id]
      const res = await fetch("/api/lists/tasks", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...updatedTask, ...checked, id: item._id }),
      })

      const response = await res.json()
      console.log("deleteTaskResponse", response)

      if (!response.success) {
        console.log("error running")
        throw new Error(response.status)
      } else {
        const newItem = response.data
        deleteTask(newItem._id)
        //set state here if no error with a callback
      }
      //Throw error if FETCH API request fails
    } catch (error) {
      console.log("Failed to add task ", error)
    }
  }

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={handleClick}>
          <HighlightOffIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton role={undefined} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            onChange={handleToggle}
            checked={checked.completed}
            // disableRipple
            inputProps={{ "aria-label": "controlled" }}
          />
        </ListItemIcon>
        <ListItemText id={"taskName"} primary={item.name} />
      </ListItemButton>
    </ListItem>
  )
}
