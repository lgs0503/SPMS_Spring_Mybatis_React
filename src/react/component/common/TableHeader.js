import React from "react";

const TableHeader = (props) => {

    let checkBox = null;

    if(props.deleted == true){
        checkBox = <th><input type="checkbox" id="allCheck"/></th>;
    }

    return(
        <thead>
            <tr>
                {checkBox}
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