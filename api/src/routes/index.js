require('dotenv').config();
const e = require('express');
const { Router } = require('express');
const axios = require('axios');
const {
  APIKEY
} = process.env;
const {Videogame, Genre} = require('../db.js')
const router = Router();

const fixGenre = (genres) => genres.map(e => e.name)

router.get('/videogames', async (req, res) => {
  if(!req.query.name){
    let api
    let page1 = await axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=1`)
    let page2 = await axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=2`)
    let page3 = await axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=3`)
    let page4 = await axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=4`)
    let page5 = await axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=5`)
    await Promise.all([page1, page2, page3, page4, page5])
    .then((e) => api = [...e[0].data.results, ...e[1].data.results, ...e[2].data.results, ...e[3].data.results, ...e[4].data.results])
    api =  await api.map(e => {
      return {
        id: e.id,
        name: e.name,
        genres: e.genres.map(e => e.name),
        image: e.background_image,
        rating: e.rating
      }
    })

    let db = await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ['name'],
        through: {
          attributes: [],
        }
      }
    })
    db = db.map(e => {
      return (
        {
          id: e.id,
          name:e.name,
          genres: fixGenre(e.genres),
          image: e.image,
          rating:e.rating,
        }
      )
    })

    let total = [...api, ...db]
    total.sort((a,b) => {
      if(a.name > b.name) return 1
      if(a.name < b.name) return -1
      return 0
    })
    console.log("total", total.length)
    res.status(200).json(total)
  }
  else {
    req.query.name = req.query.name.replace(/\s+/g, '%')
    try {
      let filtered = await axios.get(`https://api.rawg.io/api/games?search=${req.query.name}&key=${APIKEY}`)
      filtered = await filtered.data.results.map(e => {
        return {
          id: e.id,
          name: e.name,
          genres: e.genres.map(e => e.name),
          image: e.background_image,
          rating: e.rating
        }
      })

      let db = await Videogame.findAll({
        include: {
          model: Genre,
          attributes: ['name'],
          through: {
            attributes: [],
          }
        }
      })
      db = db.map(e => {
        return (
          {
            id: e.id,
            name:e.name,
            genres: fixGenre(e.genres),
            image: e.image,
            rating:e.rating,
          }
        )
      })
      db = db.filter(e => e.name.toLowerCase().includes(req.query.name.toLowerCase()))

      filtered = [...filtered, ...db]
      res.status(200).json(filtered.slice(0, 15))
      
    }catch(err) {
      console.log("ERROR CATCHED", err)
    }
    
    /* filtered.length? res.status(200).json(filtered.slice(0, 15)): res.status(404).json({msg: 'oops, the game not exists'}) */
  }
})

router.get('/genres', async (req, res) => {
  /* let total = await axios.get(`https://api.rawg.io/api/genres?key=${APIKEY}`)
  total = total.data.results;
  total.map(e => {
    Genre.findOrCreate({where: {name: e.name}})
  })
  //the second time I run the .get if I have the force in FALSE
  res.json(await Genre.findAll()) */

  const total = new Promise((resolve, reject) => {
    resolve(axios.get(`https://api.rawg.io/api/genres?key=${APIKEY}`))
  })
  total.then(e => e.data.results)
  .then(e => {e.map(e => {Genre.findOrCreate({where: {name:e.name}})})})

  .then(e => new Promise((resolve, reject) => resolve(Genre.findAll())))
  .then(e => res.json(e))
  
  .catch(err => console.log("CATCHED", err))
})

router.get('/videogame/:id', async (req, res) => {
  const {id} = req.params
  let detail
  if(!id) return res.status(404).json({msg: 'invalid ID'})
  if(!Number(id)){
    if(id.includes("-")){
      try {
        detail = await Videogame.findByPk(id, {
          include: [{
            model: Genre,
            attributes: ['name'],
            through: {
              attributes: []
            }
          }]
        })
        const genresFixed = await detail.genres.map(e => e.name)
        const dbDetail = {
          name: detail.name,
          platforms: detail.platforms,
          release_date: detail.release_date,
          image: detail.image,
          description: detail.description,
          rating: detail.rating,
          genres: genresFixed.toString()
       }
       res.json(dbDetail)
      }catch(err) {
        console.log("ERROR CATCHED", err)
        res.status(404).json({msg: "invalid ID"})
      }
    }else return res.status(404).json({msg: 'invalid ID'})

  }else {
    try{
      detail = await axios.get(`https://api.rawg.io/api/games/${id}?key=${APIKEY}`)
      const apiDetail = {
        name: detail.data.name,
        image: detail.data.background_image,
        genres: detail.data.genres.map((e) => e.name),
        description: detail.data.description.replace(/<[^>]+>/g, ''),
        release_date: detail.data.released,
        rating: detail.data.rating,
        platforms: detail.data.platforms.map((e) => e.platform.name),
      }
      res.json(apiDetail)
    } catch(err){
      res.status(404).json({msg: "invalid ID"})
    }
  }
})

router.post('/videogame', async (req, res) => {
  let {name, description, release_date, rating, platforms, genres, image} = req.body
  let game = await Videogame.create({
    name: name,
    description: description,
    release_date: release_date,
    rating: rating,
    platforms: platforms,
    image: image
  })
  let genresDb = await Genre.findAll({where: {name: genres}})
  game.addGenre(genresDb)
  res.json('game created successfully')
})

router.delete("/videogame/:id", async (req, res) => {
  const {id} = req.params
  /* if (!Number(id)) return res.status(404).json({msg: "invalid ID"}) */
  let game = await Videogame.findByPk(id, {
    include: [{
      model: Genre,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }]
  })
  await game.destroy();
  res.json('game deleted successfully')
})


/* router.post('/delete/:name', async (req, res) => {
  const { name } = req.params;
  console.log('Delete de: ', name)
  try {
   const elem = await Videogame.destroy({
      where: {name: `${name}`}
   });
  } catch (error) {
      res.send(`Error in route /videogames/delete ${error}`);
  }
  res.send('Videogame has been deleted'); */
  
module.exports = router;
