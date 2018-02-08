import React from 'react';
import { HomepageMusic } from "../views/home";

const Home = ( props ) => {
    return (
        <div>
            <h1> Homepage </h1>
            <HomepageMusic { ...props } />
        </div>
    );
};

export default Home;