import React from 'react';
import { HomepageMusic } from "../views/home";

const Home = ( props ) => {
    return (
        <div>
            <HomepageMusic { ...props } />
        </div>
    );
};

export default Home;