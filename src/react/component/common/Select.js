import React, {useEffect, useState} from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import * as common from "../../comm/common";

const Select  = (props) => {

    const [codeList, setCodeList] = useState(null);

    useEffect(() => {
        let data = {};

        //console.log(data);
        let url = "";

        let callBack = null;

        if(!props.codeStatus){
            data = { upperCodeId     : props.upperCodeId } ;
            url = "/codeList";

            callBack = (result) => {
                console.log(result.data.codeList);
                setCodeList(result.data.codeList);

                if(props.chkVal){
                    document.getElementById(props.codeId).value = props.chkVal;
                }
            }

        } else if (props.codeStatus == "BOARD"){
            url = "/boardCodeList";

            callBack = (result) => {
                setCodeList(result.data.boardCodeList);

                if(props.chkVal){
                    document.getElementById(props.codeId).value = props.chkVal;
                }
            }
        }

        common.fetchLoad(url, "POST", data, callBack);
    },[]);

    return(
        <select id={props.codeId} className={props.codeClassName} onChange={() => props.changeEventFunction(this)}>
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