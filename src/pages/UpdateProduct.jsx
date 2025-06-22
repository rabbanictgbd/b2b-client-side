import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const UpdateProduct = () => {
  const { id } = useParams();
  const { serverApi } = useContext(AuthContext);
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  // Fetch product data by ID
  useEffect(() => {
    fetch(`${serverApi}/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setProduct(data)})
      .catch((err) => console.error("Failed to fetch product:", err));
  }, [id, serverApi]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedProduct = Object.fromEntries(formData.entries());

    fetch(`${serverApi}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((res) => res.json())
      .then((data) => {
  if (data.modifiedCount > 0) {
    Swal.fire({
      position: "top",
      icon: "success",
      title: "Product updated successfully",
      showConfirmButton: false,
      timer: 2000,
    });
    navigate("/all-products");
  } else {
    Swal.fire({
      icon: "info",
      title: "No changes made",
      text: "You didn't modify any fields.",
    });
  }
  
});

  };

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-5 m-5 bg-gray-100 rounded-3xl">
      <div className="text-primary text-center text-3xl font-bold border-b border-dotted p-3 m-3">
        Update Product
      </div>

      <form onSubmit={handleUpdate}>
        <div className="md:grid grid-cols-2 gap-3">
          <div>
            <label className="font-semibold text-accent pl-4" htmlFor="image">
              Image url
            </label>
            <input
              defaultValue={product.image}
              name="image"
              className="border border-accent rounded-2xl p-1 m-1 w-full"
              id="image"
              type="text"
              placeholder="Image url"
            />
          </div>
          <div>
            <label className="font-semibold text-accent pl-4" htmlFor="name">
              Product Name
            </label>
            <input
              defaultValue={product.name}
              name="name"
              className="border border-accent rounded-2xl p-1 m-1 w-full"
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
              id="content"
              type="text"
              placeholder="Product Content"
            />
          </div>
        </div>
        <button type="submit" className="text-center btn btn-primary rounded-3xl m-1 w-full">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
