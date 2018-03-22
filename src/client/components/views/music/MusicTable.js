import React from "react";
import { Table } from "../../common/elements";

const MusicTable = ( props ) => {
    return (
        <div className="col-xs-12" >
            <Table data={ props.music } />
        </div>
    )
};

export default MusicTable;