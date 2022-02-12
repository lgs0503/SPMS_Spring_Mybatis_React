import React from 'react';
import {Link} from 'react-router-dom';

const  AdminDashboardCard = (prop) => {
    return (
        <div className="col-xl-3 col-md-6">
            <div className={prop.bgColor}>
                <div className="card-body">{prop.title}</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                    <Link className="small text-white stretched-link" to={prop.detailUrl}>더보기</Link>
                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
  );
}

export default AdminDashboardCard;
