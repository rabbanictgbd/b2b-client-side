import React from 'react';
import Banner from '../components/Banner';
import CategorySection from '../components/CategorySection';
import MotionTest from '../components/MotionTest';
import TopProducts from '../components/TopProducts';
import CompanyOverview from '../components/CompanyOverview';

const Home = () => {
    return (
        <>
            <div>
                <Banner></Banner>
            <MotionTest></MotionTest>
            </div>
            <div id='product-category'>
                <CategorySection></CategorySection>
            </div>
            <div>
                <TopProducts></TopProducts>
            </div>
            <div>
                <CompanyOverview></CompanyOverview>
            </div>
        </>
    );
};

export default Home;