const { connect, connection } = require('mongoose');

// 18.1.5
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/socialmedia';
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialmedia', {
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/18-mum-no', {
connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = connection;
