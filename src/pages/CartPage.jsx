import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useParams } from 'react-router-dom'; // should be 'react-router-dom'

const CartPage = () => {
    const { serverApi } = useContext(AuthContext);
    const { email } = useParams();
    const [carts, setCarts] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleRemove = (id) => {
        console.log("remove clicked", id)
        fetch(`${serverApi}/carts/${id}`,{
            method: "delete"
        })
        
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
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">🛒 Cart Page</h1>
            <p><strong>Total items:</strong> {carts.length}</p>
            <p><strong>User Email:</strong> {email}</p>

            {/* Show items */}
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
                {carts.map((item, idx) => (
                    <div key={item._id || idx} className="p-4 border rounded-lg shadow">
                        <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded" />
                        <h2 className="text-lg font-semibold mt-2">{item.name}</h2>

                        <p><strong>Brand:</strong> {item.brand}</p>
                        <p><strong>Category:</strong> {item.category}</p>
                        <p><strong>Buy Date:</strong> {new Date(item.buyDate).toLocaleDateString()}</p>
                        <p><strong>Buy Quantity:</strong> {item.buyQuantity}</p>
                        <button onClick={() => handleRemove(item._id)} className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CartPage;
