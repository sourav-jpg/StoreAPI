const Product = require("../model/productSchema");

const getAllproductsStatic = async (req, res, next) => {
  let result;
  try {
    result = await Product.find( ).lean();
    if (!result) {
      res.send(400).json({
        message: "Failed to fetch as there is nothing!!!",
        error: true,
        data: null,
      });
    }
      res.status(200).json({
      message: " All Products Fetched successfully!",
      error: false,
      data: result,
    });
  } catch (error) {
    console.log(error);
    process.next();
  }
};

const getAllproducts = async (req, res, next) => {
  res.status(200).json({ message: "products route" });
};

module.exports = {
  getAllproductsStatic,
  getAllproducts,
};
