import React from 'react';

const  AdminMain = () => {
    return (
      <div className="container-fluid px-4">
          <h1 className="mt-4">Dashboard</h1>
          <ol className="breadcrumb mb-4">
              <li className="breadcrumb-item active">Dashboard</li>
          </ol>
          <div className="row">
              <div className="col-xl-3 col-md-6">
                  <div className="card bg-primary text-white mb-4">
                      <div className="card-body">공지사항</div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                          <a className="small text-white stretched-link" href="#">View Details</a>
                          <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                      </div>
                  </div>
              </div>
              <div className="col-xl-3 col-md-6">
                  <div className="card bg-warning text-white mb-4">
                      <div className="card-body">이벤트</div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                          <a className="small text-white stretched-link" href="#">View Details</a>
                          <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                      </div>
                  </div>
              </div>
              <div className="col-xl-3 col-md-6">
                  <div className="card bg-success text-white mb-4">
                      <div className="card-body">게시판</div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                          <a className="small text-white stretched-link" href="#">View Details</a>
                          <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                      </div>
                  </div>
              </div>
              <div className="col-xl-3 col-md-6">
                  <div className="card bg-danger text-white mb-4">
                      <div className="card-body">Q/A</div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                          <a className="small text-white stretched-link" href="#">View Details</a>
                          <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                      </div>
                  </div>
              </div>
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
