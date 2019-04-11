const router = require('express').Router();

router.use('/users', require('./users')); // Users? Check.
// router.use('/puppies', require('./puppies')); // Puppies? Check.
// router.use('/kittens', require('./kittens')); // Kittens? Check.

router.use(function(req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
