import React from 'react';
import Navber from '../components/Navber';
import { Outlet } from 'react-router';
// import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <div>
            <div className="sticky z-20 top-0 bg-white shadow-md">
                <Navber></Navber>
            </div>
            <div>
                <Outlet></Outlet>
            </div>
            <div>
                {/* <Footer></Footer> */}
            </div>
        </div>
    );
};

export default MainLayout;