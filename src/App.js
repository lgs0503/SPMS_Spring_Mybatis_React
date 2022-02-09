import './App.css';
import React from "react";
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import AdminMain from './component/admin/index';
import AdminRegister from './component/admin/register';
import AdminLogin from './component/admin/login';

const App = () =>{
  return (
      <BrowserRouter basename="/spring-showpingmall">
          <Routes>
              <Route path="/"           element={<AdminMain />} />
              <Route path="register"   element={<AdminRegister />} />
              <Route path="login"      element={<AdminLogin />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
