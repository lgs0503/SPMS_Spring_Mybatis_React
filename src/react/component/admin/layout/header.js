import React from 'react';
import {Link} from 'react-router-dom';

const AdminHeader = (prop) => {

    const sidebarToggleClick = (event) =>{
        // Toggle the side navigation
        const sidebarToggle = document.getElementById("sidebarToggle");

        if (sidebarToggle) {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        }
    }

    const userInfoBtnClick = () => {
        let dropDisplay = document.getElementById("userInfoDropDown").style.display;
        if(dropDisplay == "none" || dropDisplay == ""){
            document.getElementById("userInfoDropDown").style.display = "block";
        } else {
            document.getElementById("userInfoDropDown").style.display = "none";
        }

    }

    const logout = () => {
        sessionStorage.removeItem("userId");
        window.location.href="/spring-showpingmall/#/admin/login";
    }

  return (
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
          <Link className="navbar-brand ps-3" to="/admin">{prop.title}</Link>
          <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!" onClick={sidebarToggleClick}>
              <i className="fas fa-bars"></i></button>
          <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
          </form>
          <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
              <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" to="#" onClick={userInfoBtnClick}>
                      <i className="fas fa-user fa-fw"></i>
                  </Link>
                  <ul id="userInfoDropDown" className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown" style={{"right" : "0px"}} >
                      <li>
                          <Link className="dropdown-item" to="#">MyPage</Link>
                      </li>
                      <li>
                          <hr className="dropdown-divider"/>
                      </li>
                      <li>
                          <span className="dropdown-item" onClick={logout}>Logout</span>
                      </li>
                  </ul>
              </li>
          </ul>
      </nav>
  );
}
export default AdminHeader;
