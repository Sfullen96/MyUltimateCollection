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

    data.forEach( ( d ) => {
        return Object.keys( d )
            .forEach( ( key ) => {
                if ( columnKeys.indexOf( key ) === -1 ) {
                    delete d[ key ];
                }
            } );
    } );

    console.log( "DATA", data );

    return (
        <table className="table">
            <TableHeader columns={ _columns } />
            {
                Object.keys( data ).map( ( row, index ) => {
                    return <TableRow data={ data[ row ] } columns={ columns } key={ index } />
                } )

            }
        </table>
    );
};

export default Table;