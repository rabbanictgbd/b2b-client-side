import React from 'react';
import Banner from '../components/Banner';
import CategorySection from '../components/CategorySection';

const Home = () => {
    return (
        <>
            <div>
                <Banner></Banner>
            </div>
            <div>
                <CategorySection></CategorySection>
            </div>
        </>
    );
};

export default Home;