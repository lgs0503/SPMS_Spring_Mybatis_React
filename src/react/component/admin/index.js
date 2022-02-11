import React from 'react';
import AdminHeader from "./layout/header";
import AdminNavigation from "./layout/navigation";
import AdminFooter from "./layout/footer";
import {Route, Routes} from "react-router-dom";

import AdminMain from "./content";
import AdminCode from "./content/code";

import "../../css/styles.css";

const  AdminLayout = () => {
  return (
      <div className="sb-nav-fixed">
          <AdminHeader/>
          <div id="layoutSidenav">
              <AdminNavigation/>
              <div id="layoutSidenav_content">
                  <main>
                      <Routes>
                          <Route path="/" element={<AdminMain />} />
                          <Route path="/code" element={<AdminCode />} />
                      </Routes>
                  </main>
                  <AdminFooter/>
              </div>
          </div>
      </div>
  );
}
export default AdminLayout;
