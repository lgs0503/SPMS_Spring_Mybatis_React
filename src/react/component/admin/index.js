import React, {useEffect, useState} from 'react';
import AdminHeader from "./layout/header";
import AdminNavigation from "./layout/navigation";
import AdminFooter from "./layout/footer";
import {HashRouter, Route, Routes} from "react-router-dom";

import AdminMain from "./content";
import AdminCode from "./content/code";
import AdminMenu from "./content/menu";

import "../../css/styles.css";
import * as common from "../../comm/common";
import AdminBoard from "./content/board";
import AdminPost from "./content/post";

const  AdminLayout = () => {

    useEffect( () => {
        common.loginUserSessionCheck();
    },[]);


  return (
      <div className="sb-nav-fixed">
          <AdminHeader title={"Admin"}/>
          <div id="layoutSidenav">
              <AdminNavigation/>
              <div id="layoutSidenav_content">
                  <main>
                      <Routes>
                          <Route path="/" element={<AdminMain />} />
                          <Route path="/code" element={<AdminCode />} />
                          <Route path="/menu" element={<AdminMenu />} />
                          <Route path="/board" element={<AdminBoard />} />
                          <Route path="/post" element={<AdminPost />} />
                      </Routes>
                  </main>
                  <AdminFooter/>
              </div>
          </div>
      </div>
  );
}
export default AdminLayout;
