const express = require('express');
const urlController = require('./urlController');

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/shorten', urlController.shortenUrl);
app.get('/:id', urlController.redirectToUrl);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
