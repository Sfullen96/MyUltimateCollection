import React from "react";
import { MusicTile } from "./elements";

const MusicTiles = ( props ) => {
    console.log( "PROPS", props );
    return (
        props
            .music
            .map( ( item, key ) => {
                return (
                    <div className={ !props.classString ? ` col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 music-item-container ` : props.classString } key={ key } >
                        <MusicTile music={ item } key={ key } />
                    </div>
                )
            } )
    )
};

export default MusicTiles;