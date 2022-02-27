import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table  = (props) => {
    return(
        <table className="table">
            <TableHeader tableInit={props.tableInit}/>
            <TableBody tableInit={props.tableInit}
                       bodyData={props.bodyData}/>
        </table>
    )
};
export default Table;