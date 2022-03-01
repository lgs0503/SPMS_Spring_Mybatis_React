import React from "react";
import Table from "./Table";

const TableBody = (props) => {

    const cellSelect = (e) => {

        if(e.target.nodeName == 'INPUT')
            return;

        props.tableInit.cellSelectEvent(e);

    }

    let checkBox = null;

    if(props.tableInit.deleted){
        checkBox = <td><input className="form-check-input" name="chk" type="checkbox"/></td>;
    } else {
        checkBox = null;
    }

    return(
        <tbody>
            {
                props.bodyData != null
                ?
                    props.bodyData.slice(props.offset, props.offset + props.limit).map((value, index) => (
                        <tr key={index} id={value[props.tableInit.selectCol]} onClick={cellSelect}>
                            {checkBox}
                            {
                                props.tableInit.headerColData.map((headerVal, headerIndex) =>
                                    headerVal.hidden === false
                                    ?
                                    (
                                        <td name={headerVal.name} key={headerIndex}>{value[headerVal.name]}</td>
                                    )
                                    : null
                                )
                            }
                        </tr>
                    ))
                :
                (
                    <tr>
                        <td colSpan={props.tableInit.deleted ? props.tableInit.colSpan+1 : props.tableInit.colSpan}>데이터가 존재하지 않습니다.</td>
                    </tr>
                )
            }
        </tbody>
    )
};
export default TableBody;