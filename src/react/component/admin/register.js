
import React from 'react';
import "../../css/styles.css";

const  AdminRegister = () => {
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
                                                              <a className="btn btn-primary btn-block" id="btnLocation">주소찾기</a>
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
export default AdminRegister;
