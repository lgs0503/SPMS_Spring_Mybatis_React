import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table  = (props) => {
    return(
        <div className="card mb-4">
            <div className="card-header">
                <i className="fas fa-table me-1"></i>
                {props.tableInit.title}
                {props.tableInit.deleted
                    ?
                    (
                        <button type="button" className="btn btn-primary wrn-btn float-end btn-sm" onClick={props.tableInit.deleteBtnClickEvent}>
                            <i className="fa-solid fa-minus"></i>
                        </button>
                    )
                    :
                    null
                }
                {props.tableInit.inserted
                    ?
                    (
                        <button type="button" className="btn btn-primary wrn-btn float-end mx-1 btn-sm" onClick={props.tableInit.addBtnClickEvent}>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    )
                    :
                    null
                }
            </div>
            <div className="card-body">
                <table className="table">
                    <TableHeader tableInit={props.tableInit}/>
                    <TableBody tableInit={props.tableInit}
                               bodyData={props.bodyData}/>
                </table>
                <div className="float-start mx-1" >
                    총 <strong>{props.bodyCnt}</strong> 건 조회
                </div>
            </div>
        </div>
    )
};
export default Table;