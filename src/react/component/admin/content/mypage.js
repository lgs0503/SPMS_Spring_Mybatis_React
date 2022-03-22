import React, {useEffect, useState, useRef} from 'react';
import Table from "../../common/Table";
import * as common from "../../../comm/common";
import Modal from "../../common/Modal";
import {useDispatch} from "react-redux";
import {hideLoading, showAlertModal, showLoading} from "../../../action/aciton";
import Select from "../../common/Select";
import DaumPostcode from "react-daum-postcode";
import "../../../css/custom.css";
import FileInput from "../../common/FileInput";

const  AdminUser = () => {

    const dispatch = useDispatch();

    const [bodyData, setBodyData] = useState(null);
    const [bodyCnt, setBodyCnt] = useState(0);

    const [modalStatus, setModalStatus] =  useState({
        title : "회원 등록"
        ,   open : false
        ,   open_location : false
        ,   imageFileNo : null
        ,   gender : "1"
        ,   userRule : "1"
    });

    useEffect(() => {
        userSearch();
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
            headerColData : [{title: "ID",       name : "userId",             width:"30%",  hidden: false,  useData : true}
                            ,{title: "성명",      name : "userName",           width:"30%",   hidden: false,  useData : true}
                            ,{title: "권한",      name : "userRuleName",       width:"20%",   hidden: false,  useData : false}
                            ,{title: "성별",      name : "genderName",         width:"20%",   hidden: false,   useData : false}
                            ,{title: "권한",      name : "userRule",           width:"0",     hidden: true,   useData : true}
                            ,{title: "생년월일",  name : "birthday",           width:"0",     hidden: true,   useData : true}
                            ,{title: "이메일",    name : "email",              width:"0",     hidden: true,   useData : true}
                            ,{title: "주소",      name : "location",           width:"0",     hidden: true,   useData : true}
                            ,{title: "상세주소",   name : "locationDtl",       width:"0",     hidden: true,   useData : true}
                            ,{title: "휴대폰번호", name : "phoneNum",          width:"0",     hidden: true,   useData : true}
                            ,{title: "성별",      name : "gender",             width:"0",     hidden: true,   useData : true}]
        ,   title : "User List"
        ,   selectCol : 'userId'
        ,   deleted : true
        ,   inserted : false
        ,   pagination : true
        ,   colSpan : 4
        ,   cellSelectEvent : (e) => {
            dispatch(showLoading());


            let data = {
                userId : e.target.parentNode.id
            };

            new Promise((resolve, reject) => {
                common.fetchLoad("/searchUser","POST", data,(result) => {

                    setModalStatus((prevState => {
                        return{
                            ...prevState
                            ,   open : true
                            ,   title : "회원 상세"
                            ,   userRule : result.data.user["userRule"]
                            ,   gender : result.data.user["gender"]
                        }
                    }));

                    resolve(result);
                });
            }).then((result) => {
                tableInit.headerColData.forEach((value, index) => {
                    if(value.useData === true) {
                        document.getElementById(value.name + "Popup").value = result.data.user[value.name];
                    }
                });

                if(result.data.user["imageFileNo"]){
                    document.getElementById("fileName_imageFileNo").value = result.data.user["imageFileNoName"];
                }

                setModalStatus((prevState => {
                    return{
                        ...prevState
                        , imageFileNo: result.data.user["imageFileNo"] ? result.data.user["imageFileNo"] : null
                    }
                }));

                dispatch(hideLoading());
            });
        }
        , addBtnClickEvent : () => {
/*
            setModalStatus((prevState => {
                return{
                    ...prevState
                    ,   open : true
                    ,   title : "회원 등록"
                    ,   gender : "1"
                    ,   userRule : "1"
                    ,   imageFileNo : null
                }
            }));*/
        }
        , deleteBtnClickEvent :() => {
            if(window.confirm("삭제하시겠습니까?")){

                if(common.tableChkCnt("chk") == 0){
                    dispatch(showAlertModal('항목을 선택해주세요.'));
                    return;
                } else {
                    let data = {userIds : []};

                    data.userIds = common.tableChkIds("chk");

                    common.fetchLoad("/deleteUser","POST", data, () => {
                        dispatch(showAlertModal('삭제 되었습니다.'));
                        userSearch();
                    });
                }
            }
        }
    }

    const userSearch = () => {
        dispatch(showLoading());

        let data = {
                userId     : document.getElementById("userId").value
            ,   userName   : document.getElementById("userName").value
            ,   userRule    : document.getElementById("userRule").value
            ,   gender      : document.getElementById("gender").value
        };

        common.fetchLoad("/userList","POST", data,(result) => {
            //console.log(result.data.userList);
            //console.log(result.data.userCnt);
            setBodyData(result.data.userList);
            setBodyCnt(result.data.userCnt);
            dispatch(hideLoading());
        });
    }

    const userSave = () => {
        if(window.confirm("저장하시겠습니까?")){

            new Promise((resolve, reject)=> {

                if (document.getElementById("imageFileNo").value) {

                    let form = new FormData();
                    form.append("file", document.getElementById("imageFileNo").files[0]);

                    common.fetchLoad("/file/upload", "POST", form, function (result) {
                        resolve(result.uploadList[0].fileNo);
                    }, true);

                } else {
                    resolve();
                }

            }).then((resolve)=>{
                let data = {};

                tableInit.headerColData.forEach((value, index) => {
                    if(value.useData === true) {
                        data[value.name] = document.getElementById(value.name + "Popup").value;
                    }
                });

                /* 이미지 번호가 있으면 같이 저장한다.*/
                if (resolve){
                    data.imageFileNo = resolve;
                }

                common.fetchLoad("/saveUser","POST", data, (result) => {
                    dispatch(showAlertModal('저장 되었습니다.'));
                    closeModal();
                    userSearch();
                });
            });
        }
    }

    const locationModal = (type) =>{
        setModalStatus((prevState => {
            return{
                ...prevState
                ,   open_location : type
            }
        }))
    }

    const onCompletePost = (data) => {
        let fullAddr = data.address;
        let extraAddr = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddr += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
        }
        document.getElementById("locationPopup").value = fullAddr;
        locationModal(false);
    };

  return (
      <div className="container-fluid px-4">
          <h1 className="mt-4">MEMBER</h1>
          <ol className="breadcrumb mb-4">
              <li className="breadcrumb-item active">회원 관리</li>
          </ol>
          <div className="row py-2">
              <div className="col-md-3 my-2">
                  <input type="text" className="form-control search-slt" placeholder="회원 ID" id="userId"/>
              </div>
              <div className="col-md-3 my-2">
                  <input type="text" className="form-control search-slt" placeholder="회원 명" id="userName"/>
              </div>
              <div className="col-md-2 my-2">
                  <Select upperCodeId={"UR001"}
                          codeId={"userRule"}
                          codeClassName={"form-select"}
                          text={"회원권한"}/>
              </div>
              <div className="col-md-2 my-2">
                  <Select upperCodeId={"G001"}
                          codeId={"gender"}
                          codeClassName={"form-select"}
                          text={"성별"}/>
              </div>
              <div className="col-md-2 my-2">
                  <button type="button" className="btn btn-primary wrn-btn" onClick={userSearch}>
                      <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
              </div>
          </div>

          <Table tableInit={tableInit}
                 bodyData={bodyData}
                 bodyCnt={bodyCnt}/>

          <Modal open={modalStatus.open} close={closeModal} header={modalStatus.title}  modalSize={"modalSize5"}>
              <form id="formTest">
                  <div className="form-floating mb-3">
                      <input className="form-control" type="text" maxLength="20" id="userIdPopup" disabled={true}/>
                      <label htmlFor="userId" id="idCheck">ID</label>
                  </div>
                  <div className="form-floating mb-3">
                      <input className="form-control" type="text" maxLength="20" id="userNamePopup"/>
                      <label>회원 명</label>
                  </div>
                  <div className="form-floating mb-3">
                      <input className="form-control" type="date" id="birthdayPopup"/>
                      <label>생년월일</label>
                  </div>
                  <div className="form-floating mb-3">
                      <Select upperCodeId={"G001"}
                              codeId={"genderPopup"}
                              codeClassName={"form-select"}
                              chkVal={modalStatus.gender}/>
                      <label>성별</label>
                  </div>
                  <div className="form-floating mb-3">
                      <input className="form-control" type="text" maxLength="50" id="emailPopup"/>
                      <label>이메일</label>
                  </div>
                  <div className="row mb-3">
                      <div className="col-md-8">
                          <div className="form-floating mb-3 mb-md-0">
                              <input className="form-control" id="locationPopup" type="text"/>
                              <label>주소</label>
                          </div>
                      </div>
                      <div className="col-md-4">
                          <div className="form-floating mb-3 mb-md-0">
                              <div className="d-grid">
                                  <a className="btn btn-primary btn-block locationBtnPadding" id="btnLocation" onClick={() => locationModal(true)}>주소찾기</a>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="form-floating mb-3">
                      <input className="form-control" id="locationDtlPopup"  maxLength="100" type="text"/>
                      <label>상세주소</label>
                  </div>
                  <div className="form-floating mb-3">
                      <input className="form-control" id="phoneNumPopup"  maxLength="100" type="text"/>
                      <label>휴대폰번호</label>
                  </div>
                  <div className="form-floating mb-3">
                      <Select upperCodeId={"UR001"}
                              codeId={"userRulePopup"}
                              codeClassName={"form-select"}
                              chkVal={modalStatus.userRule}/>
                      <label>회원권한</label>
                  </div>
                  <FileInput fileId={"imageFileNo"}
                             label={"프로필 사진"}
                             fileNo={modalStatus.imageFileNo}
                             fileClassName={"form-floating mb-3"}/>
                  <div className="mt-4 mb-0">
                      <div className="d-grid">
                          <a className="btn btn-primary btn-block" id="btnRegister" onClick={userSave}>저장</a>
                      </div>
                  </div>
              </form>
          </Modal>
          <Modal open={modalStatus.open_location} close={() => locationModal(false)} header="주소찾기">
              <DaumPostcode autoClose onComplete={onCompletePost} />
          </Modal>
      </div>
  );
}

export default AdminUser;
