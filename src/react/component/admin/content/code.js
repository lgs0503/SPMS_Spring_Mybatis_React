import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import * as common from "../../../comm/common";
import {showAlertModal} from "../../../action/aciton";
import Table from "../../common/Table";
import Modal from "../../common/Modal";
import Select from "../../common/Select";

const  AdminCode = () => {
    const dispatch = useDispatch();

    const [bodyData, setBodyData] = useState(null);
    const [bodyCnt, setBodyCnt] = useState(0);

    const pageTitle = "코드";

    const [modalStatus, setModalStatus] = useState({
        title : pageTitle + "등록"
        ,   open : false
        ,   overLab : false
    });

    useEffect(() => {
        codeSearch();
    },[]);

    const closeModal = () => {
        setModalStatus((prevState => {
            return {
                ...prevState
                , open : false
            }
        }));
    };

    const addBtnClickEvent = (e) => {

        new Promise((resolve, reject)=>{

            setModalStatus((prevState => {
                return {
                    ...prevState
                    , open : true
                    , title : pageTitle + "등록"
                }
            }));

            resolve();
        }).then(()=>{

            const target = e.target;

            if(target.nodeName == "BUTTON"){
                document.getElementById("upperCodeIdPopup").value = target.parentNode.parentNode.id;
            } else if(target.nodeName == "I") {
                //console.log(e.target.parentNode.parentNode.parentNode.id);
                document.getElementById("upperCodeIdPopup").value = target.parentNode.parentNode.parentNode.id;
            }
        });
    }

    let tableInit = {
            headerColData : [{title: "ID",         name : "codeId",       width:"40%",  hidden: false,  useData : true}
                            ,{title: "코드명",      name : "codeName",    width:"30%",   hidden: false,  useData : true}
                            ,{title: "사용여부",    name : "useYnName",   width:"20%",   hidden: false}
                            ,{title: "추가",      name : "button",  width:"10%",  hidden: false,  btnValue:<i className="fa-solid fa-plus"></i>,  clickEvent: addBtnClickEvent}
                            ,{title: "부모코드명",  name : "upperCodeId",  width:"0",   hidden: true,  useData : true}
                            ,{title: "코드값",      name : "codeValue",   width:"0",   hidden: true,  useData : true}
                            ,{title: "사용여부",    name : "useYn",       width:"20%",   hidden: true,  useData : true}]
        ,   title : "Code List"
        ,   selectCol : 'codeId'
        ,   deleted : true
        ,   colSpan : 5
        ,   cellSelectEvent : (e) => {
            new Promise((resolve, reject)=> {

                setModalStatus((prevState => {
                    return {
                        ...prevState
                        , open : true
                        , title : pageTitle + "상세"
                    }
                }));

                let data = {
                    codeId : e.target.parentNode.id
                };

                common.fetchLoad("/searchCode","POST", data,(result) => {
                    resolve(result);

                });
            }).then((result) => {
                tableInit.headerColData.forEach((value, index) => {
                    if(value.useData === true){
                        document.getElementById(value.name + "Popup").value = result.data.code[value.name];
                    }
                });
                document.getElementById("codeIdPopup").disabled = "disabled";
            });
        }
        , deleteBtnClickEvent :() => {
            if(window.confirm("삭제하시겠습니까?")){

                if(common.tableChkCnt("chk") == 0){
                    dispatch(showAlertModal('항목을 선택해주세요.'));
                    return;
                } else {
                    let data = {codeIds : []};
                    let delChk = true;

                    data.codeIds = common.tableChkIds("chk");

                    bodyData.forEach((value, index)=>{

                        data.codeIds.forEach((delVal, delIndex)=> {

                            //console.log("delVal:"+delVal +"|codeId"+ value.codeId+"|leaf" +value.leaf);
                            if(delVal == value.codeId && value.leaf == "0"){
                                delChk = false;
                                dispatch(showAlertModal('하위항목을 삭제 해주시기 바랍니다.'));
                                return;
                            }
                        });
                    })

                    if(delChk){
                        common.fetchLoad("/deleteCode","POST", data, () => {
                            dispatch(showAlertModal('삭제 되었습니다.'));
                            codeSearch();
                        });
                    }
                }
            }
        }
    }

    const codeSearch = () => {

        let data = {
                codeId     : document.getElementById("codeId").value
            ,   codeName   : document.getElementById("codeName").value
            ,   useYn       : document.getElementById("useYn").value
        };

        common.fetchLoad("/codeList","POST", data,(result) => {
            //console.log(result.data.codeList);
            //console.log(result.data.codeCnt);
            setBodyData(result.data.codeList);
            setBodyCnt(result.data.codeCnt);
        });
    }

    const codeSave = () => {
        if(window.confirm("저장하시겠습니까?")){
            if(modalStatus.overLab){
                dispatch(showAlertModal('중복된 코드가 존재합니다.'));
                return;
            }

            let data = {};
            tableInit.headerColData.forEach((value, index) => {
                if(value.useData)
                    data[value.name] =  document.getElementById(value.name + "Popup").value;
            });

            common.fetchLoad("/saveCode","POST", data, (result) => {
                dispatch(showAlertModal('저장 되었습니다.'));
                closeModal();
                codeSearch();
            });
        }
    }

    const codeOverlapChk = (e) => {

        let data = {
            codeId : e.target.value
        };

        common.fetchLoad("/searchCode","POST", data,(result) => {
            //console.log(result.data.code);
            let resultOverLab = false;
            if(result.data.code){
                document.getElementById("idCheck").innerText = "중복된 코드가 존재합니다.";
                document.getElementById("idCheck").style.color = "red";
                resultOverLab = true;
            } else {
                document.getElementById("idCheck").innerText = "코드";
                document.getElementById("idCheck").style.color = "black";
                resultOverLab = false;
            }

            setModalStatus((prevState => {
                return {
                    ...prevState
                    , overLab : resultOverLab
                }
            }));
        });
    }

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">CODE</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">{pageTitle} 관리</li>
            </ol>
            <div className="row py-2">
                <div className="col-md-3 my-2">
                    <input type="text" className="form-control search-slt" placeholder="코드 ID" id="codeId"/>
                </div>
                <div className="col-md-3 my-2">
                    <input type="text" className="form-control search-slt" placeholder="코드 명" id="codeName"/>
                </div>
                <div className="col-md-2 my-2">
                    <Select upperCodeId={"U001"}
                            codeId={"useYn"}
                            codeClassName={"form-select search-slt"}
                            text={"사용여부"}/>
                </div>
                <div className="col-md-2 my-2">
                    <button type="button" className="btn btn-primary wrn-btn" onClick={codeSearch}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
            </div>

            <Table tableInit={tableInit}
                   bodyData={bodyData}
                   bodyCnt={bodyCnt}/>

            <Modal open={modalStatus.open} close={closeModal} header={modalStatus.title}>
                <form id="formTest">
                    <div className="form-floating mb-3">
                        <input className="form-control" type="text" maxLength="20" id="codeIdPopup" onChange={codeOverlapChk}/>
                        <label htmlFor="userId" id="idCheck">코드</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" type="text" maxLength="20" id="codeNamePopup"/>
                        <label>코드 명</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" type="text" maxLength="20" id="upperCodeIdPopup" disabled={"disabled"}/>
                        <label>부모 코드</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" type="text" maxLength="20" id="codeValuePopup"/>
                        <label>코드 값</label>
                    </div>
                    <div className="form-floating mb-3">
                        <Select upperCodeId={"U001"}
                                codeId={"useYnPopup"}
                                codeClassName={"form-select"}
                                chkVal={"Y"}/>
                        <label>사용여부</label>
                    </div>
                    <div className="mt-4 mb-0">
                        <div className="d-grid">
                            <a className="btn btn-primary btn-block" id="btnRegister" onClick={codeSave}>저장</a>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default AdminCode;
