const mongoose = require('mongoose');
const { MONGO_URI } = require('./config');

(async () => {
  try {
    const mongooseOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
    const db = await mongoose.connect(MONGO_URI, mongooseOptions);
    console.log('Connected to:', db.connection.name);
  } catch (error) {
    console.error(error);
    throw new Error('Error connecting to DB');
  }
})();
