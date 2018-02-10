import React from "react";
import { MusicTile } from "./elements";

const MusicTiles = ( props ) => {
    return (
        props
            .music
            .map( ( item, key ) => {
                return (
                    <div className="col-xs-12 col-sm-4 col-md-4 col-lg-2 homepage-item-container" key={ key } >
                        <MusicTile music={ item } key={ key } />
                    </div>
                )
            } )
    )
};

export default MusicTiles;