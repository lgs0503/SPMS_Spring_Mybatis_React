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

const  AdminMyPage = () => {

    const dispatch = useDispatch();

    const inputIds = ["userId", "userName"
        , "userRule", "birthday"
        , "email", "location"
        , "locationDtl", "phoneNum"
        , "gender"];

    const [myPageStatus, setMyPageStatus] =  useState({
        open_location : false
        ,   imageFileNo : null
        ,   gender : "1"
        ,   userRule : "1"
    });

    useEffect(() => {
        serachMyData();
    },[]);

    const serachMyData = () => {
        dispatch(showLoading());


        new Promise((resolve, reject) => {

            let data = {
                userId : sessionStorage.getItem("userId")
            };

            common.fetchLoad("/searchUser","POST", data,(result) => {

                setMyPageStatus((prevState => {
                    return{
                        ...prevState
                        ,   userRule : result.data.user["userRule"]
                        ,   gender : result.data.user["gender"]
                        ,   imageFileNo: result.data.user["imageFileNo"] ? result.data.user["imageFileNo"] : null
                    }
                }));

                inputIds.forEach((value, index) => {
                    document.getElementById(value + "Popup").value = result.data.user[value];
                });

                if(result.data.user["imageFileNo"]){
                    document.getElementById("fileName_imageFileNo").value = result.data.user["imageFileNoName"];
                }
                resolve(result);
            });

        }).then((result) => {

            if(result.data.user["imageFileNo"]){
                let data = {
                    fileNo : result.data.user["imageFileNo"]
                };

                common.fetchLoad("/getImageData","POST", data,(imgResult) => {
                    document.getElementById("thumbnailImg").src = common.base64Img(imgResult.data.imageData);
                });
            }

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

                inputIds.forEach((value, index) => {
                    data[value] = document.getElementById(value + "Popup").value;
                });

                /* 이미지 번호가 있으면 같이 저장한다.*/
                if (resolve){
                    data.imageFileNo = resolve;
                }

                common.fetchLoad("/saveUser","POST", data, (result) => {
                    dispatch(showAlertModal('저장 되었습니다.'));
                });
            });
        }
    }

    const locationModal = (type) =>{
        setMyPageStatus((prevState => {
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
          <h1 className="mt-4">MyPage</h1>
          <ol className="breadcrumb mb-4">
              <li className="breadcrumb-item active">마이 페이지</li>
          </ol>
          <form id="formTest">
              <div className="row mb-3">
                  <div className="col-md-5">
                      <div className={"imgForm"}>
                          <img className={"userImage"} id={"thumbnailImg"} src={"#"}/>
                      </div>
                      <FileInput fileId={"imageFileNo"}
                                 label={"프로필 사진"}
                                 fileNo={myPageStatus.imageFileNo}
                                 fileClassName={"form-floating mb-3 mt-3"}
                                 thumbnail={"thumbnailImg"}/>
                  </div>
                  <div className="col-md-7">
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
                                  chkVal={myPageStatus.gender}/>
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
                                  chkVal={myPageStatus.userRule}/>
                          <label>회원권한</label>
                      </div>
                      <div className="mt-4 mb-0">
                          <div className="d-grid">
                              <a className="btn btn-primary btn-block" id="btnRegister" onClick={userSave}>저장</a>
                          </div>
                      </div>
                  </div>
              </div>
          </form>
          <Modal open={myPageStatus.open_location} close={() => locationModal(false)} header="주소찾기">
              <DaumPostcode autoClose onComplete={onCompletePost} />
          </Modal>
      </div>
  );
}

export default AdminMyPage;
