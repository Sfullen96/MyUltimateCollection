import React from "react";
import { Link } from "react-router-dom";
import defaultImage from "../../../../../public/images/placeholder.png"

const HomeMusicItem = ( props ) => {
    return (
        <Link to={ `/music/${ props.music.id }` } >
            <div className="homepage-music-item" style={ { backgroundImage: `url('${ props.music.image ? props.music.image : defaultImage }')` } } >
                <div className="overlay">
                </div>
                <div className="text">
                    <h3>
                        <Link to={ `/music/${ props.music.id }` } >
                            {
                                props.music.title.includes( "(the)" ) || props.music.title.includes( "(The)" )
                                ?
                                    `The ${ props.music.title }`
                                :
                                    props.music.title
                            }
                            </Link>
                    </h3>
                    <h4>
                        {
                            props.music.artists.map( ( artist, key ) => {
                                return <Link to={ `/artist/${ artist.id }` } key={ key }>{
                                    artist.name.includes( "(the)" ) || artist.name.includes( "(The)" )
                                        ?
                                        `The ${ artist.name.substring( 0, artist.name.length - 6 ) }`
                                        :
                                        artist.name
                                }
                                </Link>;
                            } )
                        }
                    </h4>
                </div>
            </div>
        </Link>
    );
};

export default HomeMusicItem;