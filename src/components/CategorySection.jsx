import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Electronics', image: '/img/electronics.jpg' },
  { name: 'Furniture', image: '/img/furniture.jpg' },
  { name: 'Clothing', image: '/img/clothing.jpg' },
  { name: 'Books', image: '/img/books.jpg' },
  { name: 'Toys', image: '/img/toys.jpg' },
];

const CategorySection = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Product Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((cat, idx) => (
          <Link key={idx} to={`/categories/${cat.name}`}>
            <div className="shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition">
              <img src={cat.image} alt={cat.name} className="w-full h-40 object-cover" />
              <div className="p-4 text-center font-semibold text-lg text-primary">{cat.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
