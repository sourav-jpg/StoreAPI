const Product = require("../model/productSchema");

const getAllproductsStatic = async (req, res, next) => {
  let result;
  try {
    result = await Product.find().lean();
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
    next(error);
  }
};

const getAllproducts = async (req, res, next) => {
  // for now we want to search for featured
  // we can also add other fields along with featured if neccesary
  const { featured, company, name, sort , fields } = req.query;
   
  // this is created because if the user pass diff value as a params
  // instead of featured we should'nt get error else we will be gitting all the products
  const queryObject = {};
 
  try {
    if (featured) {
      queryObject.featured = featured === "true" ? true : false;
    }
    if (company) {
      queryObject.company = {$regex:company , $options:'i'};
    }
    if(name){
      queryObject.name = { $regex:name , $options:'i'}
    }
    // console.log(queryObject);
    let result = Product.find(queryObject);
    //sort is used to get data in alphebetical order
    if(sort){
      const sortList = sort.split(',').join(' ');
      result = result.sort(sortList)
    }else{
      result = result.sort('createdAt')
    }
    //which fields you only want to return
    if(fields){
      const fieldsList = sort.split(',').join(' ');
      result = result.select(fieldsList)
    }


    const product = await result
    if (product) {
      res.status(200).json({
        error: false,
        message: "product fetched!",
        data: product,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:'failed!!',
      data :error,
    })
  }
};

module.exports = {
  getAllproductsStatic,
  getAllproducts,
};
