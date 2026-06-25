const products = [
  { name: 'Sample Product 1', description: 'Nice product', price: 19.99, category: 'General', image: '/logo.svg', countInStock: 10 },
  { name: 'Sample Product 2', description: 'Another product', price: 29.99, category: 'General', image: '/logo.svg', countInStock: 5 },
];

const seed = async (Product) => {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Seeded products');
};

module.exports = { products, seed };
