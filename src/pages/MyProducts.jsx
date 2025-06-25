import React, { Suspense, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyProducts = () => {
  const { serverApi , authUser} = useContext(AuthContext);
  const {email}=useParams()
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products on component mount
  useEffect(() => {
    fetch(`${serverApi}/my-products/${email}`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error:', err));
  }, [serverApi, email]);

  // Handle Details button
  const handleDetails = (product) => {
    console.log('Edit product:', product);
    navigate(`/product-details/${product._id}`);
  };

  // Handle Cart button
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


  console.log('Cart Item:', cartItem);

  fetch(`${serverApi}/carts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cartItem),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Server Response:", data);
      if (data.insertedId || data.success) {
        alert("✅ Added to cart successfully!");
      } else {
        alert("⚠️ Could not add to cart.");
      }
    })
    .catch((err) => {
      console.error("Add to cart error:", err);
      alert("❌ Failed to add to cart.");
    });
};


  // Handle update button
  const handleUpdate = (product) => {
    console.log('Edit product:', product);
    navigate(`/update-product/${product._id}`);
  };

  // Handle delete button
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${serverApi}/products/${id}`, {
        method: 'DELETE',
      });

      const result = await res.json();
      console.log(result);

      if (res.ok && result.deletedCount > 0) {
        Swal.fire({
                                position: "top",
                                icon: "success",
                                title: "Product deleted successfully!",
                                showConfirmButton: false,
                                timer: 2000
                            });
        // Update the UI without the deleted product
        setProducts(prev => prev.filter(product => product._id !== id));
      } else {
        alert("Failed to delete the product.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("An error occurred while deleting the product.");
    }
  };


  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center border-b border-dashed text-accent pb-2 mb-6">
        All Products
      </h1>
      <Suspense fallback="Loading..">
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
              {products.map((product, index) => (
                <tr key={product._id || index} className="hover:bg-gray-200 ">
                  <td className="px-4 py-2 border text-center">{index + 1}</td>
                  <td className="px-4 py-2 border">{product.name}</td>
                  <td className="px-4 py-2 border">
                    {product.image ? (

                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
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
                    {/* <button
                      onClick={() => handleAddToCart(product, authUser)}
                      className="bg-primary hover:bg-blue-600 text-white text-xs px-3 py-1 rounded"
                    >
                      Add to Cart
                    </button> */}
                    <button
                      onClick={() => handleDetails(product)}
                      className="bg-secondary hover:bg-blue-600 text-white text-xs px-3 py-1 rounded"
                    >
                      Details
                    </button>
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
      </Suspense>
    </div>
  );
};

export default MyProducts;
