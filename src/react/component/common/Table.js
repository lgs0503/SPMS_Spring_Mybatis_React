import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table  = (props) => {
    return(
        <table className="table">
            <TableHeader headerData={props.headerData}/>
            <TableBody bodyData={props.bodyData} colSpan={props.headerData.length}/>
        </table>
    )
};
export default Table;