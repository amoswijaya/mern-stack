const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 5000;
const mongoose = require('mongoose');
require('dotenv').config();
const URI = `mongodb+srv://amosjay:${process.env.PASSWORD}@cluster0.3thus.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;
const todoRoutes = require('./routes/todo');
const userRoutes = require('./routes/user');
// Middleware

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/todo', todoRoutes);
app.use('/user', userRoutes);
// DB Config
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
  //creater server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}  `);
  });
});
