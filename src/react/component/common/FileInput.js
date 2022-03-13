import React, {useEffect, useState} from "react";
import * as common from "../../comm/common";
import "../../css/custom.css";

const FileUpload  = (props) => {

    const fileChange = () => {
        document.getElementById(`fileName${props.fileId}`).value = document.getElementById(props.fileId).files[0].name;
    }

    const fileDownLoad = () => {

    }

    return(
        <div id="ImageForm" className="form-floating mb-3 hiddenItem">
            <input className="form-control"
                   type="text"
                   id={`fileName_${props.fileId}`}
                   placeholder={"파일명"}
                   disabled={"disabled"}/>
            <div>
                <label className={props.fileNo? "fileDownBtnShow btn btn-primary"
                                              : "fileDownBtnHidden btn btn-primary"} id={props.fileNo} onClick={fileDownLoad}>다운로드</label>
                <label className={"fileUpBtn btn btn-primary"} htmlFor={props.fileId}>업로드</label>
                <input className={"fileItem"} type="file" id={props.fileId} onChange={fileChange}/>
            </div>
            <label>{props.label}</label>
        </div>
    )
};
export default FileUpload;