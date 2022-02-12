
import React, {useEffect} from 'react';
import "../../css/styles.css";
import AdminLoginRegiFooter from "./footer";
import * as common from "../../comm/common";

const  AdminRegister = () => {
    let idCheckStatus = "";

    useEffect( () => {

    },[]);

    const daumLocation = () => {
        /* 주소 찾기 카카오 api */
    };

    const userIdCheck = () => {
        let data = {
            userId : document.getElementById("userId").value
        };

        common.fetchLoad("/userIdCheck", "POST", data, function (result) {
            idCheckStatus = result.idCheckStatus;
            if(idCheckStatus == "1"){
                document.getElementById("idCheck").innerText = "중복된 계정이 존재합니다.";
                document.getElementById("idCheck").style.color = "red";
            } else {
                document.getElementById("idCheck").innerText = "아이디";
                document.getElementById("idCheck").style.color = "black";
            }
        });
    };

    const fileChange = () => {
        common.uploadImgChange("imageFile", "thumbnailImg");
    }

    const register = () => {

        /* 아이디 중복 체크 */
        if(idCheckStatus == "1"){
            alert("중복된 아이디가 존재합니다.");
            return;
        }

        /* 비밀번호 체크 */
        if(document.getElementById("password").value != document.getElementById("passwordchk").value){
            alert("비밀번호 와 비밀번호 확인이 일치하지 않습니다.");
            document.getElementById("passwordchk").focus();
            return;
        }

        let data = {
            userId : document.getElementById("userId").value,
            password : document.getElementById("password").value,
            userName : document.getElementById("userName").value,
            age : document.getElementById("age").value,
            gender : document.getElementById("gender").value,
            email : document.getElementById("email").value,
            location : document.getElementById("location").value,
            locationDetail : document.getElementById("locationDtl").value,
            imageFileNo : "1",
            phoneNum : document.getElementById("phoneNum").value,
            rule : "admin",
            deleted : "0"
        };

        /* 필수값 체크 */
        let validationChkName = ["아이디", "비밀번호"
            , "성명", "나이"
            , "성별", "이메일"
            , "주소", "상세주소"
            , "연락처"];

        let validationChkId = ["userId", "password"
            , "userName", "age"
            , "gender" , "email"
            , "location", "locationDtl"
            , "phoneNum"];

        for(let i = 0 ; i < validationChkName.length ; i++){
            if (!nullCheck(document.getElementById(validationChkId[i]).value)){
                alert("["+ validationChkName[i] + "]를 입력해주세요.");
                document.getElementById(validationChkId[i]).focus();
                return;
            }
        }

        /* 파일이 존재하면 */
        if(document.getElementById("imageFile").value){

            /*파일업로드 */
            new Promise(function(resolve, reject){
                let form = new FormData();
                form.append( "file", document.getElementById("imageFile").files[0]);

                common.fetchLoad("/file/upload", "POST", form, function (result) {
                    resolve(result.uploadList[0].fileNo);
                }, true);

            }).then(function (resolve) {
                /* 이미지 번호가 있으면 회원가입에 같이 저장한다.*/
                if (resolve){
                    data.imageFileNo = resolve;
                }
                common.fetchLoad("/registerProcessing", "POST", data, function (result) {
                    if (result.registerStatus == "1"){
                        alert("회원가입이 성공되었습니다.");
                        location.href = "../admin/login.html";
                    }
                });
            });

        } else {  /* 파일이 없으면 파일업로드 제외 */

            common.fetchLoad("/registerProcessing", "POST", data, function (result) {
                if (result.registerStatus == "1"){
                    alert("회원가입이 성공되었습니다.");
                    location.href = "../admin/login.html";
                }
            });
        }
    }


   return (
      <div className="bg-primary">
          <div id="layoutAuthentication">
              <div id="layoutAuthentication_content">
                  <main>
                      <div className="container">
                          <div className="row justify-content-center">
                              <div className="col-lg-7">
                                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                                      <div className="card-header"><h3 className="text-center font-weight-light my-4">Admin 회원가입</h3></div>
                                      <div className="card-body">
                                          <form>
                                              <div className="form-floating mb-3">
                                                  <input className="form-control" id="userId" type="text" placeholder="아이디를 입력해주세요" maxLength="20"/>
                                                  <label htmlFor="userId" id="idCheck">아이디</label>
                                              </div>
                                              <div className="form-floating mb-3">
                                                  <input className="form-control" id="password" type="password" placeholder="비밀번호를 입력해주세요" maxLength="20"/>
                                                  <label htmlFor="password">비밀번호</label>
                                              </div>
                                              <div className="form-floating mb-3">
                                                  <input className="form-control" id="passwordchk" type="password" placeholder="비밀번호를 입력해주세요" maxLength="20"/>
                                                  <label htmlFor="passwordchk">비밀번호 확인</label>
                                              </div>
                                              <div className="form-floating mb-3">
                                                  <input className="form-control" id="userName" type="text" placeholder="성명을 입력해주세요" maxLength="20"/>
                                                  <label htmlFor="userName">성명</label>
                                              </div>
                                              <div className="form-floating mb-3">
                                                  <input className="form-control" id="age" type="text" placeholder="나이를 입력해주세요" maxLength="20"/>
                                                  <label htmlFor="age">나이</label>
                                              </div>
                                              <div className="form-floating mb-3">
                                                  <select id="gender" className="form-select">
                                                      <option value="">선택</option>
                                                      <option value="1">남자</option>
                                                      <option value="2">여자</option>
                                                  </select>
                                              </div>
                                              <div className="form-floating mb-3">
                                                  <input className="form-control" id="email" type="email" placeholder="name@example.com"/>
                                                  <label htmlFor="email">이메일</label>
                                              </div>
                                              <div className="row mb-3">
                                                  <div className="col-md-8">
                                                      <div className="form-floating mb-3 mb-md-0">
                                                          <input className="form-control" id="location" type="text" placeholder="주소를 입력해주세요"/>
                                                          <label htmlFor="location">주소</label>
                                                      </div>
                                                  </div>
                                                  <div className="col-md-4">
                                                      <div className="form-floating mb-3 mb-md-0">
                                                          <div className="d-grid">
                                                              <a className="btn btn-primary btn-block" id="btnLocation" onClick={daumLocation}>주소찾기</a>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="form-floating mb-3">
                                                  <input className="form-control" id="locationDtl" type="text"
                                                         placeholder="상세주소를 입력해주세요"/>
                                                  <label htmlFor="locationDtl">상세주소</label>
                                              </div>
                                              <div className="form-floating mb-3">
                                                  <input className="form-control" id="phoneNum" type="text"
                                                         placeholder="010-1234-5678" maxLength="30"/>
                                                  <label htmlFor="phoneNum">연락처(-)없이 숫자만 입력</label>
                                              </div>
                                              <div className="form-floating mb-3">
                                                  <input className="form-control" id="imageFile" type="file" accept=".gif, .jpg, .png"/>
                                              </div>
                                              <img id="thumbnailImg" src=""/>
                                              <div className="mt-4 mb-0">
                                                  <div className="d-grid">
                                                      <a className="btn btn-primary btn-block" id="btnRegister">회원가입</a>
                                                  </div>
                                              </div>
                                          </form>
                                      </div>
                                      <div className="card-footer text-center py-3">
                                          <div className="small"><a href="login.html">뒤로가기</a></div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </main>
              </div>

              <AdminLoginRegiFooter/>
          </div>
      </div>
  );
}
export default AdminRegister;
