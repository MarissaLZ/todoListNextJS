import { test, expect } from "@playwright/test"

test("adds a new list to the home page", async ({ page }) => {
  await page.goto("http://localhost:3000/")
  //find input with text add a list
  const input = page.getByRole("textbox")
  await input.fill("Chores")
  await page.getByRole("button").click()
})
// test("homepage has title and links to intro page", async ({ page }) => {
//   // create a locator
//   const getStarted = page.getByRole("link", { name: "Get started" })

//   // Expect an attribute "to be strictly equal" to the value.
//   await expect(getStarted).toHaveAttribute("href", "/docs/intro")

//   // Click the get started link.
//   await getStarted.click()

//   // Expects the URL to contain intro.
//   await expect(page).toHaveURL(/.*intro/)
// })
