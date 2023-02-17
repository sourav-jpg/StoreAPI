

const getAllproductsStatic = async( req, res, next) =>{
  res.status(200).json({message:'products testing route'})
}

const getAllproducts = async( req, res, next) =>{
    res.status(200).json({message:'products route'})

}

module.exports = {
    getAllproductsStatic,
    getAllproducts

}