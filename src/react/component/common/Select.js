import React, {useEffect, useState} from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import * as common from "../../comm/common";

const Select  = (props) => {

    const [codeList, setCodeList] = useState(null);

    useEffect(() => {
        let data = {
            upperCodeId     : props.upperCodeId
        };

        //console.log(data);

        common.fetchLoad("/codeList","POST", data,(result) => {
            console.log(result.data.codeList);
            setCodeList(result.data.codeList);

            if(props.chkVal){
                document.getElementById(props.codeId).value = props.chkVal;
            }
        });
    },[]);

    return(
        <select id={props.codeId} className={props.codeClassName} >
            {
                props.text ?
                (
                    <option value={""}>{props.text}</option>
                )
                :
                null
            }
            {
                codeList ?
                codeList.map((value, index) => (
                    <option key={index} value={value.codeValue}>{value.codeName}</option>
                ))
                : null
            }
        </select>
    )
};
export default Select;