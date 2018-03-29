import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const TableRow = ( { data, columns } ) => {
    return (
        <tr>
            { columns.map( ( column, index ) => {

                let display = null;
                console.log( "DISPLAY", column );

                if ( column.include ) {
                    if ( parseInt( column.arrayIndex, 10 ) >= 0 ) {
                        display = data[ column.include ][ column.arrayIndex ][ column.column ];
                    } else {
                        display = data[ column.include ][ column.column ];
                    }
                    console.log( "DISPLAY", column.include, column.column );
                } else {
                    display = data[ column.column ];
                }

                if ( index === 0 ) {
                    return (
                        <td key={ index }>
                            <Link to={ `/music/${ data.id }` }>{ display ? display : "N/K" }</Link>
                        </td>
                    );
                }
                if ( column.type && column.type === "date" ) {
                    return <td key={ index }>{ display ? moment().format( "DD/MM/YY H:mm", display ) : "N/K" }</td>;
                }
                return <td key={ index }>{ display ? display : "N/K" }</td>;
            } ) }
        </tr>
    )

};

export default TableRow;