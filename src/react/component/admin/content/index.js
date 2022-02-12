import React from 'react';
import AdminDashboardCard from "./dashboardcrad";

const  AdminMain = () => {
    return (
      <div className="container-fluid px-4">
          <h1 className="mt-4">Dashboard</h1>
          <ol className="breadcrumb mb-4">
              <li className="breadcrumb-item active">Dashboard</li>
          </ol>
          <div className="row">
              <AdminDashboardCard title={"공지사항"} bgColor={"card bg-primary text-white mb-4"} detailUrl={"/admin/board/notice"}/>
              <AdminDashboardCard title={"이벤트"} bgColor={"card bg-warning text-white mb-4"} detailUrl={"/admin/board/event"}/>
              <AdminDashboardCard title={"게시판"} bgColor={"card bg-success text-white mb-4"} detailUrl={"/admin/board/freeboard"}/>
              <AdminDashboardCard title={"Q/A"} bgColor={"card bg-danger text-white mb-4"} detailUrl={"/admin/board/qa"}/>
          </div>
          <div className="card-header">
              <i className="fas fa-table me-1"></i>
              Notice
          </div>
          <div className="card-body">
              <table id="datatablesSimple">
                  <thead>
                  <tr>
                      <th>No</th>
                      <th>Title</th>
                      <th>InsertUser</th>
                      <th>InsertDtae</th>
                  </tr>
                  </thead>
                  <tfoot>
                  <tr>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Office</th>
                      <th>Age</th>
                  </tr>
                  </tfoot>
                  <tbody>
                  <tr>
                      <td>1</td>
                      <td>공지사항</td>
                      <td>lgs0503</td>
                      <td>2022-02-06</td>
                  </tr>
                  <tr>
                      <td>1</td>
                      <td>공지사항</td>
                      <td>lgs0503</td>
                      <td>2022-02-06</td>
                  </tr>
                  <tr>
                      <td>1</td>
                      <td>공지사항</td>
                      <td>lgs0503</td>
                      <td>2022-02-06</td>
                  </tr>
                  <tr>
                      <td>1</td>
                      <td>공지사항</td>
                      <td>lgs0503</td>
                      <td>2022-02-06</td>
                  </tr>
                  <tr>
                      <td>1</td>
                      <td>공지사항</td>
                      <td>lgs0503</td>
                      <td>2022-02-06</td>
                  </tr>
                  <tr>
                      <td>1</td>
                      <td>공지사항</td>
                      <td>lgs0503</td>
                      <td>2022-02-06</td>
                  </tr>
                  <tr>
                      <td>1</td>
                      <td>공지사항</td>
                      <td>lgs0503</td>
                      <td>2022-02-06</td>
                  </tr>
                  <tr>
                      <td>1</td>
                      <td>공지사항</td>
                      <td>lgs0503</td>
                      <td>2022-02-06</td>
                  </tr>
                  <tr>
                      <td>1</td>
                      <td>공지사항</td>
                      <td>lgs0503</td>
                      <td>2022-02-06</td>
                  </tr>
                  <tr>
                      <td>1</td>
                      <td>공지사항</td>
                      <td>lgs0503</td>
                      <td>2022-02-06</td>
                  </tr>
                  <tr>
                      <td>1</td>
                      <td>공지사항</td>
                      <td>lgs0503</td>
                      <td>2022-02-06</td>
                  </tr>
                  <tr>
                      <td>1</td>
                      <td>공지사항</td>
                      <td>lgs0503</td>
                      <td>2022-02-06</td>
                  </tr>
                  <tr>
                      <td>1</td>
                      <td>공지사항</td>
                      <td>lgs0503</td>
                      <td>2022-02-06</td>
                  </tr>
                  <tr>
                      <td>1</td>
                      <td>공지사항</td>
                      <td>lgs0503</td>
                      <td>2022-02-06</td>
                  </tr>
                  <tr>
                      <td>1</td>
                      <td>공지사항</td>
                      <td>lgs0503</td>
                      <td>2022-02-06</td>
                  </tr>
                  <tr>
                      <td>1</td>
                      <td>공지사항</td>
                      <td>lgs0503</td>
                      <td>2022-02-06</td>
                  </tr>
                  <tr>
                      <td>1</td>
                      <td>공지사항</td>
                      <td>lgs0503</td>
                      <td>2022-02-06</td>
                  </tr>
                  <tr>
                      <td>1</td>
                      <td>공지사항</td>
                      <td>lgs0503</td>
                      <td>2022-02-06</td>
                  </tr>
                  </tbody>
              </table>
          </div>
      </div>
  );
}

export default AdminMain;
