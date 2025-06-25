import React, { Suspense, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AllProduct = () => {
  const { serverApi, authUser } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [viewType, setViewType] = useState('table');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${serverApi}/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error:', err));
  }, [serverApi]);

  const handleDetails = (product) => {
    navigate(`/product-details/${product._id}`);
  };

  const handleAddToCart = (product) => {
    if (!authUser || !authUser.email) {
      alert("You must be logged in to add to cart.");
      return;
    }

    const cartItem = {
      productId: product._id,
      name: product.name,
      image: product.image,
      category: product.category,
      brand: product.brand,
      price: product.price,
      minSellQty: product.minSellQty,
      quantity: product.quantity,
      rating: product.rating,
      description: product.description,
      userEmail: authUser.email,
      buyDate: new Date().toISOString(),
      buyQuantity: product.minSellQty || 1,
    };

    fetch(`${serverApi}/carts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartItem),
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId || data.success) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Added to cart successfully!",
            showConfirmButton: false,
            timer: 2000
          });
        } else {
          alert("Could not add to cart.");
        }
      })
      .catch(() => alert("Failed to add to cart."));
  };

  const handleUpdate = (product) => {
    navigate(`/update-product/${product._id}`);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${serverApi}/products/${id}`, {
        method: 'DELETE',
      });

      const result = await res.json();

      if (res.ok && result.deletedCount > 0) {
        setProducts(prev => prev.filter(product => product._id !== id));
      } else {
        alert("Failed to delete the product.");
      }
    } catch {
      alert("An error occurred while deleting the product.");
    }
  };

  const filteredProducts = filtered ? products.filter(p => Number(p.quantity) > 100) : products;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center border-b border-dashed text-accent pb-2 mb-6">
        All Products
      </h1>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setFiltered(!filtered)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {filtered ? "Show All Products" : "Show Available Products"}
        </button>
        <select
          className="border border-gray-300 rounded px-3 py-2"
          value={viewType}
          onChange={(e) => setViewType(e.target.value)}
        >
          <option value="table">Table View</option>
          <option value="card">Card View</option>
        </select>
      </div>

      <Suspense fallback="Loading..">
        {viewType === 'table' ? (
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="min-w-full text-sm text-left text-gray-700 border border-gray-200">
              <thead className="bg-accent text-white sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-2 border">SL</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Image</th>
                  <th className="px-4 py-2 border">Brand</th>
                  <th className="px-4 py-2 border">Category</th>
                  <th className="px-4 py-2 border">Quantity</th>
                  <th className="px-4 py-2 border">Min Sell Qty</th>
                  <th className="px-4 py-2 border">Price</th>
                  <th className="px-4 py-2 border">Rating</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product, index) => (
                  <tr key={product._id || index} className="hover:bg-gray-200">
                    <td className="px-4 py-2 border text-center">{index + 1}</td>
                    <td className="px-4 py-2 border">{product.name}</td>
                    <td className="px-4 py-2 border">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 text-xs text-center flex items-center justify-center rounded">
                          No Image
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2 border">{product.brand || 'N/A'}</td>
                    <td className="px-4 py-2 border">{product.category}</td>
                    <td className="px-4 py-2 border text-center">{product.quantity || 0}</td>
                    <td className="px-4 py-2 border text-center">{product.minSellQty || 1}</td>
                    <td className="px-4 py-2 border text-center">{product.price || 'N/A'}</td>
                    <td className="px-4 py-2 border text-center">{product.rating || 'N/A'}</td>
                    <td className="px-4 py-2 border text-center space-x-2">
                      {/* <button onClick={() => handleAddToCart(product)} className="bg-primary hover:bg-blue-600 text-white text-xs px-3 py-1 rounded">
                        Add to Cart
                      </button> */}
                      <button onClick={() => handleDetails(product)} className="bg-secondary hover:bg-blue-600 text-white text-xs px-3 py-1 rounded">
                        Details
                      </button>
                      <button onClick={() => handleUpdate(product)} className="bg-accent hover:bg-blue-600 text-white text-xs px-3 py-1 rounded">
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan="10" className="text-center py-4 text-gray-500">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <div key={product._id} className="border rounded p-4 shadow-md">
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded mb-2" />
                <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                <p><strong>Brand:</strong> {product.brand}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Price:</strong> ${product.price}</p>
                <p><strong>Min Qty:</strong> {product.minSellQty}</p>
                <p><strong>Rating:</strong> {product.rating}</p>
                <div className="flex justify-between mt-3">
                  <button onClick={() => handleUpdate(product)} className="bg-primary hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                    Update
                  </button>
                  <button onClick={() => handleDetails(product)} className="bg-secondary hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default AllProduct;
