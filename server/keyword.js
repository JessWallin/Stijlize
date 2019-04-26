const router = require('express').Router();
const axios = require('axios');
const secrets = require('../secrets');

router.post('/', async (req, res, next) => {
  try {
    const keyword = req.body.keyword;
    console.log('KEYWORD Route', keyword);
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

module.exports = router;
