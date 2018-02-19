import React from "react";
import { DataTable as Table } from "react-data-components";

const DataTable = ( props ) => {
    const tableColumns = props.columns;

    return(
        <Table
            className="container-fluid"
            keys="id"
            columns={ tableColumns }
            initialData={ props.data }
            initialPageLength={ 50 }
            initialSortBy={ { prop: 'city', order: 'descending' } }
            pageLengthOptions={ [ 5, 20, 50 ] }
        />
    );
};

export default DataTable;