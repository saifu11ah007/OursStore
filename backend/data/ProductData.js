const productList = [
  {
    id: 1,
    image: '/assets/product5.jpeg',
    sizes: [
      { size: "S", stock: 2 },
      { size: "M", stock: 0 },
      { size: "L", stock: 5 },
      { size: "XL", stock: 3 },
    ],
    images: [
      {
        original: '/assets/slider1.JPG',
        thumbnail: '/assets/product5.jpeg',
      },
    ],
    hoverImage: '/assets/product2.jpeg',
    name: 'Graphic Hoodie',
    description: 'Made for those who hustle. Lightweight, durable, and effortlessly chic, it\'s the companion you\'ll never want to leave behind.',
    brand: 'Amazon',
    category: 'Electronic',
    price: 2000,
    previousPrice: 1599,
    countInStock: 10,
    rating: 4,
    numReviews: 10,
  },
  {
    id: 2,
    sizes: [
      { size: "XS", stock: 3 },
      { size: "S", stock: 2 },
      { size: "M", stock: 3 },
      { size: "L", stock: 2 },
      { size: "XL", stock: 0 },
    ],
    images: [
      {
        original: '/assets/product2.jpeg',
        thumbnail: '/assets/product2.jpeg',
      },
    ],
    image: '/assets/product2.jpeg',
    hoverImage: '/assets/product3.jpeg',
    name: 'SweatShirt Special',
    description: 'Turn heads wherever you go with this perfect blend of style and comfort. Crafted for trendsetters, this piece is a must-have for your wardrobe!',
    brand: 'Groovy',
    category: 'Hoodie',
    price: 3599,
    countInStock: 3100,
    previousPrice: 3,
    rating: 5,
    numReviews: 4,
  },
  {
    id: 3,
    sizes: [
      { size: "XS", stock: 1 },
      { size: "S", stock: 2 },
      { size: "M", stock: 0 },
      { size: "L", stock: 1 },
      { size: "XL", stock: 1 },
    ],
    images: [
      {
        original: '/assets/product2.jpeg',
        thumbnail: '/assets/slider1.JPG',
      },
    ],
    image: '/assets/product2.jpeg',
    hoverImage: '/assets/product3.jpeg',
    name: 'Cold Drink',
    description: 'Whether you\'re hitting the gym or the streets, this product adapts to your vibe. Premium quality that keeps you moving in style.',
    brand: 'Express',
    category: 'Casual',
    previousPrice: 3500,
    price: 2546,
    countInStock: 5,
    rating: 4,
    numReviews: 3,
  },
  {
    id: 4,
    sizes: [
      { size: "S", stock: 0 },
      { size: "M", stock: 0 },
      { size: "L", stock: 0 },
      { size: "XL", stock: 0 },
    ],
    images: [
      {
        original: '/assets/slider1.JPG',
        thumbnail: '/assets/product3.jpeg',
      },
    ],
    image: '/assets/slider1.JPG',
    hoverImage: '/assets/product2.jpeg',
    name: 'Jacket Oversized',
    description: 'Designed with precision and crafted with care, this product delivers top-notch performance without compromising on elegance.',
    brand: 'Amazon',
    previousPrice: 1950,
    category: 'Electronic',
    price: 2000,
    countInStock: 0,
    rating: 0.5,
    numReviews: 10,
  },
];

// Ensure all products have a default size structure
productList.forEach((product) => {
  const defaultSizes = ["S", "M", "L", "XL"];
  const existingSizes = product.sizes.map((s) => s.size);

  defaultSizes.forEach((size) => {
    if (!existingSizes.includes(size)) {
      product.sizes.push({ size, stock: 0 });
    }
  });
});

export default productList;
