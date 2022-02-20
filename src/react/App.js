import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, HashRouter} from 'react-router-dom';
import AdminLayout from './component/admin//index';
import AdminLogin from './component/admin/login';
import AdminRegister from './component/admin/register';
import Main from './component/client/index';
import AlertModal from './component/common/AlertModal';
import { useSelector } from "react-redux";

const App = () =>{

    const alertModal = useSelector(state => state.alertModal);

    return (
      <div>
          <HashRouter>
              <Routes>
                  <Route path="/"                   element={<Main />} />
                  <Route path="/admin/*"            element={<AdminLayout />} />
                  <Route path="/admin/login"        element={<AdminLogin />} />
                  <Route path="/admin/register"     element={<AdminRegister />} />
              </Routes>
          </HashRouter>
          <AlertModal text={alertModal.text} show={alertModal.show} callback={alertModal.callback} />
      </div>
      /* git Page 에 배포할때는 못씀
      <BrowserRouter basename={process.env.PUBLIC_URL}>
      </BrowserRouter>
      */
    );
}

export default App;
