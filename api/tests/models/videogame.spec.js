const { Videogame, conn } = require('../../src/db.js');
const { expect, assert } = require('chai');
const videogameModel = require("../../src/models/Genre.js")

/* describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Recipe.create({ name: 'Super Mario Bros' });
      });
    });
  });
}); */

describe("Videogame model", () => {

  describe("validations", () => {
    beforeEach(() => Videogame.sync({ force: true }));
    it("should connect with the db correctly", async () =>{
      let connected
      try {
        await conn.authenticate();
        connected = true
      }catch (error) {
        console.error('Unable to connect to the database:', error);
        connected = false
      }

      assert.equal(connected, true)

    }).timeout(10000);

    it("should create a game with an id that not interfere with the apis id", async () =>{
      await Videogame.create({
        name: "test example",
        description: "description example",
        image: "https://citizengo.org/sites/default/files/images/test_3.png"
      })
      .then((e) => {
        assert.equal(!Number(e.dataValues.id), true)
      })
    }).timeout(10000);
  });
});