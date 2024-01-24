const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://admin:wRsFCSpsrNVOUZHq@myfirstdatabase.fgkxv7k.mongodb.net/hackatweetnews';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));
