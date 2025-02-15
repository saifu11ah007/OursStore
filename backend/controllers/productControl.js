import asyncHandler from '../middleware/asyncHandler.js'; 
import Product from '../models/productModel.js'; 

// @desc Fetch all Products

const getProducts= asyncHandler(async(req,res)=>{
  const products=await Product.find({});
  res.json(products);
});
const getProductById= asyncHandler(async(req,res)=>{
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

const createProduct= asyncHandler(async(req,res)=>{
  const product=new Product({
    user:req.user._id,
    id: 11,
    image: '/assets/product5.jpeg',
    sizes: [
      { size: "S", stock: 0 },
      { size: "M", stock: 0 },
      { size: "L", stock: 0 },
      { size: "XL", stock: 0 },
    ],
    images: [
      {
        original: '/assets/slider1.JPG',
        thumbnail: '/assets/product5.jpeg',
      },
    ],
    hoverImage: '/assets/product5.jpeg',
    name: 'Sample Image',
    description: 'Made for those who hustle. Lightweight, durable, and effortlessly chic, it\'s the companion you\'ll never want to leave behind.',
    brand: 'Amazon',
    category: 'Electronic',
    price: 0,
    previousPrice: 0,
    countInStock: 0,
    rating: 1,
    numReviews: 10,
  });
  const createdProduct=await product.save();
  res.status(201).json(createdProduct);
});
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, brand, category, countInStock, sizes, image, images, hoverImage } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;
    product.sizes = sizes || product.sizes;
    product.image = image || product.image;
    product.images = images || product.images;
    product.hoverImage = hoverImage || product.hoverImage;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});


const deleteProduct = asyncHandler(async (req, res) => {

  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({_id:product._id});
    res.status(200).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const createReview = asyncHandler(async (req, res) => {
  const {rating, comment}=req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed=product.reviews.find((review)=>{
      review.user.toString()===review.user._id.toString()
    });
    if (alreadyReviewed){
      res.status(404);
      throw new Error('Product not found');
    }
    const review={
      name:req.user.name,
      rating:Number(rating),
      comment,
      user:req.user._id,
    }
    product.reviews.push(review);
    product.numReviews=product.reviews.length;
    product.rating=product.reviews.reduce((acc,review)=>acc+review.rating,0)/product.reviews.length;

    await product.save();
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
export {createProduct, updateProduct, deleteProduct, createReview};