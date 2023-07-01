// Packages
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Managing routes

app.use('/newsletter', require('./routes/newsletter'));

mongoose.connect(process.env.DB).then(() => {
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log('server started on port', port);
  });
});
