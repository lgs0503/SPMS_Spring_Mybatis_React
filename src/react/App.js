import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, HashRouter} from 'react-router-dom';
import AdminLayout from './component/admin//index';
import AdminLogin from './component/admin/login';
import AdminRegister from './component/admin/register';
import Main from './component/client/index';
import { useSelector } from "react-redux";
import Loading from "./component/common/Loading";
import AlertModal from './component/common/AlertModal';

const App = () =>{

    const alertModal = useSelector(state => state.alertModal);
    const loading = useSelector(state => state.loading);

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
          <AlertModal show={alertModal.show} text={alertModal.text} callback={alertModal.callback} />
          <Loading show={loading.show}/>
      </div>
      /* git Page 에 배포할때는 못씀
      <BrowserRouter basename={process.env.PUBLIC_URL}>
      </BrowserRouter>
      */
    );
}

export default App;
