import React from "react";
import { Table } from "../../common/elements";

const MusicTable = ( props ) => {
    return (
        <div className="col-12" >
            <Table data={ props.music } columns={ props.meta.columns } />
        </div>
    )
};

export default MusicTable;