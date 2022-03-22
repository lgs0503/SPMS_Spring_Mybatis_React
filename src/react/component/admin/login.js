
import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

import "../../css/styles.css";
import * as common from "../../comm/common";
import AdminLoginRegiFooter from "./footer";
import {useDispatch} from "react-redux";
import {hideLoading, showAlertModal, showLoading} from "../../action/aciton";

const  AdminLogin = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        let key = common.getCookie("key");

        if(key){
            document.getElementById("userId").value = key;
            document.getElementById("userIdChecked").checked = true;
        }
    }, []);

    const userIdCheckChange = () => {
        if (document.getElementById("userIdChecked").checked == true){
            common.setCookie("key", document.getElementById("userId").value, 7);
        } else {
            common.deleteCookie("key");
        }
    }

    const userIdInputKeyup = () => {
        if (document.getElementById("userIdChecked").checked == true){
            common.setCookie("key", document.getElementById("userId").value, 7);
        }
    }

    const onCheckEnter = (e) => {
        if(e.key === 'Enter') {
            login();
        }
    }

    const login = () => {
        dispatch(showLoading());
        let userId = document.getElementById("userId");
        let password = document.getElementById("password");

        if(!common.nullCheck(userId.value)){
            dispatch(hideLoading());
            dispatch(showAlertModal('아이디를 입력해주세요.'));
            userId.focus();
            return ;
        }

        if(!common.nullCheck(password.value)){
            dispatch(hideLoading());
            dispatch(showAlertModal('비밀번호를 입력해주세요.'));
            password.focus();
            return ;
        }

        let data = {
            userId      : userId.value,
            password    : password.value
        }

        new Promise((resolve, reject)=>{

            common.fetchLoad("/loginRuleCheck", "POST", data, (result) => {
                if(result.loginRule == "2" || result.loginRule == "3"){
                    resolve();
                } else if (result.loginRule == "0"){
                    dispatch(hideLoading());
                    dispatch(showAlertModal('가입 미승인 계정 입니다.'));
                    return;
                } else if(result.loginRule == "1"){
                    dispatch(hideLoading());
                    dispatch(showAlertModal('관리자 권한 계정만 로그인 가능합니다.'));
                    return;
                } else {
                    resolve();
                }
            });

        }).then(()=>{

            common.fetchLoad("/loginProcessing", "POST", data, (result) => {

                if(result.loginStatus == "1"){
                    sessionStorage.setItem("userId", userId.value);
                    window.location.href="/spring-showpingmall/#/admin";
                } else {
                    dispatch(hideLoading());
                    dispatch(showAlertModal('아이디와 비밀번호를 확인해주세요.'));
                    userId.value = "";
                    password.value = "";
                }
            });
        });


    };

  return (
      <div className="bg-primary-black">
          <div id="layoutAuthentication">
              <div id="layoutAuthentication_content">
                  <main>
                      <div className="container">
                          <div className="row justify-content-center">
                              <div className="col-lg-5">
                                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                                      <div className="card-header"><h3 className="text-center font-weight-light my-4">Admin Login</h3></div>
                                      <div className="card-body">
                                          <form>
                                              <div className="form-floating mb-3">
                                                  <input className="form-control" id="userId" type="text" placeholder="아이디" onKeyUp={userIdInputKeyup} onKeyPress={onCheckEnter}/>
                                                  <label htmlFor="userId">아이디</label>
                                              </div>
                                              <div className="form-floating mb-3">
                                                  <input className="form-control" id="password" type="password" placeholder="비밀번호" onKeyPress={onCheckEnter}/>
                                                  <label htmlFor="password">비밀번호</label>
                                              </div>
                                              <div className="form-check mb-3">
                                                  <input className="form-check-input" id="userIdChecked" type="checkbox" value="" onChange={userIdCheckChange}/>
                                                  <label className="form-check-label" htmlFor="userIdChecked">아이디 저장</label>
                                              </div>
                                              <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                  <a className="small" href="password.html">비밀번호 찾기</a>
                                                  <a className="btn btn-primary" id="btnLogin" onClick={login}>Login</a>
                                              </div>
                                          </form>
                                      </div>
                                      <div className="card-footer text-center py-3">
                                          <div className="small">
                                              <Link to="/admin/register">회원가입</Link>
                                          </div>
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

export default AdminLogin;
