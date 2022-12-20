import Home from "../pages/index"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

describe("Test Home Component", () => {
  const listNames = [
    {
      _id: 1,
      name: "one",
      __v: 0,
    },
    {
      _id: 2,
      name: "two",
      __v: 0,
    },
  ]

  const props = {
    listNames: listNames,
  }
  test("home component", async () => {
    const component = render(<Home listNames={listNames} />)
    screen.debug()
    //console.log(component.container.childNodes)
    //findBy
    //add name
    expect(screen.getByRole("textbox")).toBeInTheDocument()

    expect(screen.getByText("one")).toBeInTheDocument()
  })
})
