import React from "react";

const TableRow = ( { data } ) => {
    return (
        data
            .map( ( d ) => {
                    return <tr>
                        {
                            Object.keys( d )
                                .map( ( key ) => {
                                    return <td>{ d[ key ] }</td>
                                } )
                        }
                    </tr>
            } )
    )

};

export default TableRow;