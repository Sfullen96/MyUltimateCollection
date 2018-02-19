import React from "react";
import { DataTable } from "../../common/elements";

const MusicList = ( props ) => {
    const columns = [ {
        title: "Title",
        prop: "title",
    }, {
        title: "Artist",
        prop: "artists[ 0 ].name",
    }, {
        title: "Format",
        prop: "format.name",
    }, {
        title: "Purchased From",
        prop: "purchased_from",
    }, {
        title: "Purchased On",
        prop: "purchased_on",
    }, {
        title: "Reference",
        prop: "reference",
    }, {
        title: "Uploaded On",
        prop: "created_at",
    } ];
    return (
        <div className="col-xs-12" >
            <DataTable data={ props.music } columns={ columns } />
            {/*<MusicListItem music={ item } key={ key } />*/}
        </div>
    )
};

export default MusicList;