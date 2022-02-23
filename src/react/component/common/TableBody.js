import React from "react";

const TableBody = (props) => {
    return(
        <tbody>
            {
                props.bodyData != null ?
                    props.bodyData.map((value, index) => (
                        <tr key={index} id={index}>
                        <td>{index + 1}</td>
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
                       <td colSpan={props.colSpan}>데이터가 존재하지 않습니다.</td>
                    </tr>
                )
            }
        </tbody>
    )
};
export default TableBody;