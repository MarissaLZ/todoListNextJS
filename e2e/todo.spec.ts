import { test, expect } from "@playwright/test"
import { ObjectId } from "bson"
import mongoose from "mongoose"
//import connectMongo from "../lib/connectMongo"
import { MongoMemoryServer } from "mongodb-memory-server"

//mongo memeory server -allows us to start a mongod process that stores the data in memory.
// test.afterAll(async () => {
//   process.env.MONGODB_URI =
//     "mongodb+srv://ctd_todo_app:wN0NxtFBWWM2iwbD@cluster0.vb7hpug.mongodb.net/marissa_test"
//   await connectMongo()

//   mongoose.connection.db.dropCollection("tasks", function (err, result) {
//     console.log("error in afterAll", err)
//   })

//   mongoose.connection.db.dropCollection("listnames", function (err, result) {
//     console.log("error in afterAll", err)
//   })
// })

let mongoServer: MongoMemoryServer
let mongoUri

const getMongoMemory = async () => {
  mongoServer = await MongoMemoryServer.create()
  mongoUri = mongoServer.getUri()
  //set env variable to mongo uri
  console.log("env1", process.env.MONGODB_URI)
  process.env.MONGODB_URI = mongoUri
  console.log("env2", process.env.MONGODB_URI)
}

const stopMongoMemory = async () => {
  await mongoServer.stop()
}

test.describe("", () => {
  // test.beforeAll(async () => {
  //   // connect to the mongo memeroy server database
  //   mongoServer = await MongoMemoryServer.create()
  //   mongoUri = mongoServer.getUri()
  //   //set env variable to mongo Uri
  //   console.log("env1", process.env.MONGODB_URI)

  //   process.env.MONGODB_URI = mongoUri

  //   console.log("env2", process.env.MONGODB_URI)
  //   //await mongoose.connect(mongoUri, {})
  // })

  // test.afterAll(async () => {
  //   //await mongoose.connection.close()
  //   //stop() cleans up the db
  //   await mongoServer.stop()
  // })

  test("adds a new list to the home page", async ({ page }) => {
    await page.goto("http://localhost:3000")
    await getMongoMemory()

    //find input with text add a list
    const input = page.getByRole("textbox")
    await input.fill("Chores")
    await page.getByRole("button").click()
    //find new list
    const newList = page.getByRole("link", { name: "Chores" })
    //expect new list to appear on home page
    await expect(page.getByText("Chores")).toBeVisible()
    await expect(page.getByText("Groceries")).not.toBeVisible()
    await stopMongoMemory()
    //await newList.click()

    // console.log("page.request", page.response())
    //await expect(page.getByText("Add a task"))
  })

  test("API POST request adds a new list", async ({ request }) => {
    await getMongoMemory()

    const response = await request.post("http://localhost:3000/api/lists", {
      data: { name: "comida" },
    })
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(201)

    const res = await response.json()
    const id = await res.data._id
    const taskResponse = await request.post(
      "http://localhost:3000/api/lists/tasks",
      {
        data: {
          name: "tacos",
          listId: new ObjectId(id),
        },
      }
    )
    expect(taskResponse.ok()).toBeTruthy()
    const taskRes = await taskResponse.json()
    const taskId = await taskRes.data._id

    //test checking off an task
    const putResponse = await request.put(
      "http://localhost:3000/api/lists/tasks",
      {
        data: {
          completed: true,
          deleted: false,
          id: taskId,
        },
      }
    )
    expect(putResponse.ok()).toBeTruthy()
    const checkRes = await putResponse.json()
    const taskChecked = await checkRes.data.completed
    expect(taskChecked).toBeTruthy()

    //test deleting an task
    const deleteResponse = await request.put(
      "http://localhost:3000/api/lists/tasks",
      {
        data: {
          completed: true,
          deleted: true,
          id: taskId,
        },
      }
    )
    expect(deleteResponse.ok()).toBeTruthy()
    const deleteRes = await deleteResponse.json()
    const deleteTask = await deleteRes.data.deleted
    expect(deleteTask).toBeTruthy()

    await stopMongoMemory()
  })
})
