import React from "react";
import { Link } from "react-router-dom";
import defaultImage from "../../../../../public/images/placeholder.png"

const HomeMusicItem = ( props ) => {
    const host = window.location.host;

    return (
        <div className="homepage-music-item" style={ { backgroundImage: `url('${ props.music.image ? props.music.image : defaultImage }')` } } >
            <div className="overlay">
            </div>
            <div className="text">
                <h3>
                    <Link to={ `/music/${ props.music.id }` } >{ props.music.title }</Link>
                </h3>
                <h4>
                    {
                        props.music.artists.map( ( artist ) => {
                            return <Link to={ `/artist/${ artist.id }` } > { artist.name } </Link>;
                        } )
                    }
                </h4>
            </div>
        </div>
    );
};

export default HomeMusicItem;