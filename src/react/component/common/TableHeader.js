import React from "react";

const TableHeader = (props) => {
    return(
        <thead>
            <tr>
                {
                    props.headerData.map((value, index) => (
                        <th key={index}>{value}</th>
                    ))
                }
            </tr>
        </thead>
    )
};
export default TableHeader;