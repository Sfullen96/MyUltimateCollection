import React from "react";

const TableRow = ( { data, columns } ) => {
    return (
        <tr>
            { columns.map( ( column, index ) => {
                console.log( "COL", column, data[ column.column ] );
                return <td key={ index }>{ data[ column.column ] }</td>;
            } ) }
        </tr>
    )

};

export default TableRow;