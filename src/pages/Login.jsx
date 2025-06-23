import React, { use } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthProvider';

const Login = () => {
    const { authUser, login, googleLogin } = use(AuthContext);
    // console.log(authUser)
    const navigate= useNavigate()
    const location=useLocation()
    const from= location?.state?.from?.pathname 

    const handleLogin = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        // console.log(email, password)
        login(email, password)
            .then(() => {
                alert('Signed in successful.')
                navigate(from, {replace: true})
            }).catch((error) => {
                alert(error)
            });
    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then(() => {
                alert('Google sign-in successful.');
                navigate(from, { replace: true });
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
                        <h1 className="text-5xl text-primary font-bold">Login now!</h1>
                        <p className="py-6">
                            Please fill up the form correctly to login to the website.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleLogin} className="card-body">
                            <fieldset className="fieldset">
                                <label className="label">Email</label>
                                <input name='email' type="email" className="input" placeholder="Email" />
                                <label className="label">Password</label>
                                <input name='password' type="password" className="input" placeholder="Password" />
                                <div><a className="link link-hover">Forgot password?</a></div>

                                <button type='submit' className="btn btn-primary mt-4"> Login</button>
                            </fieldset>
                            <div className="divider">OR</div>
                        <button type='button' className="btn btn-outline btn-secondary" onClick={handleGoogleLogin}>
                            Login with Google
                        </button>
                            <h3>Don't have an account? <Link className='text-blue-500' to='/register' >Register</Link></h3>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;