import React from "react";
import { Link, withRouter } from "react-router-dom";
import defaultImage from "../../../../../../public/images/placeholder.png"

const MusicTile = ( props ) => {
    return(
        <div className="music-tile" onClick={ () => { props.history.push( `/music/${ props.music.id }` ) } } style={ { backgroundImage: `url('${ props.music.image ? props.music.image : defaultImage }')` } } >
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
    );
};

export default withRouter( MusicTile );

