import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate, useParams } from 'react-router-dom'; // 🛠 Corrected from 'react-router' to 'react-router-dom'

const AllCategories = () => {
  const { id } = useParams();
  const { serverApi } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  const navigate=useNavigate()

   // Handle Details button
  const handleDetails = (product) => {
    console.log('Edit product:', product);
    navigate(`/product-details/${product._id}`);
  };

  useEffect(() => {
    fetch(`${serverApi}/categories`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        console.log(data);
      })
      .catch(error => console.error('Failed to fetch category products:', error));
  }, [serverApi,]);
  

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Products in Category: All {id}</h2>
      {products.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map(product => (
            <li key={product._id} className="border p-4 rounded shadow">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2" />
              <h3 className="font-bold">{product.name}</h3>
              <p>Brand: {product.brand}</p>
              <p>Category:{product.category}</p>
              <p>Price: ${product.price}</p>
              <p>Rating: {product.rating}</p>
              <button
                      onClick={() => handleDetails(product)}
                      className="bg-secondary hover:bg-blue-600 text-white text-xs px-3 py-1 rounded"
                    >
                      Details
                    </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllCategories;
