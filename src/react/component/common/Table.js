import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table  = (props) => {
    return(
        <table className="table">
            <TableHeader headerData={props.headerData} deleted={props.deleted}/>
            <TableBody bodyData={props.bodyData} colSpan={props.headerData.length} deleted={props.deleted}/>
        </table>
    )
};
export default Table;