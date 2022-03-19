import React from "react";
import Table from "./Table";
import * as common from "../../comm/common";
import "../../css/table.css";

const TableBody = (props) => {

    const cellSelect = (e) => {

        let nodeName = e.target.nodeName;
        if(nodeName == 'INPUT'||nodeName == 'BUTTON'||nodeName == 'I')
            return;

        props.tableInit.cellSelectEvent(e);

    }

    let checkBox = null;

    if(props.tableInit.deleted){
        checkBox = <td><input className="form-check-input" name="chk" type="checkbox"/></td>;
    } else {
        checkBox = null;
    }

    const treeBtnClickEvent = (e, codeId) => {

        let clickState = true;

        if(e.target.innerText == "-"){
            e.target.innerText = "+";
            clickState = false;
        } else {
            e.target.innerText = "-";
        }

        document.querySelectorAll('[data-bs-target="'+codeId+'"]').forEach((value, index) => {

            document.querySelectorAll('[data-bs-target="'+value.id+'"]').forEach((childVal, childIndex) => {

                if(clickState){
                    childVal.style.display = 'table-row';
                } else {
                    childVal.style.display = 'none';
                }
            });

            if(clickState){
                value.style.display = 'table-row';
            } else {
                value.style.display = 'none';
            }
        });
    }

    //console.log(common.nullCheck(props.bodyData));

    return(
        <tbody>
            {
                common.nullCheck(props.bodyData) == true
                ?
                    props.bodyData.slice(props.offset, props.offset + props.limit).map((value, index) =>
                        props.tableInit.maxItem && props.tableInit.maxItem <= index
                        ?
                        null
                        :
                        (
                            <tr data-bs-target={value["upperCodeId"] ? value["upperCodeId"] : (value["upperMenuId"] ? value["upperMenuId"] : null )}
                                className={"table-row"} key={index} id={value[props.tableInit.selectCol]} onClick={cellSelect}>
                                {checkBox}
                                {
                                    props.tableInit.headerColData.map((headerVal, headerIndex) =>
                                        headerVal.hidden === false
                                            ?
                                            <td className={
                                                props.tableInit.selectCol == headerVal.name && value["level"] == "1"
                                                    ? "table-depth1"
                                                    : props.tableInit.selectCol == headerVal.name && value["level"] == "2"
                                                    ? "table-depth2"
                                                    : props.tableInit.selectCol == headerVal.name && value["level"] == "3"
                                                        ? "table-depth3"
                                                        : props.tableInit.selectCol == headerVal.name && value["level"] == "4"
                                                            ? "table-depth4" : null
                                            }
                                            name={headerVal.name} key={headerIndex}>
                                            {
                                                headerVal.name == "button" && value["level"] != "4"
                                                    ?
                                                    (
                                                        <button type="button" className="btn btn-primary wrn-btn btn-sm " onClick={headerVal.clickEvent}>{headerVal.btnValue}</button>
                                                    )
                                                    :
                                                    props.tableInit.selectCol == headerVal.name && value["level"] && value["level"] != "1"
                                                    ?
                                                    (
                                                    <span>
                                                        <span className="treeItem">
                                                            <i className="fa-solid fa-chevron-down"></i>
                                                            {
                                                                value["leaf"] != "1"
                                                                ?
                                                                (
                                                                    <button className="treeBtn"
                                                                            onClick={(e)=> treeBtnClickEvent(e, value[headerVal.name]) }>-</button>
                                                                ) : null
                                                            }
                                                        </span>
                                                        {value[headerVal.name]}
                                                    </span>
                                                    )
                                                    : value[headerVal.name]
                                            }
                                            </td>
                                            : null
                                    )
                                }
                            </tr>
                        )
                    )
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