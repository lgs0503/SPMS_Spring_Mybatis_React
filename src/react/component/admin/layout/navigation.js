import React from 'react';
import {Link} from 'react-router-dom';

const AdminNavigation = () => {

  return (
      <div id="layoutSidenav_nav">
          <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
              <div className="sb-sidenav-menu">
                  <div className="nav">
                      <div className="sb-sidenav-menu-heading">Setting</div>
                      <Link className="nav-link" to="/admin/code">
                          <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                          코드 관리
                      </Link>
                      <Link className="nav-link" to="/admin/menu">
                          <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                          메뉴 관리
                      </Link>
                      <Link className="nav-link" to="index.html">
                          <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                          배너 관리
                      </Link>
                      <Link className="nav-link" to="index.html">
                          <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                          팝업 관리
                      </Link>
                      <div className="sb-sidenav-menu-heading">Board</div>
                      <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse"
                         data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                          <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                          게시판 관리
                          <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                      </Link>
                      <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne"
                           data-bs-parent="#sidenavAccordion">
                          <nav className="sb-sidenav-menu-nested nav">
                              <Link className="nav-link" to="../../../../../dist/layout-static.html">게시판</Link>
                              <Link className="nav-link" to="../../../../../dist/layout-sidenav-light.html">게시글</Link>
                              <Link className="nav-link" to="../../../../../dist/layout-sidenav-light.html">댓글</Link>
                          </nav>
                      </div>
                      <div className="sb-sidenav-menu-heading">Product</div>
                      <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse"
                         data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                          <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                          제품 관리
                          <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                      </Link>
                      <div className="collapse" id="collapsePages" aria-labelledby="headingTwo"
                           data-bs-parent="#sidenavAccordion">
                          <nav className="sb-sidenav-menu-nested nav">
                              <Link className="nav-link" to="../../../../../dist/layout-static.html">제품</Link>
                              <Link className="nav-link" to="../../../../../dist/layout-sidenav-light.html">제품구매</Link>
                              <Link className="nav-link" to="../../../../../dist/layout-sidenav-light.html">Q/A</Link>
                              <Link className="nav-link" to="../../../../../dist/layout-sidenav-light.html">REVIEW</Link>
                          </nav>
                      </div>
                      <div className="sb-sidenav-menu-heading">Statistics</div>
                      <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse"
                         data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                          <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                          통계 자료
                          <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                      </Link>
                      <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse"
                         data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                          <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                          로그인 이력
                          <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                      </Link>
                  </div>
              </div>
              <div className="sb-sidenav-footer">
                  <div className="small">GitHub : https://github.com/</div>
              </div>
          </nav>
      </div>
  );
}
export default AdminNavigation;
