import React from "react";

const TableHeader = ( { columns } ) => {
    return (
        <thead>
            <tr>
                {
                    columns
                        .map( ( column ) => {
                            return <th scope="col">{ column }</th>
                        } )
                }
            </tr>
        </thead>
    );
};

export default TableHeader;