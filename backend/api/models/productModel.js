import mongoose from 'mongoose';

const imageSchema = mongoose.Schema({
  original: {
    type: String,
    required: [true, 'Original image URL is required'],
  },
  thumbnail: {
    type: String,
    required: [true, 'Thumbnail image URL is required'],
  },
});
const reviewSchema = mongoose.Schema({
  user: {
    type:mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"User",
  },
  name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
},{timestamps:true});
const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: [true, 'Main product image URL is required'],
    },
    hoverImage: {
      type: String,
      required: [true, 'Main product Hovering image URL is required'],
    },
    sizes: [
      {
        size: { type: String, required: true }, // Example: 'S', 'M', 'L'
        stock: { type: Number, required: true, default: 0 }, // Stock for that size
      },
    ],
    images: {
      type: [imageSchema],
      default: [],
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    brand: {
      type: String,
      required: [true, 'Product brand is required'],
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
    },
    previousPrice: {
      type: Number,
      default: 0, // Optional field, default 0
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [reviewSchema],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Pre-save middleware to calculate `countInStock` as the sum of all size stocks.
productSchema.pre("save", function (next) {
  this.countInStock = this.sizes.reduce((total, size) => total + size.stock, 0);
  next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;
