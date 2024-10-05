const mongoose = require("mongoose");

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, clientOptions);
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
