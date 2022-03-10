import React, {useEffect, useState, useRef} from 'react';
import Table from "../../common/Table";
import * as common from "../../../comm/common";
import Modal from "../../common/Modal";
import {useDispatch} from "react-redux";
import {showAlertModal} from "../../../action/alertModal";
import Select from "../../common/Select";
import "../../../css/custom.css"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useParams} from "react-router-dom";

const  AdminPost = () => {

    const boardType = useParams().boardType;
    console.log(boardType);
    const dispatch = useDispatch();

    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [modalOpen, setModalOpen] = useState(false);

    const [bodyData, setBodyData] = useState(null);
    const [bodyCnt, setBodyCnt] = useState(0);
    const [content, setContent] = useState("");

    const [modalTitle, setModalTitle] = useState("게시글 등록");

    useEffect(() => {

        setTimeout(()=>{
            if(boardType){
                document.getElementById("boardId").value = boardType;
            }
            postSearch();
        },500);

    },[]);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    let tableInit = {
        headerColData : [{title: "ID",         name : "postId",             width:"10px",  hidden: false}
                        ,{title: "게시판명",    name : "boardName",          width:"15%",   hidden: false}
                        ,{title: "게시글제목",    name : "postTitle",        width:"25%",   hidden: false}
                        ,{title: "게시글타입",  name : "postTypeName",       width:"15%",   hidden: false}
                        ,{title: "작성자",    name : "createUser",           width:"10%",   hidden: false}
                        ,{title: "작성일",    name : "createDate",           width:"15%",   hidden: false}]
        ,   title : "Post List"
        ,   selectCol : 'postId'
        ,   deleted : true
        ,   inserted : true
        ,   pagination : true
        ,   colSpan : 6
        ,   cellSelectEvent : (e) => {

            setModalTitle("게시글 상세");
            openModal();

            let data = {
                postId : e.target.parentNode.id
            };

            common.fetchLoad("/searchPost","POST", data,(result) => {

                //console.log(result.data.post);
                setTimeout(() => {

                    document.getElementById("postIdPopup").value = result.data.post["postId"];
                    document.getElementById("boardIdPopup").value = result.data.post["boardId"];
                    document.getElementById("postTitlePopup").value = result.data.post["postTitle"];
                    document.getElementById("postTypePopup").value = result.data.post["postType"];
                    document.getElementById("fileNo1Popup").value = result.data.post["fileNo1"];
                    document.getElementById("fileNo2Popup").value = result.data.post["fileNo2"];
                    setContent(result.data.post["postContent"]);
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
            ,   postTitle   : document.getElementById("postTitle").value
            ,   boardId    : document.getElementById("boardId").value
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

            data = {
                postId : document.getElementById("postIdPopup").value,
                boardId : document.getElementById("boardIdPopup").value,
                postTitle : document.getElementById("postTitlePopup").value,
                postType : document.getElementById("postTypePopup").value,
                fileNo1 : document.getElementById("fileNo1Popup").value,
                fileNo2 : document.getElementById("fileNo2Popup").value,
                postContent : content
            }

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
                    <input type="text" className="form-control search-slt" placeholder="게시글 제목" id="postTitle"/>
                </div>
                <div className="col-md-2 my-2">
                    <Select codeStatus={"BOARD"}
                            codeId={"boardId"}
                            codeClassName={"form-select"}
                            text={"게시판"}/>
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

            <Modal open={modalOpen} close={closeModal} header={modalTitle} modalSize={"modalSize9"}>
                <form id="formTest">
                    <div className="form-floating mb-3">
                        <input className="form-control" type="text" maxLength="20" id="postIdPopup" disabled={true}/>
                        <label htmlFor="userId" id="idCheck">일련번호</label>
                    </div>
                    <div className="form-floating mb-3">
                        <Select codeStatus={"BOARD"}
                                codeId={"boardIdPopup"}
                                codeClassName={"form-select"}
                                text={"선택"}/>
                        <label>게시판</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" type="text" maxLength="20" id="postTitlePopup"/>
                        <label>게시글 제목</label>
                    </div>
                    <div className="form-floating mb-3">
                        <Select upperCodeId={"P001"}
                                codeId={"postTypePopup"}
                                codeClassName={"form-select"}
                                chkVal={"1"}/>
                        <label>게시글 타입</label>
                    </div>
                    <div className="form-floating mb-3">
                        <label>내용</label>
                        <CKEditor
                            data = {content}
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
                                setContent(data);
                                console.log( { event, editor, data } );
                            } }
                            onBlur={ ( event, editor ) => {
                                console.log( 'Blur.', editor );
                            } }
                            onFocus={ ( event, editor ) => {
                                console.log( 'Focus.', editor );
                            } }
                        />
                      {/*  <input className="form-control" type="textarea" maxLength="20" id="postDescriptionPopup"/>*/}
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control fileInput" type="file" maxLength="20" id="fileNo1Popup"/>
                        <label>파일업로드 1</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control fileInput" type="file" maxLength="20" id="fileNo2Popup"/>
                        <label>파일업로드 2</label>
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
