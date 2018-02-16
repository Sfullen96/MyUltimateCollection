import React from "react";
import { MusicListItem } from "./elements";

const MusicList = ( props ) => {
    return (
        props
            .music
            .map( ( item, key ) => {
                return (
                    <div className="col-xs-12 col-sm-4 col-md-4 col-lg-2 music-item-container" key={ key } >
                        <MusicListItem music={ item } key={ key } />
                    </div>
                )
            } )
    )
};

export default MusicList;