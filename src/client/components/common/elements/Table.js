import React from "react";
import _ from "underscore";
import { TableHeader, TableRow } from "./";

const Table = ( { data, columns } ) => {
    
    const _columns = columns
        .map( ( col ) => {
            return col.name;
        } );

    const columnKeys = columns
        .map( ( col ) => {
            return col.column;
        } );

    const _data = data;

    return (
        <table className="table table-striped">
            <TableHeader columns={ _columns } />
            <tbody>
                {
                    Object.keys( _data ).map( ( row, index ) => {
                        return <TableRow data={ _data[ row ] } columns={ columns } key={ index } />
                    } )
                }
            </tbody>
        </table>
    );
};

export default Table;