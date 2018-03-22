import React from "react";
import { TableHeader, TableRow } from "./";

const Table = ( { data } ) => {
    const columns = [ "title", "artist" ];

    return (
        <table className="table">
            <TableHeader columns={ columns } />
        </table>
    );
};

export default Table;