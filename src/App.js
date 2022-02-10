import './App.css';
import React from "react";
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import AdminLayout from './component/admin/index';
import AdminLogin from './component/admin/login';
import AdminRegister from './component/admin/register';
import Main from './component/client/index';

const App = () =>{
  return (
      <BrowserRouter basename="/spring-showpingmall">
          <Routes>
              <Route path="/"           element={<Main />} />
              <Route path="/admin/*"     element={<AdminLayout />} />
              <Route path="/admin/login"     element={<AdminLogin />} />
              <Route path="/admin/register"     element={<AdminRegister />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
