/* eslint-disable import/no-extraneous-dependencies */
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Videogame, conn } = require("../../src/db.js");
const {assert} = require("chai")

const agent = session(app);
const videogame = {
  name: "Super Mario Bros",
};

/* describe("Videogame routes", () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  describe("GET /videogames", () => {
    it("should get 200", () =>
      agent.get("/videogames").expect(200)
    );
  });
}); */

describe("Videogame routes", () => {

  xdescribe("GET /videogames", () => {

    it("should get 200", async () =>{
      await agent.get("/videogames").expect(200)
    }).timeout(10000);

    it("should get an array with all the games data", async () =>{
      const response = await agent.get("/videogames")
      assert.isArray(response._body, "This is an array")
    }).timeout(10000);
  });

  describe("GET /videogame:id", () => {
    it("should get 404 with an invalid id", async () =>{
      await agent.get("/videogame/asdasdasd").expect(404)
    }).timeout(10000);

    it("should get 200 with a valid id", async () =>{
      await agent.get("/videogame/28").expect(200)
    }).timeout(10000);

    it("should get an object with the game data", async () =>{
      let response = await agent.get("/videogame/290856")
      assert.isObject(response._body, "This is an object")
      assert.equal(response._body.name, "Apex Legends")
    }).timeout(10000);
  });
});
