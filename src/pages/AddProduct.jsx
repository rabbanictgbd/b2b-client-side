import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthProvider";
import { use } from "react";


const AddProduct = () => {

    const { serverApi } = use(AuthContext)

    const handleAdd = (e) => {
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form)
        const formDataEntries = Object.fromEntries(formData.entries())
        // console.log(formDataEntries)

        fetch(`${serverApi}/products`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(formDataEntries)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.insertedId) {
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: "Your data been saved successfully",
                        showConfirmButton: false,
                        timer: 2000
                    });

                }

            }
            )

    }


    return (
        <>

            <div className='p-5 m-5 bg-gray-100 rounded-3xl'>
                <div className='text-primary text-center text-3xl font-bold border-b border-dotted p-3 m-3'>Add Product</div>
                <form onSubmit={handleAdd} >
                    <div className='md:grid grid-cols-2 gap-3'>
                        <div>
                            <label className='font-semibold text-accent pl-4' htmlFor="image">Image url</label> <br />
                            <input name='image' className='border border-accent rounded-2xl p-1 m-1 w-full' id='image' type="link" placeholder='Image url' /> <br /></div>
                        <div>
                            <label className='font-semibold text-accent pl-4' htmlFor="name">Product Name</label> <br />
                            <input name='name' className='border border-accent rounded-2xl p-1 m-1 w-full' id='name' type="text" placeholder='Name' /> <br /></div>
                        <div>
                            <label className='font-semibold text-accent pl-4' htmlFor="quantity">Quantity</label> <br />
                            <input name='quantity' className='border border-accent rounded-2xl p-1 m-1 w-full' id='quantity' type="number" placeholder='Quantity' /> <br /></div>
                        <div>
                            <label className='font-semibold text-accent pl-4' htmlFor="minSellQty">Min sell quantity</label> <br />
                            <input name='minSellQty' className='border border-accent rounded-2xl p-1 m-1 w-full' id='minSellQty' type="number" placeholder='Min sell quantity' /> <br /></div>
                        <div>
                            <label className='font-semibold text-accent pl-4' htmlFor="brand">Brand name</label> <br />
                            <input name='brand' className='border border-accent rounded-2xl p-1 m-1 w-full' id='brand' type="text" placeholder='Brand name' /> <br /></div>
                        <div>
                            <label className='font-semibold text-accent pl-4' htmlFor="difficulty">Category</label> <br />
                            <select
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
                                <option value="office&stationary">Office & stationary</option>
                            </select> <br /></div>
                        <div>
                            <label className='font-semibold text-accent pl-4' htmlFor="description">Description</label> <br />
                            <input name='description' className='border border-accent rounded-2xl p-1 m-1 w-full' id='description' type="text" placeholder='Description' /> <br /></div>
                        <div>
                            <label className='font-semibold text-accent pl-4' htmlFor="price">Price</label> <br />
                            <input name='price' className='border border-accent rounded-2xl p-1 m-1 w-full' id='price' type="number" placeholder='Price' /> <br /></div>
                        <div>
                            <label className='font-semibold text-accent pl-4' htmlFor="rating">Rating</label> <br />
                            <input name='rating' className='border border-accent rounded-2xl p-1 m-1 w-full' id='rating' type="text" placeholder='Rating' /> <br /></div>

                       
                    </div>
                    <button type='submit' className='text-center btn btn-primary rounded-3xl m-1 w-full'>Submit</button>
                </form>
            </div>

        </>
    );
};

export default AddProduct;

