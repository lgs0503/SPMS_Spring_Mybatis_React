import React, {useEffect, useState} from 'react';
import BoardCard from "./boardCard";
import Table from "../../common/Table";
import * as common from "../../../comm/common";

const  AdminMain = () => {

    const [bodyNoticeData, setBodyNoticeData] = useState(null);
    const [bodyFreeBoardData, setBodyFreeBoardData] = useState(null);


    let headerColData = [{title: "ID",         name : "postId",             width:"10px",  hidden: false, useData : true}
                        ,{title: "게시글제목",    name : "postTitle",        width:"50%",   hidden: false, useData : true}
                        ,{title: "작성자",    name : "createUser",           width:"30%",   hidden: false, useData : false}
                        ,{title: "작성일",    name : "createDate",           width:"25%",   hidden: false, useData : false}];

    let tableInitNotice = {
        headerColData : headerColData
        ,   selectCol : 'postId'
        ,   counted : false
        ,   title : 'Notice List'
        ,   maxData : 5
        ,   colSpan : 4
        ,   cellSelectEvent : (e) => {
        }
    };

    let tableInitFreeBoard = {
        headerColData : headerColData
        ,   selectCol : 'postId'
        ,   counted : false
        ,   title : 'FreeBoard List'
        ,   maxData : 5
        ,   colSpan : 4
        ,   cellSelectEvent : (e) => {
        }
    }

    useEffect(() => {
        postSearch();
    },[]);

    const postSearch = () => {

        const callBack = [
            (result)=> {
                setBodyNoticeData(result.data.postList);
            },
            (result)=> {
                setBodyFreeBoardData(result.data.postList);
            }
        ]

        let data = [{boardId    : "1"},{boardId    : "2"}];

        data.forEach((value, index)=>{
            common.fetchLoad("/postList","POST", value, callBack[index]);
        })
    }

    return (
      <div className="container-fluid px-4">
          <h1 className="mt-4">Dashboard</h1>
          <ol className="breadcrumb mb-4">
              <li className="breadcrumb-item active">Dashboard</li>
          </ol>
          <div className="row">
              <BoardCard title={"공지사항"} bgColor={"card bg-primary text-white mb-4"} detailUrl={"/admin/post/1"}/>
              <BoardCard title={"자유게시판"} bgColor={"card bg-success text-white mb-4"} detailUrl={"/admin/post/2"}/>
              <BoardCard title={"이벤트"} bgColor={"card bg-warning text-white mb-4"} detailUrl={"/admin/post/3"}/>
              <BoardCard title={"Q/A"} bgColor={"card bg-danger text-white mb-4"} detailUrl={"/admin/post/4"}/>
          </div>
          <div className="row">
              <div className="col-md-6">
                  <Table tableInit={tableInitNotice}
                         bodyData={bodyNoticeData}/>
              </div>
              <div className="col-md-6">
                  <Table tableInit={tableInitFreeBoard}
                         bodyData={bodyFreeBoardData}/>
              </div>
          </div>
      </div>
  );
}

export default AdminMain;
