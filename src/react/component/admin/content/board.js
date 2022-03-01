import React, {useEffect, useState, useRef} from 'react';
import Table from "../../common/Table";
import * as common from "../../../comm/common";
import Modal from "../../common/Modal";
import DaumPostcode from "react-daum-postcode";
import {useDispatch} from "react-redux";
import {showAlertModal} from "../../../action/alertModal";

const  AdminBoard = () => {

    const dispatch = useDispatch();

    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [modalOpen, setModalOpen] = useState(false);

    const [bodyData, setBodyData] = useState(null);
    const [bodyCnt, setBodyCnt] = useState(0);

    const [modalTitle, setModalTitle] = useState("게시판 등록");

    useEffect(() => {
        boardSearch();
    },[]);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    let tableInit = {
            headerColData : [{title: "ID",         name : "boardId",             hidden: false}
                            ,{title: "게시판명",    name : "boardName",           hidden: false}
                            ,{title: "게시판타입",  name : "boardType",           hidden: false}
                            ,{title: "사용여부",    name : "useYn",               hidden: false}
                            ,{title: "파일여부",    name : "fileYn",              hidden: false}
                            ,{title: "게시판설명",  name : "boardDescription",    hidden: true}]
        ,   title : "Board List"
        ,   selectCol : 'boardId'
        ,   deleted : true
        ,   inserted : true
        ,   pagination : true
        ,   colSpan : 5
        ,   cellSelectEvent : (e) => {

            let data = {
                boardId : e.target.parentNode.id
            };

            common.fetchLoad("/searchBoard","POST", data,(result) => {
                setModalTitle("게시판 상세");
                openModal();

                //console.log(result.data.board);
                tableInit.headerColData.forEach((value, index) => {
                    document.getElementById(value.name + "Popup").value = result.data.board[value.name];
                });
            });
        }
        , addBtnClickEvent : () => {
            setModalTitle("게시판 등록");
            openModal();
        }
        , deleteBtnClickEvent :() => {
            if(window.confirm("삭제하시겠습니까?")){

                if(common.tableChkCnt("chk") == 0){
                    dispatch(showAlertModal('항목을 선택해주세요.'));
                    return;
                } else {
                    let data = {boardIds : []};

                    data.boardIds = common.tableChkIds("chk");

                    common.fetchLoad("/deleteBoard","POST", data, () => {
                        dispatch(showAlertModal('삭제 되었습니다.'));
                        boardSearch();
                    });
                }
            }
        }
    }

    const boardSearch = () => {

        let data = {
                boardId     : document.getElementById("boardId").value
            ,   boardName   : document.getElementById("boardName").value
            ,   useYn       : document.getElementById("useYn").value
            ,   fileYn      : document.getElementById("fileYn").value
        };

        common.fetchLoad("/boardList","POST", data,(result) => {
            //console.log(result.data.boardList);
            //console.log(result.data.boardCnt);
            setBodyData(result.data.boardList);
            setBodyCnt(result.data.boardCnt);
        });
    }

    const boardSave = () => {
        if(window.confirm("저장하시겠습니까?")){
            let data = {};
            tableInit.headerColData.forEach((value, index) => {
                data[value.name] =  document.getElementById(value.name + "Popup").value;
            });

            common.fetchLoad("/saveBoard","POST", data, (result) => {
                dispatch(showAlertModal('저장 되었습니다.'));
                closeModal();
                boardSearch();
            });
        }
    }

  return (
      <div className="container-fluid px-4">
          <h1 className="mt-4">BOARD</h1>
          <ol className="breadcrumb mb-4">
              <li className="breadcrumb-item active">게시판 관리</li>
          </ol>
          <div className="row py-2">
              <div className="col-md-3 my-2">
                  <input type="text" className="form-control search-slt" placeholder="게시판 ID" id="boardId"/>
              </div>
              <div className="col-md-3 my-2">
                  <input type="text" className="form-control search-slt" placeholder="게시판 명" id="boardName"/>
              </div>
              <div className="col-md-2 my-2">
                  <select className="form-select search-slt"  id="useYn">
                      <option value="">사용여부</option>
                      <option value="Y">Y</option>
                      <option value="N">N</option>
                  </select>
              </div>
              <div className="col-md-2 my-2">
                  <select className="form-select search-slt"  id="fileYn">
                      <option value="">파일여부</option>
                      <option value="Y">Y</option>
                      <option value="N">N</option>
                  </select>
              </div>
              <div className="col-md-2 my-2">
                  <button type="button" className="btn btn-primary wrn-btn" onClick={boardSearch}>
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
                      <input className="form-control" id="userId" type="text" maxLength="20" id="boardIdPopup" disabled={true}/>
                      <label htmlFor="userId" id="idCheck">일련번호</label>
                  </div>
                  <div className="form-floating mb-3">
                      <input className="form-control" id="userId" type="text" maxLength="20" id="boardNamePopup"/>
                      <label>게시판 명</label>
                  </div>
                  <div className="form-floating mb-3">
                      <select id="gender" className="form-select" id="boardTypePopup">
                          <option value="">선택</option>
                          <option value="1">일반게시판</option>
                          <option value="2">사진게시판</option>
                      </select>
                      <label>게시판 타입</label>
                  </div>
                  <div className="form-floating mb-3">
                      <input className="form-control" type="text" maxLength="20" id="boardDescriptionPopup"/>
                      <label>게시판 설명</label>
                  </div>
                  <div className="form-floating mb-3">
                      <select id="gender" className="form-select" id="useYnPopup">
                          <option value="">선택</option>
                          <option value="Y">Y</option>
                          <option value="N">N</option>
                      </select>
                      <label>사용여부</label>
                  </div>
                  <div className="form-floating mb-3">
                      <select id="gender" className="form-select" id="fileYnPopup">
                          <option value="">선택</option>
                          <option value="Y">Y</option>
                          <option value="N">N</option>
                      </select>
                      <label>파일여부</label>
                  </div>
                  <div className="mt-4 mb-0">
                      <div className="d-grid">
                          <a className="btn btn-primary btn-block" id="btnRegister" onClick={boardSave}>저장</a>
                      </div>
                  </div>
              </form>
          </Modal>
      </div>
  );
}

export default AdminBoard;
