import React, { use } from 'react';
import { Link, Navigate } from 'react-router';
import { AuthContext } from '../context/AuthProvider';
import { updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';


const Register = () => {
    const { createUser, setAuthUser, googleLogin } = use(AuthContext)
    const handleRegister = (e) => {
        e.preventDefault()
        // console.log(e.target)
        const name = e.target.name.value
        const email = e.target.email.value
        const photo = e.target.photo.value
        const password = e.target.password.value
        // console.log({ name, email, photo, password })
        const minLength = 8;
        const uppercasePattern = /[A-Z]/;
        const numberPattern = /[0-9]/;
        const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;

        if (password.length < minLength) {
            alert("Password must be at least 8 characters long.");
            return;
        }
        if (!uppercasePattern.test(password)) {
            alert("Password must contain at least one uppercase letter.");
            return;
        }
        if (!numberPattern.test(password)) {
            alert("Password must contain at least one number.");
            return;
        }
        if (!specialCharPattern.test(password)) {
            alert("Password must contain at least one special character.");
            return;
        }

        createUser(email, password)
            .then(result => {
                const user = result.user;
                // console.log(user)
                updateProfile(user, {
                    displayName: name,
                    photoURL: photo,
                })
                .then(()=>{
                    setAuthUser({...user, displayName: name, photoURL: photo})
                    Swal.fire({
                                            position: "top",
                                            icon: "success",
                                            title: "Your profile updated successfully",
                                            showConfirmButton: false,
                                            timer: 2000
                                        });
                    

                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode, errorMessage)
            });

    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then(() => {
                alert('Google sign-in successful.');
                Navigate('/');
            })
            .catch((error) => {
                alert(error.message);
            });
    };
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col ">
                    <div className="text-center ">
                        <h1 className="text-5xl text-accent font-bold">Register now!</h1>
                        <p className="py-6">
                            Please fill up the form correctly to register to the website.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleRegister} className="card-body">
                            <fieldset className="fieldset">
                                <label className="label">Name</label>
                                <input required name='name' type="text" className="input" placeholder="Name" />
                                <label className="label">Email</label>
                                <input required name='email' type="email" className="input" placeholder="Email" />
                                <label className="label">photo</label>
                                <input required name='photo' type="text" className="input" placeholder="photo url" />
                                <label className="label">Password</label>
                                <input required name='password' type="password" className="input" placeholder="Password" />
                                <button type='submit' className="btn btn-primary mt-4">Register</button>
                                <div className="divider">OR</div>
                                <button type='button' className="btn btn-outline btn-secondary" onClick={handleGoogleLogin}>
                                    Login with Google
                                </button>
                                <h3>Already have an account? <Link className='text-blue-500' to='/login' >Login</Link></h3>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;