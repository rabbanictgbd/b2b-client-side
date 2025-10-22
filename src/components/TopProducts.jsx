import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router';

const TopProducts = () => {

     const { serverApi, } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products on component mount
  useEffect(() => {
    fetch(`${serverApi}/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error:', err));
  }, [serverApi]);
    return (
        <div className='bg-base-100 mx-20 my-5 p-10 rounded-lg'>
            <div className="">
                <h2 className="text-xl font-semibold mb-4">Top Products</h2>

                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {products.slice(0,6).map(product => (
                        <li key={product._id} className="border p-4 rounded shadow">
                            <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2" />
                            <h3 className="font-bold">{product.name}</h3>
                            <p>Brand: {product.brand}</p>
                            <p>Category:{product.category}</p>
                            <p>Price: ${product.price}</p>
                            <p>Rating: {product.rating}</p>
                           
                        </li>
                    ))}
                </ul>


            </div>
        </div>
    );
};

export default TopProducts;