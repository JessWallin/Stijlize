const router = require('express').Router();
const axios = require('axios');
const secrets = require('../secrets');

const buildList = data => {
  const list = data.reduce(function(currentList, currentWork) {
    if (
      currentWork.colorcount &&
      currentWork.colors.length > 3 &&
      currentWork.primaryimageurl
    ) {
      currentList.push({
        id: currentWork.id,
        imageUrl: currentWork.primaryimageurl,
      });
    }
    return currentList;
  }, []);
  return list;
};

// Gets a single art piece
router.post('/keyword', async (req, res, next) => {
  try {
    const keyword = req.body.keyword.keyword;
    const { data } = await axios.get(
      `https://api.harvardartmuseums.org/object?keyword=$${keyword}&size=100&apikey=${
        process.env.harvard
      }`
    );
    res.json(buildList(data.records));
  } catch (error) {
    next(error);
  }
});

router.post('/color', async (req, res, next) => {
  try {
    const color = req.body.color;
    const { data } = await axios.get(
      `https://api.harvardartmuseums.org/object?q=COLOR=${color}&size=100&apikey=${
        process.env.harvard
      }`
    );
    res.json(buildList(data.records));
  } catch (error) {
    next(error);
  }
});

router.post('/person', async (req, res, next) => {
  try {
    const person = req.body.person;
    let { data } = await axios.get(
      `https://api.harvardartmuseums.org/object?q=personID=${person}&size=100&apikey=${
        process.env.harvard
      }`
    );
    let records = buildList(data.records);
    let pageCount = 1;
    while (records.length < 1 && data.records.length === 100) {
      let { data } = await axios.get(
        `https://api.harvardartmuseums.org/object?q=personID=${person}&size=400&apikey=${
          process.env.harvard
        }&page=${pageCount}`
      );
      pageCount *= 2;
      records = buildList(data.records);
    }
    res.json(records);
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
    res.json(buildList(data.records));
  } catch (err) {
    next(err);
  }
});

router.post('/year', async (req, res, next) => {
  try {
    const year = req.body.year;
    const { data } = await axios.get(
      `https://api.harvardartmuseums.org/object?q=yearmade=${year}&apikey=${
        process.env.harvard
      }`
    );
    res.json(buildList(data.records));
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const id = req.body.id;
    const { data } = await axios.get(
      `https://api.harvardartmuseums.org/object/${id}?apikey=${
        process.env.harvard
      }`
    );
    let artist;
    let artistId;
    if (!data.people) {
      artist = 'Artist unlisted.';
      artistId = null;
    } else {
      artist = data.people[0].name;
      artistId = data.people[0].personid;
    }
    const fields = {
      title: data.title,
      artist: artist,
      artistId: artistId,
      date: data.dated,
      year: data.datebegin,
      colors: data.colors,
      id: data.id,
      description: data.labeltext,
      url: data.primaryimageurl,
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
