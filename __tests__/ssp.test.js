/**  * @jest-environment node  */
import { getServerSideProps } from "../pages/index"

import mongoose from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"
import { MongoClient } from "mongodb"
import connectMongo from "../lib/connectMongo"

jest.mock("../lib/connectMongo", () => {
  const original = jest.requireActual("../lib/connectMongo")
  return {
    __esModule: true,
    default: jest.fn(original.default),
  }
})

let mongo, mongoUri, connection

beforeAll(async () => {
  mongo = await MongoMemoryServer.create()
  mongoUri = mongo.getUri()
  //set env variable to mongo uri
  console.log("env1", process.env.MONGODB_URI)
  process.env.MONGODB_URI = mongoUri
  console.log("env2", process.env.MONGODB_URI)
  //using mongo to connnect instead of mongoose
  connection = await MongoClient.connect(mongoUri, {})
})

afterAll(async () => {
  if (connection) {
    await connection.close()
  }
  mongoose.disconnect()
  if (mongo) {
    //stop allows for cleaning the mongo memeory server db
    await mongo.stop()
  }
})

describe("Test getServerSidedProps", () => {
  test("returns an empty array when there are no list in the db", async () => {
    const result = await getServerSideProps()
    //use toEqual and not toBe
    expect(result).toEqual({ props: { listNames: [] } })
  })

  test("returns all lists in array", async () => {
    const data = [
      {
        name: "one",
      },
      {
        name: "two",
      },
    ]

    const db = connection.db(mongo.instanceInfo.dbName)
    const res = await db.collection("listnames").insertMany(data)
    const result = await getServerSideProps()
    console.log("result.props", result.props)
    //{ props: { listNames: [ [Object], [Object] ] } }

    expect(result).toEqual(
      expect.objectContaining({
        props: expect.any(Object),
      })
    )
    expect(result.props).toBeDefined()
    expect(result.props).toEqual(
      expect.objectContaining({ listNames: expect.any(Array) })
    )
  })
  test("handles thrown errors well", async () => {
    //mock connect mongo and make it throw an error

    connectMongo.mockImplementationOnce(async () => {
      throw new Error("error thrown")
    })
    const result = await getServerSideProps()
    expect(result.props).toBeUndefined()
    expect(result.notFound).toBeDefined()
    expect(result.notFound).toBeTruthy()
  })
})
