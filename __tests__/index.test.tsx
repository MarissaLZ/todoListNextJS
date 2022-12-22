import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"
import AddForm from "../components/AddForm"
import CurrentLists from "../components/CurrentLists"
import ListName from "../components/ListName"
import Task from "../components/Task"
import TodoList from "../components/TodoList"

describe("AddForm", () => {
  test("Component renders and passes props", () => {
    const addList = jest.fn()
  //   render(<AddForm label="Add a List" path="lists" requestType={addList} />)
  //   expect(screen.getByText("Add a List")).toBeInTheDocument()
  // })
  test("CurrentLists Component passes props", () => {
    const names = [
      { _id: "63879975b7986744f0415790", name: "list a", __v: 0 },
      { _id: "63879fd8b7986744f041579a", name: "list b", __v: 0 },
    ]
    render(<CurrentLists listNames={names} />)
    expect(screen.getByText("list a")).toBeInTheDocument()
  })
  test("ListName component receives props", () => {
    const item = { _id: "63879975b7986744f0415790", name: "list a", __v: 0 }

    render(<ListName item={item} />)
    expect(screen.getByText("list a")).toBeInTheDocument()
  })
  test("TodoList Component receives props", () => {
    const incompleteTasks = [
      {
        _id: "63879fddb7986744f041579e",
        listId: "63879fd8b7986744f041579a",
        name: "item 1",
        deleted: false,
        completed: false,
        __v: 0,
      },
    ]
    const deleteIncompleteTask = jest.fn()
    const toggleTaskComplete = jest.fn()
    render(
      <TodoList
        list={incompleteTasks}
        deleteTask={deleteIncompleteTask}
        toggleTaskComplete={toggleTaskComplete}
        listTitle={"Incomplete Tasks"}
      />
    )
    expect(screen.getByText("item 1")).toBeInTheDocument()
    expect(screen.getByText("Incomplete Tasks")).toBeInTheDocument()
  })
  test("Task Component", () => {
    const item = {
      _id: "63879fddb7986744f041579e",
      listId: "63879fd8b7986744f041579a",
      name: "item 1",
      deleted: false,
      completed: false,
      __v: 0,
    }
    const deleteIncompleteTask = jest.fn()
    const toggleTaskComplete = jest.fn()
    render(
      <Task
        item={item}
        deleteTask={deleteIncompleteTask}
        toggleTaskComplete={toggleTaskComplete}
      />
    )
    expect(screen.getByText("item 1")).toBeInTheDocument()
  })
})
