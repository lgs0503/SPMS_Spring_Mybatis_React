import React from "react";
import Table from "./Table";

const TableBody = (props) => {
    return(
        <tbody>
            {
                props.bodyData != null
                ?
                    props.bodyData.map((value, index) => (
                        <tr key={index} id={value[props.tableInit.selectCol]} onClick={props.tableInit.cellSelectEvent}>
                            <td><input className="form-check-input" name="chk" type="checkbox"/></td>
                            {
                                props.tableInit.headerColData.map((headerVal, headerIndex) => (
                                    <td key={headerIndex}>{value[headerVal]}</td>
                                ))
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