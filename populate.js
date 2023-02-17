require("dotenv").config({ path: "config.env" });
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const connectDb = require("./server/database/connection");
const Product = require("./server/model/productSchema");

const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    //just to make sure before populating all data in DB is deleted
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log("Success!!!");
  } catch (error) {
    console.log(error);
  }
};
start();

//NOTE
// to run this code we needd to run -> node populate in the terminal
