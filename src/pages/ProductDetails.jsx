import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const ProductDetails = () => {
    const { id } = useParams();
    const { serverApi, authUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [buyQty, setBuyQty] = useState(1);
    const increaseQty = () => setBuyQty(buyQty + 1);
    const decreaseQty = () => {
        if (buyQty > 1) setBuyQty(buyQty - 1);
    };

    const [product, setProduct] = useState(null);

    const handleBuy = (e) => {
        e.preventDefault();

        if (buyQty < product.minSellQty) {
            return Swal.fire({
                icon: "warning",
                title: "Minimum Order Not Met",
                text: `You must buy at least ${product.minSellQty} units.`,
            });
        }

        const order = {
            productId: product._id,
            name: product.name,
            image: product.image,
            brand: product.brand,
            category: product.category,
            price: product.price,
            userEmail: authUser.email,
            displayName: authUser.displayName,
            buyQuantity: buyQty,
            buyDate: new Date(),
        };

        // Send to cart and update stock
        fetch(`${serverApi}/carts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    // Now decrement stock using $inc
                    return fetch(`${serverApi}/products/quantity/${product._id}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ decBy: buyQty }),
                    });
                } else {
                    throw new Error("Cart insert failed");
                }
            })
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Purchase successful!",
                });
                setIsModalOpen(false);
                // navigate(`/carts/${authUser.email}`); // redirect to cart page
            })
            .catch((err) => {
                console.error(err);
                Swal.fire({
                    icon: "error",
                    title: "Something went wrong!",
                });
            });
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
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: "Added to cart successfully!",
                        showConfirmButton: false,
                        timer: 2000
                    });
                } else {
                    alert("⚠️ Could not add to cart.");
                }
            })
            .catch((err) => {
                console.error("Add to cart error:", err);
                alert("❌ Failed to add to cart.");
            });
    };

    // Fetch product data by ID
    useEffect(() => {
        fetch(`${serverApi}/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setProduct(data)
            })
            .catch((err) => console.error("Failed to fetch product:", err));
    }, [id, serverApi]);

    const handleUpdate = (e) => {
        e.preventDefault();
    }


    if (!product) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="p-5 m-5 bg-gray-100 rounded-3xl">
            <div className="text-primary text-center text-3xl font-bold border-b border-dotted p-3 m-3">
                Product Details
            </div>

            <form onSubmit={handleUpdate}>
                <div className="flex items-center text-center justify-center">

                    <img
                        src={product.image}
                        defaultValue={product.image}
                        name="image"
                        className="border border-accent rounded-2xl p-1 m-1 items-center text-center justify-center w-1/3"
                        readOnly
                        id="image"
                        type="text"
                        placeholder="Image url"
                    />
                </div>

                <div className="md:grid grid-cols-2 gap-3">
                    <div>
                        <label className="font-semibold text-accent pl-4" htmlFor="name">
                            Product Name
                        </label>
                        <input
                            defaultValue={product.name}
                            name="name"
                            className="border border-accent rounded-2xl p-1 m-1 w-full"
                            readOnly
                            id="name"
                            type="text"
                            placeholder="Name"
                        />
                    </div>
                    <div>
                        <label className="font-semibold text-accent pl-4" htmlFor="quantity">
                            Quantity
                        </label>
                        <input
                            defaultValue={product.quantity}
                            name="quantity"
                            className="border border-accent rounded-2xl p-1 m-1 w-full"
                            readOnly
                            id="quantity"
                            type="number"
                            placeholder="Quantity"
                        />
                    </div>
                    <div>
                        <label className="font-semibold text-accent pl-4" htmlFor="minSellQty">
                            Min sell quantity
                        </label>
                        <input
                            defaultValue={product.minSellQty}
                            name="minSellQty"
                            className="border border-accent rounded-2xl p-1 m-1 w-full"
                            readOnly
                            id="minSellQty"
                            type="number"
                            placeholder="Min sell quantity"
                        />
                    </div>
                    <div>
                        <label className="font-semibold text-accent pl-4" htmlFor="brand">
                            Brand name
                        </label>
                        <input
                            defaultValue={product.brand}
                            name="brand"
                            className="border border-accent rounded-2xl p-1 m-1 w-full"
                            readOnly
                            id="brand"
                            type="text"
                            placeholder="Brand name"
                        />
                    </div>
                    <div>
                        <label className="font-semibold text-accent pl-4" htmlFor="category">
                            Category
                        </label>
                        <select
                            defaultValue={product.category}
                            name="category"
                            disabled
                            id="category"
                            className="border border-accent rounded-3xl p-2 m-1 w-full text-accent"
                            required
                        >
                            <option value="">Select category</option>
                            <option value="electronics">Electronics</option>
                            <option value="home">Home</option>
                            <option value="kitchen">Kitchen</option>
                            <option value="fashion">Fashion</option>
                            <option value="health">Health</option>
                            <option value="beauty">Beauty</option>
                            <option value="accessories">Accessories</option>
                            <option value="office&stationary">Office & Stationary</option>
                            <option value="others">Others</option>
                        </select>
                    </div>
                    <div>
                        <label className="font-semibold text-accent pl-4" htmlFor="description">
                            Description
                        </label>
                        <input
                            defaultValue={product.description}
                            name="description"
                            className="border border-accent rounded-2xl p-1 m-1 w-full"
                            readOnly
                            id="description"
                            type="text"
                            placeholder="Description"
                        />
                    </div>
                    <div>
                        <label className="font-semibold text-accent pl-4" htmlFor="price">
                            Price
                        </label>
                        <input
                            defaultValue={product.price}
                            name="price"
                            className="border border-accent rounded-2xl p-1 m-1 w-full"
                            readOnly
                            id="price"
                            type="number"
                            placeholder="Price"
                        />
                    </div>
                    <div>
                        <label className="font-semibold text-accent pl-4" htmlFor="rating">
                            Rating
                        </label>
                        <input
                            defaultValue={product.rating}
                            name="rating"
                            className="border border-accent rounded-2xl p-1 m-1 w-full"
                            readOnly
                            id="rating"
                            type="text"
                            placeholder="Rating"
                        />
                    </div>
                    <div>
                        <label className="font-semibold text-accent pl-4" htmlFor="content">
                            Product Content
                        </label>
                        <input
                            defaultValue={product.content}
                            name="content"
                            className="border border-accent rounded-2xl p-1 m-1 w-full"
                            readOnly
                            id="content"
                            type="text"
                            placeholder="Product Content"
                        />
                    </div>
                </div>
                {/* <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-secondary btn btn-primary hover:bg-accent text-white m-1 text-xs px-3 py-1 rounded-3xl w-full"
                >
                    Add to Cart
                </button> */}
                <button
                    type="button"
                    className="text-center btn btn-primary hover:bg-accent rounded-3xl m-1 w-full"
                    onClick={() => setIsModalOpen(true)}
                >
                    Buy
                </button>

            </form>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Confirm Purchase</h2>
                        <form onSubmit={handleBuy}>
                            <input className="input" readOnly value={authUser.displayName} />
                            <input className="input" readOnly value={authUser.email} />

                            <div className="flex items-center mt-4">
                                <button type="button" onClick={decreaseQty} className="btn btn-sm">➖</button>
                                <span className="px-4">{buyQty}</span>
                                <button type="button" onClick={increaseQty} className="btn btn-sm">➕</button>
                            </div>

                            <div className="mt-4">
                                <button type="submit" className="btn btn-primary w-full">Buy Now</button>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary mt-2 w-full">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ProductDetails;
