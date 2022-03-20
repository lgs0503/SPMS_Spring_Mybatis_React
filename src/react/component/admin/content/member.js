import React, {useEffect, useState, useRef} from 'react';
import Table from "../../common/Table";
import * as common from "../../../comm/common";
import Modal from "../../common/Modal";
import {useDispatch} from "react-redux";
import {hideLoading, showAlertModal, showLoading} from "../../../action/aciton";
import Select from "../../common/Select";

const  AdminMember = () => {

    const dispatch = useDispatch();

    const [bodyData, setBodyData] = useState(null);
    const [bodyCnt, setBodyCnt] = useState(0);

    const [modalStatus, setModalStatus] =  useState({
        title : "회원 등록"
        ,   open : false
    });

    useEffect(() => {
        memberSearch();
    },[]);

    const closeModal = () => {
        setModalStatus((prevState => {
            return{
                ...prevState
                ,   open : false
            }
        }));
    };

    let tableInit = {
            headerColData : [{title: "ID",         name : "memberId",             width:"10px",  hidden: false,  useData : true}
                            ,{title: "회원명",    name : "memberName",           width:"30%",   hidden: false,  useData : true}
                            ,{title: "회원타입",  name : "memberTypeName",       width:"30%",   hidden: false,  useData : false}
                            ,{title: "사용여부",    name : "useYnName",           width:"12%",   hidden: false,  useData : false}
                            ,{title: "파일여부",    name : "fileYnName",          width:"12%",   hidden: false,  useData : false}
                            ,{title: "회원설명",  name : "memberDescription",    width:"0",     hidden: true,   useData : true}
                            ,{title: "사용여부",    name : "useYn",               width:"0",     hidden: true,   useData : true}
                            ,{title: "파일여부",    name : "fileYn",              width:"0",     hidden: true,   useData : true}
                            ,{title: "회원타입",  name : "memberType",           width:"0",     hidden: true,   useData : true}]
        ,   title : "Member List"
        ,   selectCol : 'memberId'
        ,   deleted : true
        ,   inserted : true
        ,   pagination : true
        ,   colSpan : 5
        ,   cellSelectEvent : (e) => {
            dispatch(showLoading());

            setModalStatus((prevState => {
                return{
                    ...prevState
                    ,   open : true
                    ,   title : "회원 상세"
                }
            }));

            let data = {
                memberId : e.target.parentNode.id
            };

            new Promise((resolve, reject) => {
                common.fetchLoad("/searchMember","POST", data,(result) => {
                    resolve(result);
                });
            }).then((result) => {
                tableInit.headerColData.forEach((value, index) => {
                    if(value.useData === true) {
                        document.getElementById(value.name + "Popup").value = result.data.member[value.name];
                    }
                });
                dispatch(hideLoading());
            });
        }
        , addBtnClickEvent : () => {

            setModalStatus((prevState => {
                return{
                    ...prevState
                    ,   open : true
                    ,   title : "회원 등록"
                }
            }));
        }
        , deleteBtnClickEvent :() => {
            if(window.confirm("삭제하시겠습니까?")){

                if(common.tableChkCnt("chk") == 0){
                    dispatch(showAlertModal('항목을 선택해주세요.'));
                    return;
                } else {
                    let data = {memberIds : []};

                    data.memberIds = common.tableChkIds("chk");

                    common.fetchLoad("/deleteMember","POST", data, () => {
                        dispatch(showAlertModal('삭제 되었습니다.'));
                        memberSearch();
                    });
                }
            }
        }
    }

    const memberSearch = () => {
        dispatch(showLoading());

        let data = {
                memberId     : document.getElementById("memberId").value
            ,   memberName   : document.getElementById("memberName").value
            ,   useYn       : document.getElementById("useYn").value
            ,   fileYn      : document.getElementById("fileYn").value
        };

        common.fetchLoad("/memberList","POST", data,(result) => {
            //console.log(result.data.memberList);
            //console.log(result.data.memberCnt);
            setBodyData(result.data.memberList);
            setBodyCnt(result.data.memberCnt);
            dispatch(hideLoading());
        });
    }

    const memberSave = () => {
        if(window.confirm("저장하시겠습니까?")){
            let data = {};
            tableInit.headerColData.forEach((value, index) => {
                data[value.name] =  document.getElementById(value.name + "Popup").value;
            });

            common.fetchLoad("/saveMember","POST", data, (result) => {
                dispatch(showAlertModal('저장 되었습니다.'));
                closeModal();
                memberSearch();
            });
        }
    }

  return (
      <div className="container-fluid px-4">
          <h1 className="mt-4">MEMBER</h1>
          <ol className="breadcrumb mb-4">
              <li className="breadcrumb-item active">회원 관리</li>
          </ol>
          <div className="row py-2">
              <div className="col-md-3 my-2">
                  <input type="text" className="form-control search-slt" placeholder="회원 ID" id="memberId"/>
              </div>
              <div className="col-md-3 my-2">
                  <input type="text" className="form-control search-slt" placeholder="회원 명" id="memberName"/>
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
                  <button type="button" className="btn btn-primary wrn-btn" onClick={memberSearch}>
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
                      <input className="form-control" type="text" maxLength="20" id="memberIdPopup" disabled={true}/>
                      <label htmlFor="userId" id="idCheck">일련번호</label>
                  </div>
                  <div className="form-floating mb-3">
                      <input className="form-control" type="text" maxLength="20" id="memberNamePopup"/>
                      <label>회원 명</label>
                  </div>
                  <div className="form-floating mb-3">
                      <Select upperCodeId={"B001"}
                              codeId={"memberTypePopup"}
                              codeClassName={"form-select"}
                              chkVal={"1"}/>
                      <label>회원 타입</label>
                  </div>
                  <div className="form-floating mb-3">
                      <input className="form-control" type="text" maxLength="20" id="memberDescriptionPopup"/>
                      <label>회원 설명</label>
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
                          <a className="btn btn-primary btn-block" id="btnRegister" onClick={memberSave}>저장</a>
                      </div>
                  </div>
              </form>
          </Modal>
      </div>
  );
}

export default AdminMember;
