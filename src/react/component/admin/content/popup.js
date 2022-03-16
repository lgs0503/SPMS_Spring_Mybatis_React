import React, {useEffect, useState, useRef} from 'react';
import Table from "../../common/Table";
import * as common from "../../../comm/common";
import Modal from "../../common/Modal";
import {useDispatch} from "react-redux";
import {showAlertModal} from "../../../action/alertModal";
import Select from "../../common/Select";
import "../../../css/custom.css";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import FileInput from "../../common/FileInput";

const  AdminPopup = () => {

    const dispatch = useDispatch();

    const [bodyData, setBodyData] = useState(null);
    const [bodyCnt, setBodyCnt] = useState(0);

    const [modalStatus, setModalStatus] = useState({
        title : "팝업등록",
        chkStatus : "1",
        content : "",
        open : false,
        popupImageNo : null
    })

    useEffect(() => {
        popupSearch();
    },[]);

    const closeModal = () => {
        setModalStatus(prevState => {
            return{
                ...prevState
                , open : false
            }
        })
    };

    let tableInit = {
        headerColData : [{title: "ID",         name : "popupId",            width:"10px",  hidden: false,  useData : true}
                        ,{title: "팝업명",      name : "popupTitle",         width:"50%",   hidden: false,  useData : true}
                        ,{title: "팝업타입",    name : "popupStatusName",    width:"30%",   hidden: false,  useData : false}
                        ,{title: "사용여부",    name : "useYnName",           width:"12%",   hidden: false,  useData : false}
                        ,{title: "팝업타입",    name : "popupStatus",        width:"0",     hidden: true,   useData : true}
                        ,{title: "사용여부",    name : "useYn",               width:"0",     hidden: true,   useData : true}]
        ,   title : "Popup List"
        ,   selectCol : 'popupId'
        ,   deleted : true
        ,   inserted : true
        ,   pagination : true
        ,   colSpan : 4
        ,   cellSelectEvent : (e) => {

            let data = {
                popupId : e.target.parentNode.id
            };

            new Promise((resolve, reject)=> {
                common.fetchLoad("/searchPopup","POST", data,(result) => {

                    setModalStatus(prevState => {
                        return {
                            ...prevState
                            , open: true
                            , title: "팝업 상세"
                            , content : result.data.popup["popupContent"]
                            , chkStatus : result.data.popup["popupStatus"]
                        }
                    });

                    resolve(result);
                });
            }).then((result)=>{

                tableInit.headerColData.forEach((value, index) => {
                    //console.log(value);
                    if(value.useData)
                        document.getElementById(value.name + "Popup").value = result.data.popup[value.name];
                });

                popupStatusChange(result.data.popup["popupStatus"]);

                if(result.data.popup["fileName"]){
                    document.getElementById("fileName_popupImageNo").value = result.data.popup["fileName"];

                    setModalStatus((prevState => {
                        return{
                            ...prevState
                            , popupImageNo: result.data.popup["popupImageNo"]
                        }
                    }));
                } else {
                    setModalStatus((prevState => {
                        return{
                            ...prevState
                            , popupImageNo: null
                        }
                    }));
                }
            });
        }
        , addBtnClickEvent : () => {

            setModalStatus(prevState => {
                return {
                    ...prevState
                    , open: true
                    , title: "팝업 등록"
                    , chkStatus : 1
                    , content : null
                    , popupImageNo : null
                }
            });
        }
        , deleteBtnClickEvent :() => {
            if(window.confirm("삭제하시겠습니까?")){

                if(common.tableChkCnt("chk") == 0){
                    dispatch(showAlertModal('항목을 선택해주세요.'));
                    return;
                } else {
                    let data = {popupIds : []};

                    data.popupIds = common.tableChkIds("chk");

                    common.fetchLoad("/deletePopup","POST", data, () => {
                        dispatch(showAlertModal('삭제 되었습니다.'));
                        popupSearch();
                    });
                }
            }
        }
    }

    const popupSearch = () => {

        let data = {
                popupId     : document.getElementById("popupId").value
            ,   popupTitle   : document.getElementById("popupTitle").value
            ,   useYn       : document.getElementById("useYn").value
        };

        common.fetchLoad("/popupList","POST", data,(result) => {
            //console.log(result.data.popupList);
            //console.log(result.data.popupCnt);
            setBodyData(result.data.popupList);
            setBodyCnt(result.data.popupCnt);
        });
    }

    const popupSave = () => {
        if(window.confirm("저장하시겠습니까?")){

            new Promise((resolve, reject) => {

                if (document.getElementById("popupImageNo").value) {

                    let form = new FormData();
                    form.append("file", document.getElementById("popupImageNo").files[0]);

                    common.fetchLoad("/file/upload", "POST", form, function (result) {
                        resolve(result.uploadList[0].fileNo);
                    }, true);

                } else {
                    resolve();
                }
            }).then((resolve)=>{

                console.log("fileNo: "+ resolve);
                let data = {};
                tableInit.headerColData.forEach((value, index) => {
                    console.log(value);
                    if(value.useData)
                        data[value.name] =  document.getElementById(value.name + "Popup").value;
                });

                if(modalStatus.content){
                    data.popupContent = modalStatus.content;
                }

                /* 이미지 번호가 있으면 같이 저장한다.*/
                if (resolve){
                    data.popupImageNo = resolve;
                }
                console.log("data: "+ data);

                common.fetchLoad("/savePopup","POST", data, (result) => {
                    dispatch(showAlertModal('저장 되었습니다.'));
                    setModalStatus(prevState => {
                        return{
                            ...prevState
                            , open : false
                        }
                    })
                    popupSearch();
                });
            });
        }
    }

    const popupStatusChange = (popupStatusParam) => {
        let popupStatus = document.getElementById("popupStatusPopup").value;

        console.log("popupStatus"+popupStatus);
        console.log("popupStatusParam"+popupStatusParam);

        const imageForm = document.getElementById("ImageForm");
        const htmlForm = document.getElementById("htmlForm");

        if(popupStatusParam){
            popupStatus = popupStatusParam;
        }

        if(popupStatus == 1) {
            imageForm.classList.add("hiddenItem");
            htmlForm.classList.remove("hiddenItem");
        } else {
            htmlForm.classList.add("hiddenItem");
            imageForm.classList.remove("hiddenItem");

            setModalStatus((prevState => {
                return{
                    ...prevState
                    , popupImageNo: null
                }
            }));
        }
    }

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">POPUP</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">팝업 관리</li>
            </ol>
            <div className="row py-2">
                <div className="col-md-3 my-2">
                    <input type="text" className="form-control search-slt" placeholder="팝업 ID" id="popupId"/>
                </div>
                <div className="col-md-3 my-2">
                    <input type="text" className="form-control search-slt" placeholder="팝업 명" id="popupTitle"/>
                </div>
                <div className="col-md-2 my-2">
                    <Select upperCodeId={"U001"}
                            codeId={"useYn"}
                            codeClassName={"form-select"}
                            text={"사용여부"}/>
                </div>
                <div className="col-md-2 my-2">
                    <button type="button" className="btn btn-primary wrn-btn" onClick={popupSearch}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
            </div>

            <Table tableInit={tableInit}
                   bodyData={bodyData}
                   bodyCnt={bodyCnt}/>

            <Modal open={modalStatus.open} close={closeModal} header={modalStatus.title} modalSize={"modalSize6"}>
                <form id="formTest">
                    <div className="form-floating mb-3">
                        <input className="form-control" type="text" maxLength="20" id="popupIdPopup" disabled={true}/>
                        <label htmlFor="userId" id="idCheck">일련번호</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" type="text" maxLength="20" id="popupTitlePopup"/>
                        <label>팝업 명</label>
                    </div>
                    <div className="form-floating mb-3">
                        <Select upperCodeId={"BAN001"}
                                codeId={"popupStatusPopup"}
                                codeClassName={"form-select"}
                                chkVal={modalStatus.chkStatus}
                                changeEventFunction={popupStatusChange}/>
                        <label>팝업 타입</label>
                    </div>
                    <div id="htmlForm" className="form-floating mb-3">
                        <CKEditor
                            data = {modalStatus.content}
                            editor={ ClassicEditor }
                            config={{
                                language: "ko",
                                toolbar: [
                                    "heading",
                                    "|",
                                    "bold",
                                    "italic",
                                    "underline",
                                    "strikethrough",
                                    "|",
                                    "fontSize",
                                    "fontColor",
                                    "fontBackgroundColor",
                                    "|",
                                    "alignment",
                                    "outdent",
                                    "indent",
                                    "bulletedList",
                                    "numberedList",
                                    "blockQuote",
                                    "|",
                                    "link",
                                    "insertTable",
                                    "imageUpload",
                                    "|",
                                    "undo",
                                    "redo",
                                ],
                                placeholder: "글을 입력해보세요!"
                            }}
                            onReady={ editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log( 'Editor is ready to use!', editor );
                            } }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setModalStatus((prevState => {
                                    return{
                                        ...prevState, content: data
                                    }
                                }))
                                //setContent(data);
                                console.log( { event, editor, data } );
                            } }
                            onBlur={ ( event, editor ) => {
                                console.log( 'Blur.', editor );
                            } }
                            onFocus={ ( event, editor ) => {
                                console.log( 'Focus.', editor );
                            } }
                        />
                    </div>
                    <FileInput fileId={"popupImageNo"}
                               label={"이미지 첨부"}
                               fileNo={modalStatus.popupImageNo}
                               fileClassName={"form-floating mb-3 hiddenItem"}/>
                    <div className="form-floating mb-3">
                        <Select upperCodeId={"U001"}
                                codeId={"useYnPopup"}
                                codeClassName={"form-select"}
                                chkVal={"Y"}/>
                        <label>사용여부</label>
                    </div>
                    <div className="mt-4 mb-0">
                        <div className="d-grid">
                            <a className="btn btn-primary btn-block" id="btnRegister" onClick={popupSave}>저장</a>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default AdminPopup;
