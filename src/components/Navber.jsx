import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
// import logo from '/src/assets/g_logo.jpg'
import { AuthContext } from '../context/AuthProvider';
import MotionTest from './MotionTest';

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
 const linksNonUser = (
    <>
      <div className="flex gap-3">
        <NavLink className={({ isActive }) => isActive ? 'font-bold text-white bg-accent border border-accent p-1 rounded-md' : 'font-bold text-secondary'} to='/'>Home</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'font-bold text-white bg-accent border border-accent p-1 rounded-md' : 'font-bold text-secondary'} to='/categories'>Categories</NavLink>
        {/* {authUser && authUser.email &&(   */}
        <NavLink className={({ isActive }) => isActive ? 'font-bold text-white bg-accent border border-accent p-1 rounded-md' : 'font-bold text-secondary'} to={`/carts/${authUser?.email}`} >Cart</NavLink>
        {/* // )} */}
      </div>
    </>
  )
  const links = (
    <>
      <div className="flex gap-3">
        <NavLink className={({ isActive }) => isActive ? 'font-bold text-white bg-accent border border-accent p-1 rounded-md' : 'font-bold text-secondary'} to='/'>Home</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'font-bold text-white bg-accent border border-accent p-1 rounded-md' : 'font-bold text-secondary'} to='/categories'>Categories</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'font-bold text-white bg-accent border border-accent p-1 rounded-md' : 'font-bold text-secondary'} to='/all-products'>All Products</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'font-bold text-white bg-accent border border-accent p-1 rounded-md' : 'font-bold text-secondary'} to='/add-products'>Add Products</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'font-bold text-white bg-accent border border-accent p-1 rounded-md' : 'font-bold text-secondary'} to={`/my-products/${authUser?.email}`}>My Products</NavLink>
        {/* {authUser && authUser.email &&(   */}
        <NavLink className={({ isActive }) => isActive ? 'font-bold text-white bg-accent border border-accent p-1 rounded-md' : 'font-bold text-secondary'} to={`/carts/${authUser?.email}`} >Cart</NavLink>
        {/* // )} */}
      </div>
    </>
  )

  return (
    <div>
      <div className="navbar bg-base-100 px-30 shadow-sm">
        <div className="navbar-start">

          {/* <img className='w-7' src={logo} alt="G Logo" /> */}
          <Link className="text-xl  font-bold text-primary" to='/'>
            <h1 className='shadow-sm bg-base-100 font-bold text-xl text-primary'>B2B Wholesale Platform</h1>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">

{authUser?(links): (linksNonUser)}
           


          </ul>
        </div>

        
        {authUser ? (
          <div className="relative group navbar-end">
            <img
              src={authUser.photoURL}
              alt={authUser.displayName || "User"}
              title={authUser.displayName || "User"}
              className="w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-105"
            />
            {/* Hover dropdown */}
            <div className="absolute right-0 bg-white shadow-lg rounded-lg p-3 z-50 hidden group-hover:flex flex-col min-w-[150px]">
              <p className="text-sm font-semibold text-gray-700">{authUser.displayName}</p>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:underline mt-2 text-sm text-left"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className='navbar-end'> <Link to="/login" className="btn btn-primary">Login</Link> </div>
        )}

      </div>
    </div>
  );
};

export default Navber;