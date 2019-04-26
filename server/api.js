const router = require('express').Router();
const axios = require('axios');
const secrets = require('../secrets');
const keywordRouter = require('./keyword');

const person = 27651;

// Gets a single art piece

router.post('/keyword', async (req, res, next) => {
  try {
    const keyword = req.body.keyword.keyword;
    console.log('********KEYWORD Route*******', keyword);
    const { data } = await axios.get(
      `https://api.harvardartmuseums.org/object?keyword=$${keyword}&size=50&apikey=${
        process.env.harvard
      }`
    );
    // const list = data.records.filter(work => work.colorcount > 3);
    // console.log(data.info.next);
    const list = data.records.reduce(function(currentList, currentWork) {
      if (currentWork.colorcount > 3) {
        currentList.push({
          id: currentWork.id,
          imageUrl: currentWork.primaryimageurl,
        });
      }
      return currentList;
    }, []);
    console.log(list);
    res.json(list);
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
      id: data.id,
    };
    res.json(fields);
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

router.post('/', async (req, res, next) => {
  try {
    console.log('route!');
    const id = req.body.id;
    console.log('ID!', id);
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
      id: data.id,
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
