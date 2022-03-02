import React from "react";

const TableColGroup = (props) => {
    return(
        <colgroup>
            {
                props.tableInit.deleted == true
                ?
                (<col width="10px"/>)
                : null
            }
            {
                props.tableInit.headerColData.map((value, index) => (
                    <col key={index} width={value.width}/>
                ))
            }
        </colgroup>
    )
};
export default TableColGroup;