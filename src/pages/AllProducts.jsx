import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const AllProduct = () => {
  const { serverApi } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products on component mount
  useEffect(() => {
    fetch(`${serverApi}/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error:', err));
  }, [serverApi]);

  // Handle update button
  const handleUpdate = (product) => {
    console.log('Edit product:', product);
    navigate(`/update-product/${product._id}`); 
  };

  // Handle delete button
  const handleDelete = (id) => {
    console.log('Delete product with ID:', id);
    //  DELETE logic here
    //  DELETE logic here
    //  DELETE logic here
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center border-b border-dashed text-accent pb-2 mb-6">
        All Products
      </h1>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full text-sm text-left text-gray-700 border border-gray-200">
          <thead className="bg-accent text-white sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2 border">SL</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Brand</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Quantity</th>
              <th className="px-4 py-2 border">Min Sell Qty</th>
              <th className="px-4 py-2 border">Rating</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product, index) => (
              <tr key={product._id || index} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border">{product.name}</td>
                <td className="px-4 py-2 border">{product.brand || 'N/A'}</td>
                <td className="px-4 py-2 border">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 border">{product.category}</td>
                <td className="px-4 py-2 border text-center">{product.quantity || 0}</td>
                <td className="px-4 py-2 border text-center">{product.minSellQty || 1}</td>
                <td className="px-4 py-2 border text-center">{product.rating || 'N/A'}</td>
                <td className="px-4 py-2 border text-center space-x-2">
                  <button
                    onClick={() => handleUpdate(product)}
                    className="bg-accent hover:bg-blue-600 text-white text-xs px-3 py-1 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProduct;
