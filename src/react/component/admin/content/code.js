import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import * as common from "../../../comm/common";
import {showAlertModal} from "../../../action/alertModal";
import Table from "../../common/Table";
import Modal from "../../common/Modal";
import Select from "../../common/Select";

const  AdminCode = () => {
    const dispatch = useDispatch();

    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [modalOpen, setModalOpen] = useState(false);

    const [bodyData, setBodyData] = useState(null);
    const [bodyCnt, setBodyCnt] = useState(0);

    const pageTitle = "코드";
    const [modalTitle, setModalTitle] = useState(pageTitle + " 등록");
    const [overLab, setOverLab] = useState(false);

    useEffect(() => {
        codeSearch();
    },[]);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const addBtnClickEvent = (e) => {

        setModalTitle(pageTitle + " 등록");
        openModal();

        const target = e.target;

        setTimeout(()=>{

            if(target.nodeName == "BUTTON"){
                document.getElementById("upperCodeIdPopup").value = target.parentNode.parentNode.id;
            } else if(target.nodeName == "I") {
                //console.log(e.target.parentNode.parentNode.parentNode.id);
                document.getElementById("upperCodeIdPopup").value = target.parentNode.parentNode.parentNode.id;
            }
        },100);

    }

    let tableInit = {
        headerColData : [{title: "ID",         name : "codeId",       width:"40%",  hidden: false}
                        ,{title: "코드명",      name : "codeName",    width:"30%",   hidden: false}
                        ,{title: "사용여부",    name : "useYn",       width:"20%",   hidden: false}
                        ,{
                            title: "추가"
                         ,  name : "button"
                         ,  width:"10%"
                         ,  hidden: false
                         ,  btnValue:<i className="fa-solid fa-plus"></i>
                         ,  clickEvent: addBtnClickEvent
                         }
                        ,{title: "부모코드명",  name : "upperCodeId",  width:"0",   hidden: true}
                        ,{title: "코드값",      name : "codeValue",   width:"0",   hidden: true}]
        ,   title : "Code List"
        ,   selectCol : 'codeId'
        ,   deleted : true
        ,   colSpan : 5
        ,   cellSelectEvent : (e) => {

            setModalTitle(pageTitle+" 상세");
            openModal();

            let data = {
                codeId : e.target.parentNode.id
            };

            common.fetchLoad("/searchCode","POST", data,(result) => {

                //console.log(result.data.code);

                setTimeout(() => {

                    tableInit.headerColData.forEach((value, index) => {
                        if(value.name != 'button')
                            document.getElementById(value.name + "Popup").value = result.data.code[value.name];
                    });
                },200);

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

                    data.codeIds = common.tableChkIds("chk");

                    common.fetchLoad("/deleteCode","POST", data, () => {
                        dispatch(showAlertModal('삭제 되었습니다.'));
                        codeSearch();
                    });
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
            if(overLab){
                dispatch(showAlertModal('중복된 코드가 존재합니다.'));
                return;
            }

            let data = {};
            tableInit.headerColData.forEach((value, index) => {
                if(value.name != "button"){
                    data[value.name] =  document.getElementById(value.name + "Popup").value;
                }
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
            if(result.data.code){
                document.getElementById("idCheck").innerText = "중복된 코드가 존재합니다.";
                document.getElementById("idCheck").style.color = "red";
                setOverLab(true);
            } else {
                document.getElementById("idCheck").innerText = "코드";
                document.getElementById("idCheck").style.color = "black";
                setOverLab(false);
            }
            
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

            <Modal open={modalOpen} close={closeModal} header={modalTitle}>
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
