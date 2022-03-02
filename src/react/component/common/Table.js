import React, {useState} from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Pagination from "./Pagination";
import '../../css/table.css';
import TableColGroup from "./TableColGroup";

const Table  = (props) => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

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
                    <TableColGroup tableInit={props.tableInit}/>
                    <TableHeader tableInit={props.tableInit}/>
                    <TableBody tableInit={props.tableInit}
                               bodyData={props.bodyData}
                               offset={offset}
                               limit={limit}/>
                </table>
                <div className={"table-bottom"}>
                    <div>총 <strong>{props.bodyCnt}</strong> 건 조회</div>
                    {
                        props.tableInit.pagination == true
                        ?
                        (
                            <label className={"table-bottom-right"}>
                                <p>표시할 수 :</p>
                                <select className={"form-select form-select-sm"}
                                        type="number"
                                        value={limit}
                                        onChange={({ target: { value } }) => setLimit(Number(value))}>
                                    <option value="10">10</option>
                                    <option value="12">15</option>
                                    <option value="20">30</option>
                                    <option value="50">50</option>
                                </select>
                            </label>
                        )
                        : null
                    }
                    {
                        props.tableInit.pagination == true
                        ?
                        <Pagination total={props.bodyCnt}
                                    limit={limit}
                                    page={page}
                                    setPage={setPage}/>
                        : null
                    }
                </div>
            </div>
        </div>
    )
};
export default Table;