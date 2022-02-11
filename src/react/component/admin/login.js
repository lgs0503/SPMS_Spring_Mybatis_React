
import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

import "../../css/styles.css";
import * as common from "../../comm/common";

const  AdminLogin = () => {
    useEffect(() => {

    }, []);

    /* 로그인 로직 */
    function login(){
        let userId = document.getElementById("userId");
        let password = document.getElementById("password");

        if(!common.nullCheck(userId.value)){
            alert("아이디를 입력해주세요.");
            userId.focus();
            return ;
        }

        if(!common.nullCheck(password.value)){
            alert("비밀번호를 입력해주세요.");
            password.focus();
            return ;
        }

        let data = {
            userId      : userId.value,
            password    : password.value,
            rule        : "admin"
        }

        common.fetchLoad("/loginProcessing", "POST", data, function (result) {

            if(result.loginStatus == "1"){
                sessionStorage.setItem("userId", userId.value);
                alert("로그인성공");
                window.location.href="/spring-showpingmall/#/admin";
            } else {
                alert("아이디와 비밀번호를 확인해주세요.");
                userId.value = "";
                password.value = "";
            }
        });
    };

  return (
      <div className="bg-primary">
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
                                                  <input className="form-control" id="userId" type="text" placeholder="아이디"/>
                                                  <label htmlFor="userId">아이디</label>
                                              </div>
                                              <div className="form-floating mb-3">
                                                  <input className="form-control" id="password" type="password" placeholder="비밀번호"/>
                                                  <label htmlFor="password">비밀번호</label>
                                              </div>
                                              <div className="form-check mb-3">
                                                  <input className="form-check-input" id="userIdChecked" type="checkbox"
                                                         value=""/>
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
              <div id="layoutAuthentication_footer">
                  <footer className="py-4 bg-light mt-auto">
                      <div className="container-fluid px-4">
                          <div className="d-flex align-items-center justify-content-between small">
                              <div className="text-muted">Copyright &copy; Your Website 2021</div>
                              <div>
                                  <a href="#">Privacy Policy</a>
                                  &middot;
                                  <a href="#">Terms &amp; Conditions</a>
                              </div>
                          </div>
                      </div>
                  </footer>
              </div>
          </div>
      </div>
  );
}

export default AdminLogin;
