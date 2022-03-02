import React from "react";
import '../../css/table.css';

const TableHeader = (props) => {

    let checkBox = null;

    const itemAllCheck = (e) => {
        if(e.target.checked){
            document.getElementsByName("chk").forEach((value, index) => {
                value.checked = true;
            })
        } else {
            document.getElementsByName("chk").forEach((value, index) => {
                value.checked = false;
            })
        }
    }

    if(props.tableInit.deleted){
        checkBox = <th className={"table-header-vertical-align"}><input className="form-check-input" type="checkbox" id="allCheck" onClick={itemAllCheck}/></th>;
    } else {
        checkBox = null;
    }

    return(
        <thead className={"table-header-dark"}>
            <tr>
                {checkBox}
                {
                    props.tableInit.headerColData.map((value, index) =>
                        value.hidden == false
                        ?
                        (
                            <th className={"table-header-vertical-align"} key={index}>{value.title}</th>
                        )
                        :
                        null
                    )
                }
            </tr>
        </thead>
    )
};
export default TableHeader;