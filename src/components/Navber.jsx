import React, { use } from 'react';
import { Link } from 'react-router';
// import logo from '/src/assets/g_logo.jpg'
import { AuthContext } from '../context/AuthProvider';

const Navber = () => {
  const { authUser, logout } = use(AuthContext)
  // const authUser = use(AuthContext)

  const handleLogout = () => {
    // console.log('lo')
    logout()
      .then(() => {
        alert('Sign-out successful.')
      }).catch((error) => {
        alert(error)
      });
  }

  const links = (
    <>
      <li className='font-bold text-secondary'> <Link to='/'>Home</Link></li>
      <li className='font-bold text-secondary'> <Link to='/categories'>Categories</Link></li>
      <li className='font-bold text-secondary'> <Link to='/all-products'>All Products</Link></li>
      <li className='font-bold text-secondary'> <Link to='/add-products'>Add Products</Link></li>
      <li className='font-bold text-secondary'> <Link to='/my-products'>My Products</Link></li>
      <li className='font-bold text-secondary'> <Link to='/cart'>Cart</Link></li>
    </>
  )

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              
              {links}


            </ul>
          </div>
          {/* <img className='w-7' src={logo} alt="G Logo" /> */}
          <Link className="btn btn-ghost text-xl font-bold text-primary" to='/'> B2B wholesale platform </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">


            {links}


          </ul>
        </div>
        <div className="navbar-end">
          <button type='submit' className="btn btn-primary mt-4">
            {authUser ? <Link onClick={handleLogout} > Logout</Link> : <Link to='/login'> Login</Link>}
          </button>
          {/* {console.log(authUser)} */}

        </div>
      </div>
    </div>
  );
};

export default Navber;