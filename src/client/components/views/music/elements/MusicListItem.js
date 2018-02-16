import React from "react";
import { Link, withRouter } from "react-router-dom";
import defaultImage from "../../../../../../public/images/placeholder.png"

const MusicTile = ( props ) => {
    return(
        <div className="music-tile" onClick={ () => { props.history.push( `/music/${ props.music.id }` ) } } style={ { backgroundImage: `url('${ props.music.image ? props.music.image : defaultImage }')` } } >
            <h1>MUSIC LIST</h1>
        </div>
    );
};

export default withRouter( MusicTile );

