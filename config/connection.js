const mongoose = require('mongoose');

// 18.1.5
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialmedia', {
    // mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/18-mum-no', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose.connection;
