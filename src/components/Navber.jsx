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

  const links = (
    <>
    <div className="flex gap-3">
       <NavLink className={({isActive})=> isActive? 'font-bold text-white bg-accent border border-accent p-1 rounded-md':'font-bold text-secondary' } to='/'>Home</NavLink>
       <NavLink className={({isActive})=> isActive? 'font-bold text-white bg-accent border border-accent p-1 rounded-md':'font-bold text-secondary' } to='/categories'>Categories</NavLink>
       <NavLink className={({isActive})=> isActive? 'font-bold text-white bg-accent border border-accent p-1 rounded-md':'font-bold text-secondary' } to='/all-products'>All Products</NavLink>
       <NavLink className={({isActive})=> isActive? 'font-bold text-white bg-accent border border-accent p-1 rounded-md':'font-bold text-secondary' } to='/add-products'>Add Products</NavLink>
       <NavLink className={({isActive})=> isActive? 'font-bold text-white bg-accent border border-accent p-1 rounded-md':'font-bold text-secondary' } to={`/my-products/${authUser?.email}`}>My Products</NavLink>
    {/* {authUser && authUser.email &&(   */}
       <NavLink className={({isActive})=> isActive? 'font-bold text-white bg-accent border border-accent p-1 rounded-md':'font-bold text-secondary' } to= {`/carts/${authUser?.email}`} >Cart</NavLink>
      {/* // )} */}
      </div>
    </>
  )

  return (
    <div>
      <div className="navbar bg-base-100 px-20 shadow-sm">
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
          <Link className="btn btn-ghost text-xl font-bold text-primary" to='/'>
           <MotionTest></MotionTest>
           </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">


            {links}


          </ul>
        </div>
        {/* <div className="navbar-end">
          <button type='submit' className=" ">
            {authUser ? <Link onClick={handleLogout} > <img  className=`w-12 h-12 rounded-full hover:${authUser.displayName}` src={authUser.photoURL} alt="U Photo" /></Link> : <Link to='/login'> Login</Link>}
          </button>
         { console.log(authUser)}
        </div> */}
        
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