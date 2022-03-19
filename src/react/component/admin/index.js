import React, {useEffect} from 'react';
import AdminHeader from "./layout/header";
import AdminNavigation from "./layout/navigation";
import AdminFooter from "./layout/footer";
import {Route, Routes} from "react-router-dom";

import AdminMain from "./content";
import AdminCode from "./content/code";
import AdminMenu from "./content/menu";

import "../../css/styles.css";
import * as common from "../../comm/common";
import AdminBoard from "./content/board";
import AdminPost from "./content/post";
import {useDispatch} from "react-redux";
import {showAlertModal} from "../../action/aciton";
import AdminBanner from "./content/banner";
import AdminPopup from "./content/popup";
import AdminMember from "./content/member";

const  AdminLayout = () => {

    const dispatch = useDispatch();

    useEffect( () => {
        if(common.loginUserSessionCheck()){

            dispatch(showAlertModal("세션이 존재하지 않습니다."));
            window.location.href = "/showpingmall/#/admin/login";
        }
    },[]);

  return (
      <div className="sb-nav-fixed">
          <AdminHeader title={"Admin"}/>
          <div id="layoutSidenav">
              <AdminNavigation/>
              <div id="layoutSidenav_content">
                  <main>
                      <Routes>
                          <Route path="/" element={<AdminMain/>}/>
                          <Route path="/code" element={<AdminCode/>}/>
                          <Route path="/menu" element={<AdminMenu/>}/>
                          <Route path="/banner" element={<AdminBanner/>}/>
                          <Route path="/member" element={<AdminMember/>}/>
                          <Route path="/board" element={<AdminBoard/>}/>
                          <Route path="/post" element={<AdminPost/>}/>
                          <Route path="/popup" element={<AdminPopup/>}/>
                          <Route path="/post/:boardType" element={<AdminPost/>}/>
                      </Routes>
                  </main>
                  <AdminFooter/>
              </div>
          </div>
      </div>
  );
}
export default AdminLayout;
