import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import * as common from "../../../comm/common";
import {hideLoading, showAlertModal, showLoading} from "../../../action/aciton";
import Table from "../../common/Table";
import Modal from "../../common/Modal";
import Select from "../../common/Select";

const  AdminComment = () => {
    const dispatch = useDispatch();

    const [bodyData, setBodyData] = useState(null);
    const [bodyCnt, setBodyCnt] = useState(0);

    const pageTitle = "댓글";

    const [modalStatus, setModalStatus] = useState({
        title : pageTitle + "등록"
        ,   open : false
        ,   overLab : false
    });

    useEffect(() => {
        postCommentSearch();
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
                document.getElementById("upperCommentIdPopup").value = target.parentNode.parentNode.id;
            } else if(target.nodeName == "I") {
                //console.log(e.target.parentNode.parentNode.parentNode.id);
                document.getElementById("upperCommentIdPopup").value = target.parentNode.parentNode.parentNode.id;
            }
        });
    }

    let tableInit = {
            headerColData : [{title: "ID",         name : "postCommentId",       width:"40%",  hidden: false,  useData : true}
                            ,{title: "댓글명",      name : "postCommentName",    width:"30%",   hidden: false,  useData : true}
                            ,{title: "사용여부",    name : "useYnName",   width:"20%",   hidden: false}
                            ,{title: "추가",      name : "button",  width:"10%",  hidden: false,  btnValue:<i className="fa-solid fa-plus"></i>,  clickEvent: addBtnClickEvent}
                            ,{title: "부모댓글명",  name : "upperCommentId",  width:"0",   hidden: true,  useData : true}
                            ,{title: "댓글값",      name : "postCommentValue",   width:"0",   hidden: true,  useData : true}
                            ,{title: "사용여부",    name : "useYn",       width:"20%",   hidden: true,  useData : true}]
        ,   title : "Comment List"
        ,   selectCol : 'postCommentId'
        ,   deleted : true
        ,   colSpan : 5
        ,   cellSelectEvent : (e) => {
            dispatch(showLoading());
            new Promise((resolve, reject)=> {

                setModalStatus((prevState => {
                    return {
                        ...prevState
                        , open : true
                        , title : pageTitle + "상세"
                    }
                }));

                let data = {
                    postCommentId : e.target.parentNode.id
                };

                common.fetchLoad("/searchComment","POST", data,(result) => {
                    resolve(result);

                });
            }).then((result) => {
                tableInit.headerColData.forEach((value, index) => {
                    if(value.useData === true){
                        document.getElementById(value.name + "Popup").value = result.data.postComment[value.name];
                    }
                });
                document.getElementById("postCommentIdPopup").disabled = "disabled";
                dispatch(hideLoading());
            });
        }
        , deleteBtnClickEvent :() => {
            if(window.confirm("삭제하시겠습니까?")){

                if(common.tableChkCnt("chk") == 0){
                    dispatch(showAlertModal('항목을 선택해주세요.'));
                    return;
                } else {
                    let data = {postCommentIds : []};
                    let delChk = true;

                    data.postCommentIds = common.tableChkIds("chk");

                    bodyData.forEach((value, index)=>{

                        data.postCommentIds.forEach((delVal, delIndex)=> {

                            //console.log("delVal:"+delVal +"|postCommentId"+ value.postCommentId+"|leaf" +value.leaf);
                            if(delVal == value.postCommentId && value.leaf == "0"){
                                delChk = false;
                                dispatch(showAlertModal('하위항목을 삭제 해주시기 바랍니다.'));
                                return;
                            }
                        });
                    })

                    if(delChk){
                        common.fetchLoad("/deleteComment","POST", data, () => {
                            dispatch(showAlertModal('삭제 되었습니다.'));
                            postCommentSearch();
                        });
                    }
                }
            }
        }
    }

    const postCommentSearch = () => {
        dispatch(showLoading());
        let data = {
                postCommentId     : document.getElementById("postCommentId").value
            ,   postCommentName   : document.getElementById("postCommentName").value
            ,   useYn       : document.getElementById("useYn").value
        };

        common.fetchLoad("/postCommentList","POST", data,(result) => {
            //console.log(result.data.postCommentList);
            //console.log(result.data.postCommentCnt);
            setBodyData(result.data.postCommentList);
            setBodyCnt(result.data.postCommentCnt);
            dispatch(hideLoading());
        });
    }

    const postCommentSave = () => {
        if(window.confirm("저장하시겠습니까?")){
            if(modalStatus.overLab){
                dispatch(showAlertModal('중복된 댓글가 존재합니다.'));
                return;
            }

            let data = {};
            tableInit.headerColData.forEach((value, index) => {
                if(value.useData)
                    data[value.name] =  document.getElementById(value.name + "Popup").value;
            });

            common.fetchLoad("/saveComment","POST", data, (result) => {
                dispatch(showAlertModal('저장 되었습니다.'));
                closeModal();
                postCommentSearch();
            });
        }
    }

    const postCommentOverlapChk = (e) => {

        let data = {
            postCommentId : e.target.value
        };

        common.fetchLoad("/searchComment","POST", data,(result) => {
            //console.log(result.data.postComment);
            let resultOverLab = false;
            if(result.data.postComment){
                document.getElementById("idCheck").innerText = "중복된 댓글가 존재합니다.";
                document.getElementById("idCheck").style.color = "red";
                resultOverLab = true;
            } else {
                document.getElementById("idCheck").innerText = "댓글";
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
            <h1 className="mt-4">COMMENT</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">{pageTitle} 관리</li>
            </ol>
            <div className="row py-2">
                <div className="col-md-3 my-2">
                    <input type="text" className="form-control search-slt" placeholder="댓글 ID" id="postCommentId"/>
                </div>
                <div className="col-md-3 my-2">
                    <input type="text" className="form-control search-slt" placeholder="댓글 명" id="postCommentName"/>
                </div>
                <div className="col-md-2 my-2">
                    <Select upperCodeId={"U001"}
                            codeId={"useYn"}
                            codeClassName={"form-select search-slt"}
                            text={"사용여부"}/>
                </div>
                <div className="col-md-2 my-2">
                    <button type="button" className="btn btn-primary wrn-btn" onClick={postCommentSearch}>
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
                        <input className="form-control" type="text" maxLength="20" id="postCommentIdPopup" onChange={postCommentOverlapChk}/>
                        <label htmlFor="userId" id="idCheck">댓글</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" type="text" maxLength="20" id="postCommentNamePopup"/>
                        <label>댓글 명</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" type="text" maxLength="20" id="upperCommentIdPopup" disabled={"disabled"}/>
                        <label>부모 댓글</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" type="text" maxLength="20" id="postCommentValuePopup"/>
                        <label>댓글 값</label>
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
                            <a className="btn btn-primary btn-block" id="btnRegister" onClick={postCommentSave}>저장</a>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default AdminComment;
