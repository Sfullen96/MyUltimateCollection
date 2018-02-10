import React from 'react';
import { MusicPage } from "../views/music";

const Home = ( props ) => {
    return (
        <div>
            <MusicPage { ...props } />
        </div>
    );
};

export default Home;