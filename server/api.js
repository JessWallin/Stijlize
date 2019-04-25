const router = require('express').Router();
const axios = require('axios');
const secrets = require('../secrets');

const person = 27651;

// Gets a single art piece
router.post('/', async (req, res, next) => {
  try {
    console.log('route!');
    const id = req.body.id;
    console.log('ID!', id);
    const { data } = await axios.get(
      `https://api.harvardartmuseums.org/object/27651?apikey=${
        process.env.harvard
      }`
    );
    const fields = {
      title: data.title,
      artist: data.signed,
      date: data.date,
      colors: data.colors,
    };
    console.log(data);
    res.json(fields);
  } catch (error) {
    next(error);
  }
});

router.post('/color', async (req, res, next) => {
  try {
    const color = req.body.color;
    const { data } = await axios.get(
      `https://api.harvardartmuseums.org/object?COLOR=${color}&apikey=${
        process.env.harvard
      }
      }`
    );
    const fields = {
      title: data.title,
      artist: data.signed,
      date: data.date,
      colors: data.colors,
    };
    console.log(data);
    res.json(fields);
  } catch (error) {
    next(error);
  }
});

router.post('/keyword', async (req, res, next) => {
  try {
    const keyword = req.body.keyword;
    const { data } = await axios.get(
      `https://api.harvardartmuseums.org/object?keyword=${keyword}&apikey=${
        process.env.harvard
      }`
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get('/person', async (req, res, next) => {
  try {
    const { data } = await axios.get(
      `https://api.harvardartmuseums.org/person/${person}/?apikey=${
        process.env.harvard
      }`
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get('/today', async (req, res, next) => {
  const d = new Date();
  const today = Math.ceil((d - new Date(d.getFullYear(), 0, 1)) / 86400000);
  console.log(today);
  // dividing by86400000 converts milliseconds to days
  try {
    const { data } = await axios.get(
      `https://api.harvardartmuseums.org/spectrum/${today}/?apikey=${
        process.env.harvard
      }`
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.use(function(req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
