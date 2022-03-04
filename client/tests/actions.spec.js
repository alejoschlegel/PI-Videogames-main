const session = require("supertest-session")
const { assert, expect } = require("chai")
const action = require("../src/actions/index.js")

describe("Actions", () => {

    /* describe("getVideogames", () => {
      it("should return an action with the properties type and payload", async () =>{
        const response = action.getVideogames()
        await response( async(payload) => { return await payload } ).then((e) => {
            assert.equal(e.hasOwnProperty("type"), true)
            assert.equal(e.hasOwnProperty("payload"), true)
        })
      }).timeout(10000);
    }); */

  describe("getByVideogame", () => {

    it("should return an action with the properties type and payload, its value is received by argument", async () =>{
      const response = action.getByVideogame(290856)
      await response( async(payload) => { return await payload } ).then((e) => {
        assert.equal(e.hasOwnProperty("type"), true)
        assert.equal(e.hasOwnProperty("payload"), true)
      })
    }).timeout(10000);

      it("should return an error 404 with a {msg: } if the id is invalid", async () =>{
      const response = action.getByVideogame("asd")
      await response( async(payload) => { return await payload } ).then((e) => {
        assert.equal(e.response.status, 404)
        assert.equal(e.response.data.hasOwnProperty("msg"), true)
      })
    }).timeout(10000);

  });
});