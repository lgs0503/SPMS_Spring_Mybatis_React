import React from "react";

const TableBody = (props) => {
    return(
        <tbody>
            {
                props.bodyData.map((value, index) => (
                    <tr key={index} id={index}>
                        <td>{index}</td>
                        {
                            Object.entries({value}).map((tdKey, tdValue) =>(
                                <td key={tdKey[0]}>{tdValue[1]}</td>
                            ))
                        }
                    </tr>
                ))
            }
        </tbody>
    )
};
export default TableBody;