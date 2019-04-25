const router = require('express').Router();
const axios = require('axios');
const secrets = require('../secrets');

const id = 228650;

router.get('/', async (req, res, next) => {
  try {
    console.log('route!');
    const { data } = await axios.get(
      `https://api.harvardartmuseums.org/object/${id}?apikey=${
        process.env.harvard
      }`
    );
    const fields = {
      title: data.title,
      artist: data.signed,
      date: data.date,
      colors: data.colors,
    };
    res.json(fields);
  } catch (error) {
    next(error);
  }
});

router.use(function(req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
