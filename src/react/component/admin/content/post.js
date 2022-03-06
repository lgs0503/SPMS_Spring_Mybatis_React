import React, {useEffect, useState, useRef} from 'react';
import Table from "../../common/Table";
import * as common from "../../../comm/common";
import Modal from "../../common/Modal";
import DaumPostcode from "react-daum-postcode";
import {useDispatch} from "react-redux";
import {showAlertModal} from "../../../action/alertModal";
import Select from "../../common/Select";

const  AdminPost = () => {

    const dispatch = useDispatch();

    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [modalOpen, setModalOpen] = useState(false);

    const [bodyData, setBodyData] = useState(null);
    const [bodyCnt, setBodyCnt] = useState(0);

    const [modalTitle, setModalTitle] = useState("게시글 등록");

    useEffect(() => {
        postSearch();
    },[]);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    let tableInit = {
        headerColData : [{title: "ID",         name : "postId",             width:"10px",  hidden: false}
            ,{title: "게시판명",    name : "boardName",           width:"30%",   hidden: false}
            ,{title: "게시글명",    name : "postName",           width:"30%",   hidden: false}
            ,{title: "게시글타입",  name : "postType",           width:"30%",   hidden: false}
            ,{title: "작성자",    name : "createUser",               width:"12%",   hidden: false}
            ,{title: "게시글설명",  name : "postDescription",    width:"0",     hidden: true}]
        ,   title : "Post List"
        ,   selectCol : 'postId'
        ,   deleted : true
        ,   inserted : true
        ,   pagination : true
        ,   colSpan : 5
        ,   cellSelectEvent : (e) => {

            setModalTitle("게시글 상세");
            openModal();

            let data = {
                postId : e.target.parentNode.id
            };

            common.fetchLoad("/searchPost","POST", data,(result) => {

                //console.log(result.data.post);
                setTimeout(() => {

                    tableInit.headerColData.forEach((value, index) => {
                        document.getElementById(value.name + "Popup").value = result.data.post[value.name];
                    });
                },200);
            });
        }
        , addBtnClickEvent : () => {
            setModalTitle("게시글 등록");
            openModal();
        }
        , deleteBtnClickEvent :() => {
            if(window.confirm("삭제하시겠습니까?")){

                if(common.tableChkCnt("chk") == 0){
                    dispatch(showAlertModal('항목을 선택해주세요.'));
                    return;
                } else {
                    let data = {postIds : []};

                    data.postIds = common.tableChkIds("chk");

                    common.fetchLoad("/deletePost","POST", data, () => {
                        dispatch(showAlertModal('삭제 되었습니다.'));
                        postSearch();
                    });
                }
            }
        }
    }

    const postSearch = () => {

        let data = {
            postId     : document.getElementById("postId").value
            ,   postName   : document.getElementById("postName").value
            ,   useYn       : document.getElementById("useYn").value
            ,   fileYn      : document.getElementById("fileYn").value
        };

        common.fetchLoad("/postList","POST", data,(result) => {
            //console.log(result.data.postList);
            //console.log(result.data.postCnt);
            setBodyData(result.data.postList);
            setBodyCnt(result.data.postCnt);
        });
    }

    const postSave = () => {
        if(window.confirm("저장하시겠습니까?")){
            let data = {};
            tableInit.headerColData.forEach((value, index) => {
                data[value.name] =  document.getElementById(value.name + "Popup").value;
            });

            common.fetchLoad("/savePost","POST", data, (result) => {
                dispatch(showAlertModal('저장 되었습니다.'));
                closeModal();
                postSearch();
            });
        }
    }

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">POST</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">게시글 관리</li>
            </ol>
            <div className="row py-2">
                <div className="col-md-3 my-2">
                    <input type="text" className="form-control search-slt" placeholder="게시글 ID" id="postId"/>
                </div>
                <div className="col-md-3 my-2">
                    <input type="text" className="form-control search-slt" placeholder="게시글 명" id="postName"/>
                </div>
                <div className="col-md-2 my-2">
                    <Select upperCodeId={"U001"}
                            codeId={"useYn"}
                            codeClassName={"form-select"}
                            text={"사용여부"}/>
                </div>
                <div className="col-md-2 my-2">
                    <Select upperCodeId={"F001"}
                            codeId={"fileYn"}
                            codeClassName={"form-select"}
                            text={"파일여부"}/>
                </div>
                <div className="col-md-2 my-2">
                    <button type="button" className="btn btn-primary wrn-btn" onClick={postSearch}>
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
                        <input className="form-control" type="text" maxLength="20" id="postIdPopup" disabled={true}/>
                        <label htmlFor="userId" id="idCheck">일련번호</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" type="text" maxLength="20" id="postNamePopup"/>
                        <label>게시글 명</label>
                    </div>
                    <div className="form-floating mb-3">
                        <Select upperCodeId={"B001"}
                                codeId={"postTypePopup"}
                                codeClassName={"form-select"}
                                chkVal={"1"}/>
                        <label>게시글 타입</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" type="text" maxLength="20" id="postDescriptionPopup"/>
                        <label>게시글 설명</label>
                    </div>
                    <div className="form-floating mb-3">
                        <Select upperCodeId={"U001"}
                                codeId={"useYnPopup"}
                                codeClassName={"form-select"}
                                chkVal={"Y"}/>
                        <label>사용여부</label>
                    </div>
                    <div className="form-floating mb-3">
                        <Select upperCodeId={"F001"}
                                codeId={"fileYnPopup"}
                                codeClassName={"form-select"}
                                chkVal={"Y"}/>
                        <label>파일여부</label>
                    </div>
                    <div className="mt-4 mb-0">
                        <div className="d-grid">
                            <a className="btn btn-primary btn-block" id="btnRegister" onClick={postSave}>저장</a>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default AdminPost;
