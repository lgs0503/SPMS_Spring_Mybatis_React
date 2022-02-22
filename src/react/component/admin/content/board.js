import React, {useEffect, useState} from 'react';
import Table from "../../common/Table";
import * as common from "../../../comm/common";
import Modal from "../../common/modal";
import DaumPostcode from "react-daum-postcode";

const  AdminBoard = () => {

    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [modalOpen, setModalOpen] = useState(false);
    const [isOpenPost, setIsOpenPost] = useState(false);
    
    let modalTitle = "게시판 등록";

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const headerData = ['No', '게시판명', '게시판타입', '사용여부', '파일여부'];

    useEffect(() => {
        boardSearch();

    },[]);

    const boardSearch = () => {

        let data = {
                boardId     : document.getElementById("boardId").value
            ,   boardName   : document.getElementById("boardName").value
            ,   useYn       : document.getElementById("useYn").value
            ,   fileYn      : document.getElementById("fileYn").value
        };

        common.fetchLoad("/boardList","POST", data,(result) => {
            console.log(result.data.boardList);
            console.log(result.data.boardCnt);
        });
    }

    const boardAdd = () => {
        openModal();
    }

    const boardSave = (type) => {
        if(window.confirm("저장하시겠습니까?")){
            let callback = null;
            let data = {
                    boardId             : document.getElementById("popupId").value
                ,   boardName           : document.getElementById("popupName").value
                ,   boardType           : document.getElementById("popupType").value
                ,   boardDescription    : document.getElementById("popupDescription").value
                ,   useYn               : document.getElementById("popupUseYn").value
                ,   fileYn              : document.getElementById("popupFileYn").value
            };

            if(type == 1){
                callback = (result) => {
                    console.log(result.data.boardList);
                    console.log(result.data.boardCnt);
                }
            } else {

            }

            common.fetchLoad("/saveBoard","POST", data, callback);
        }
    }

    const boardDelete = () => {
        if(window.confirm("삭제하시겠습니까?")){

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
                  <select className="form-select search-slt" id="exampleFormControlSelect1" id="useYn">
                      <option value="">사용여부</option>
                      <option value="Y">Y</option>
                      <option value="N">N</option>
                  </select>
              </div>
              <div className="col-md-2 my-2">
                  <select className="form-select search-slt" id="exampleFormControlSelect1" id="fileYn">
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
          <div className="card mb-4">
              <div className="card-header">
                  <i className="fas fa-table me-1"></i>
                  Board List
                  <button type="button" className="btn btn-primary wrn-btn float-end btn-sm" onClick={boardDelete}>
                      <i className="fa-solid fa-minus"></i>
                  </button>
                  <button type="button" className="btn btn-primary wrn-btn float-end mx-1 btn-sm" onClick={boardAdd}>
                      <i className="fa-solid fa-plus"></i>
                  </button>
              </div>
              <div className="card-body">
                  <Table headerData={headerData} />
              </div>
          </div>
          <Modal open={modalOpen} close={closeModal} header={modalTitle}>
              <form>
                  <div className="form-floating mb-3">
                      <input className="form-control" id="userId" type="text" maxLength="20" id="popupId"/>
                      <label htmlFor="userId" id="idCheck">일련번호</label>
                  </div>
                  <div className="form-floating mb-3">
                      <input className="form-control" id="userId" type="text" maxLength="20" id="popupName"/>
                      <label>게시판 명</label>
                  </div>
                  <div className="form-floating mb-3">
                      <select id="gender" className="form-select" id="popupType">
                          <option value="">선택</option>
                          <option value="1">일반게시판</option>
                          <option value="2">사진게시판</option>
                      </select>
                      <label>게시판 타입</label>
                  </div>
                  <div className="form-floating mb-3">
                      <input className="form-control" type="text" maxLength="20" id="popupDescription"/>
                      <label>게시판 설명</label>
                  </div>
                  <div className="form-floating mb-3">
                      <select id="gender" className="form-select" id="popupUseYn">
                          <option value="">선택</option>
                          <option value="Y">Y</option>
                          <option value="N">N</option>
                      </select>
                      <label>사용여부</label>
                  </div>
                  <div className="form-floating mb-3">
                      <select id="gender" className="form-select" id="popupFileYn">
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
