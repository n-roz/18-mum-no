const mongoose = require('mongoose');

// // 18.1.5
// // const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/18-mum-no';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/18-mum-no', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = connection;
