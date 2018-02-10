import React from 'react';
import { HomepageMusic } from "../home";

const SearchResults = ( props ) => {
    return (
        <div>
            <HomepageMusic { ...props } />
        </div>
    );
};

export default SearchResults;