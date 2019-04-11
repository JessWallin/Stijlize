const express = require('express');
const app = express();
const path = require('path');
const apiRoutes = require('./api');

const morgan = require('morgan');
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../public/')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.use(function(err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log(`Making magic on port ${PORT}`);
});
