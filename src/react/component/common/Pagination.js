import React from "react";
import '../../css/pagination.css';

function Pagination({ total, limit, page, setPage }) {
    const numPages = Math.ceil(total / limit);

    return (
        <nav className={"pagination"}>
            <button className={"pagination-btn"} onClick={() => setPage(page - 1)} disabled={page === 1}>
                <i className="fa-solid fa-caret-left"></i>
            </button>
            {
                Array(numPages).fill().map((_, i) => (
                    <button className={"pagination-btn"} key={i + 1}
                            onClick={() => setPage(i + 1)}
                            aria-current={page === i + 1 ? "page" : null}>
                        {i + 1}
                    </button>
                ))
            }
            <button className={"pagination-btn"} onClick={() => setPage(page + 1)} disabled={page === numPages}>
                <i className="fa-solid fa-caret-right"></i>
            </button>
        </nav>
    );
}

export default Pagination;