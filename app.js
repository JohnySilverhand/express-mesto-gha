const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '6302676494bde53ce031506f',
  };
  next();
});
app.use('/', userRouter);
app.use('/', cardRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
