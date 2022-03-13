import React, {useEffect} from 'react';
import AdminDashboardCard from "./dashboardcrad";
import Table from "../../common/Table";
import * as common from "../../../comm/common";

const  AdminMain = () => {
    useEffect(() => {

    },[]);

    let tableInit = {
        headerColName : ['No','제목','작성자','작성일']
        ,   deleted : false
        ,   colSpan : 4
    }

    return (
      <div className="container-fluid px-4">
          <h1 className="mt-4">Dashboard</h1>
          <ol className="breadcrumb mb-4">
              <li className="breadcrumb-item active">Dashboard</li>
          </ol>
          <div className="row">
              <AdminDashboardCard title={"공지사항"} bgColor={"card bg-primary text-white mb-4"} detailUrl={"/admin/post/1"}/>
              <AdminDashboardCard title={"자유게시판"} bgColor={"card bg-success text-white mb-4"} detailUrl={"/admin/post/2"}/>
              <AdminDashboardCard title={"이벤트"} bgColor={"card bg-warning text-white mb-4"} detailUrl={"/admin/post/3"}/>
              <AdminDashboardCard title={"Q/A"} bgColor={"card bg-danger text-white mb-4"} detailUrl={"/admin/post/4"}/>
          </div>
          <div className="row">
              <div className="col-md-6">
                  <div className="card-header">
                      <i className="fas fa-table me-1"></i>
                      Notice
                  </div>
                  <div className="card-body">
                      {/*<Table tableInit={tableInit}></Table>*/}
                  </div>
              </div>
              <div className="col-md-6">
                  <div className="card-header">
                      <i className="fas fa-table me-1"></i>
                      FreeBoard
                  </div>
                  <div className="card-body">
                      {/*<Table tableInit={tableInit}></Table>*/}
                  </div>
              </div>
          </div>
      </div>
  );
}

export default AdminMain;
