import React from 'react';
import Banner from '../components/Banner';
import CategorySection from '../components/CategorySection';
import MotionTest from '../components/MotionTest';

const Home = () => {
    return (
        <>
            <div>
                <Banner></Banner>
            <MotionTest></MotionTest>
            </div>
            <div>
                <CategorySection></CategorySection>
            </div>
        </>
    );
};

export default Home;