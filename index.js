// Packages
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Managing routes

app.get('/', (req, res) => {
  // res.send('hello world from the news letter');
  res.send('hello', {
    DB: process.env.DB,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
  });
});

app.use('/newsletter', require('./routes/newsletter'));

const port = process.env.PORT;
app.listen(port, () => {
  console.log('server started on port', port);
});
// mongoose.connect(process.env.DB).then(() => {});
