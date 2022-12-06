const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/connection')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// // 18.1.5
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/18-mum-no', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// Use this to log mongo queries being executed!
// mongoose.set('debug', true);

app.use(require('./routes'));
db.once('open', ( ) => {
  app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));
});