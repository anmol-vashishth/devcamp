const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//Load env vars
dotenv.config({ path: "./config/config.env" });

// Load models
const Bootcamp = require("./models/Bootcamp");
const Course = require("./models/Course");
const User = require("./models/User");
const Reviews = require("./models/review");

//Connect to DB
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};
mongoose.connect(process.env.MONGO_URI, clientOptions);

// Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`)
);

const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`));

const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`));

const reviews = JSON.parse(fs.readFileSync(`${__dirname}/_data/reviews.json`));

// Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);
    await User.create(users);
    await Reviews.create(reviews);

    console.log("Data imported...");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();
    await Reviews.deleteMany();

    console.log("Data Destroyed...");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
