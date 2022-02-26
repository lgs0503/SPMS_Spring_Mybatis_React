import React from "react";

const TableBody = (props) => {
    return(
        <tbody>
            {
                props.bodyData != null ?
                    props.bodyData.map((value, index) => (
                        <tr key={index} id={index}>
                        {
                            props.deleted == true ? (<td><input type="checkbox"/></td>) : null
                        }
                        {
                            Object.entries(value).map((key, keyValue) => (
                                <td key={keyValue}>{key[1]}</td>
                            ))
                        }
                        </tr>
                    ))
                :
                (
                    <tr>
                       <td colSpan={props.deleted == true ? props.colSpan+1 : props.colSpan}>데이터가 존재하지 않습니다.</td>
                    </tr>
                )
            }
        </tbody>
    )
};
export default TableBody;