import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useParams } from 'react-router-dom'; // should be 'react-router-dom'
import Swal from 'sweetalert2';
import { motion, MotionConfig } from 'framer-motion';
import MotionTest from '../components/MotionTest';

const CartPage = () => {
    const { serverApi } = useContext(AuthContext);
    const { email } = useParams();
    const [carts, setCarts] = useState([]);
    const [loading, setLoading] = useState(true);

    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-blue-200 rounded-lg shadow"
    >
      <h1 className="text-xl font-bold">Hello Animation!</h1>
    </motion.div>

    const handleRemove = (item) => {
        console.log("remove clicked", item._id);
        fetch(`${serverApi}/carts/${item._id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    setCarts(prev => prev.filter(cartItem => cartItem._id !== item._id));
                    Swal.fire({
                        icon: 'success',
                        title: 'Removed from cart',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(err => console.error("Failed to delete item:", err));
           return fetch(`${serverApi}/products/quantity/${item.productId}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ decBy: -item.buyQuantity }),
                    });
    };
    useEffect(() => {
        if (!email) return;

        fetch(`${serverApi}/carts/${email}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Cart data:", data);
                setCarts(data);
            })
            .catch((err) => {
                console.error("Failed to load cart:", err);
            })
            .finally(() => setLoading(false));
    }, [serverApi, email]);

    if (loading) return <p className="text-center mt-4">Loading cart...</p>;

    return (
        <MotionTest>
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">🛒 Cart Page</h1>
            <p><strong>Total items:</strong> {carts.length}</p>


            {carts.length === 0 ? (
                <p className="text-center text-gray-500 mt-8 text-lg font-medium">
                    ❌ No data found in your cart.
                </p>

            ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
                    {carts.map((item, idx) => (
                        <div key={item._id || idx} className="p-4 border rounded-lg shadow">
                            <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded" />
                            <h2 className="text-lg font-semibold mt-2">{item.name}</h2>

                            <p><strong>Brand:</strong> {item.brand}</p>
                            <p><strong>Category:</strong> {item.category}</p>
                            <p><strong>Buy Date:</strong> {new Date(item.buyDate).toLocaleDateString()}</p>
                            <p><strong>Buy Quantity:</strong> {item.buyQuantity}</p>
                            <button onClick={() => handleRemove(item)} className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                                Remove
                            </button>
                        </div>
                        
                    ))}
                </div>
                
            )}

        </div>
        </MotionTest>
    );
};

export default CartPage;
