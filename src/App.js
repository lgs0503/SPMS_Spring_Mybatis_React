import './App.css';
import React from "react";
import {Routes, Route, BrowserRouter, HashRouter} from 'react-router-dom';
import AdminLayout from './component/admin/index';
import AdminLogin from './component/admin/login';
import AdminRegister from './component/admin/register';
import Main from './component/client/index';

const App = () =>{
  return (

      <HashRouter>
          <Routes>
              <Route path="/"                   element={<Main />} />
              <Route path="/admin/*"            element={<AdminLayout />} />
              <Route path="/admin/login"        element={<AdminLogin />} />
              <Route path="/admin/register"     element={<AdminRegister />} />
          </Routes>
      </HashRouter>

      /* git Page 에 배포할때는 못씀 
      <BrowserRouter basename={process.env.PUBLIC_URL}>
      </BrowserRouter>
      */
  );
}

export default App;
