import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useParams } from 'react-router';


const CartPage = () => {
    const { serverApi } = useContext(AuthContext)
    const {email}= useParams()
    const [carts, setCarts] = useState([])
    fetch(`${serverApi}/carts/${email}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setCarts(data)
        })
    return (
        <div>
            <h1>
                {carts.length}
                <br />
                {email.length}
            </h1>
        </div>
    );
};

export default CartPage;