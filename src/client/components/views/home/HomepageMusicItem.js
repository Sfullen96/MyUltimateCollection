import React from "react";

const HomeMusicItem = ( props ) => {
    return (
        <div className="homepage-music-item" style={ { backgroundImage: `url('${ props.music.image }')` } } >
            <div className="overlay"></div>
            <h3> { props.music.title } </h3>
            {
                props.music.artists.map( ( artist ) => {
                    return <h4> { artist.name } </h4>;
                } )
            }
        </div>
    );
};

export default HomeMusicItem;