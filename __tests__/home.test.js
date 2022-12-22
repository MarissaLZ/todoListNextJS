import Home from "../pages/index"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { createMockRouter } from "../createMockRouter"
import { RouterContext } from "next/dist/shared/lib/router-context"

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

const user = userEvent.setup()

describe("Test Home Component", () => {
  test("displays the list items given", async () => {
    const component = render(<Home listNames={listNames} />)
    //screen.debug()

    for (const i of listNames) {
      expect(screen.getByText(i.name)).toBeInTheDocument()
    }
  })
})

describe("add new list", () => {
  test("adds new list", async () => {
    const newName = "a test name"
    const server = setupServer(
      rest.post("api/lists", async (req, res, ctx) => {
        const { name } = await req.json()
        console.log("name", name)
        return res(
          ctx.status(201),
          ctx.json({
            success: true,
            data: {
              name: newName,
              _id: "3",
              __v: 0,
            },
          })
        )
      })
    )
    //console.log("server", server)
    server.listen()

    const component = render(
      <RouterContext.Provider value={createMockRouter({ query: {} })}>
        <Home listNames={listNames} />
      </RouterContext.Provider>
    )

    //get user input
    const input = screen.getByRole("textbox", { name: /add a list/i })
    const addListButton = screen.getByRole("button", { name: /addinput/i })
    expect(addListButton).toBeInTheDocument()
    expect(input).toBeInTheDocument()

    //clear input
    //await user.clear(input)
    //type in a new list
    await user.type(input, newName)
    expect(input.value).toBe(newName)

    await user.click(addListButton)

    expect(await screen.findByText(newName)).toBeInTheDocument()
    screen.debug()

    server.close()
  })
})
