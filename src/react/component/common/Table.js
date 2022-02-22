import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table  = (props) => {
    return(
        <table className="table">
            <TableHeader headerData={props.headerData}/>
            {/*<TableBody bodyData={props.bodyData}/>*/}
        </table>
    )
};
export default Table;