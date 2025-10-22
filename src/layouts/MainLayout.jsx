import React from 'react';
import Navber from '../components/Navber';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <div className='bg-white'>
            <div className="sticky z-20 top-0 bg-white shadow-md">
                <Navber></Navber>
            </div>
            <div className='min-h-screen p-5 m-5'>
                <Outlet></Outlet>
            </div>
            <div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default MainLayout;