import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import * as common from "../../../comm/common";
import {showAlertModal} from "../../../action/alertModal";
import Table from "../../common/Table";
import Modal from "../../common/Modal";
import Select from "../../common/Select";

const  AdminMenu = () => {
    const dispatch = useDispatch();

    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [modalOpen, setModalOpen] = useState(false);

    const [bodyData, setBodyData] = useState(null);
    const [bodyCnt, setBodyCnt] = useState(0);

    const pageTitle = "메뉴";
    const [modalTitle, setModalTitle] = useState(pageTitle + " 등록");
    const [overLab, setOverLab] = useState(false);

    useEffect(() => {
        //menuSearch();
    },[]);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const addBtnClickEvent = (e) => {

        setModalTitle(pageTitle + " 등록");
        openModal();

        const target = e.target;

        setTimeout(()=>{

            if(target.nodeName == "BUTTON"){
                document.getElementById("upperMenuIdPopup").value = target.parentNode.parentNode.id;
            } else if(target.nodeName == "I") {
                //console.log(e.target.parentNode.parentNode.parentNode.id);
                document.getElementById("upperMenuIdPopup").value = target.parentNode.parentNode.parentNode.id;
            }
        },100);

    }

    let tableInit = {
        headerColData : [{title: "ID",         name : "menuId",       width:"40%",  hidden: false,  useData : true}
            ,{title: "메뉴명",      name : "menuName",    width:"30%",   hidden: false,  useData : true}
            ,{title: "사용여부",    name : "useYnName",   width:"20%",   hidden: false}
            ,{title: "추가",      name : "button",  width:"10%",  hidden: false,  btnValue:<i className="fa-solid fa-plus"></i>,  clickEvent: addBtnClickEvent}
            ,{title: "부모메뉴명",  name : "upperMenuId",  width:"0",   hidden: true,  useData : true}
            ,{title: "메뉴값",      name : "menuValue",   width:"0",   hidden: true,  useData : true}
            ,{title: "사용여부",    name : "useYn",       width:"20%",   hidden: true,  useData : true}]
        ,   title : "Menu List"
        ,   selectCol : 'menuId'
        ,   deleted : true
        ,   colSpan : 5
        ,   cellSelectEvent : (e) => {

            setModalTitle(pageTitle+" 상세");
            openModal();

            let data = {
                menuId : e.target.parentNode.id
            };

            common.fetchLoad("/searchMenu","POST", data,(result) => {

                //console.log(result.data.menu);

                setTimeout(() => {

                    tableInit.headerColData.forEach((value, index) => {
                        if(value.useData === true){
                            document.getElementById(value.name + "Popup").value = result.data.menu[value.name];
                        }
                    });
                },200);

                document.getElementById("menuIdPopup").disabled = "disabled";
            });
        }
        , deleteBtnClickEvent :() => {
            if(window.confirm("삭제하시겠습니까?")){

                if(common.tableChkCnt("chk") == 0){
                    dispatch(showAlertModal('항목을 선택해주세요.'));
                    return;
                } else {
                    let data = {menuIds : []};
                    let delChk = true;

                    data.menuIds = common.tableChkIds("chk");

                    bodyData.forEach((value, index)=>{

                        data.menuIds.forEach((delVal, delIndex)=> {

                            //console.log("delVal:"+delVal +"|menuId"+ value.menuId+"|leaf" +value.leaf);
                            if(delVal == value.menuId && value.leaf == "0"){
                                delChk = false;
                                dispatch(showAlertModal('하위항목을 삭제 해주시기 바랍니다.'));
                                return;
                            }
                        });
                    })

                    if(delChk){
                        common.fetchLoad("/deleteMenu","POST", data, () => {
                            dispatch(showAlertModal('삭제 되었습니다.'));
                            menuSearch();
                        });
                    }
                }
            }
        }
    }

    const menuSearch = () => {

        let data = {
            menuId     : document.getElementById("menuId").value
            ,   menuName   : document.getElementById("menuName").value
            ,   useYn       : document.getElementById("useYn").value
        };

        common.fetchLoad("/menuList","POST", data,(result) => {
            //console.log(result.data.menuList);
            //console.log(result.data.menuCnt);
            setBodyData(result.data.menuList);
            setBodyCnt(result.data.menuCnt);
        });
    }

    const menuSave = () => {
        if(window.confirm("저장하시겠습니까?")){
            if(overLab){
                dispatch(showAlertModal('중복된 메뉴가 존재합니다.'));
                return;
            }

            let data = {};
            tableInit.headerColData.forEach((value, index) => {
                if(value.useData)
                    data[value.name] =  document.getElementById(value.name + "Popup").value;
            });

            common.fetchLoad("/saveMenu","POST", data, (result) => {
                dispatch(showAlertModal('저장 되었습니다.'));
                closeModal();
                menuSearch();
            });
        }
    }

    const menuOverlapChk = (e) => {

        let data = {
            menuId : e.target.value
        };

        common.fetchLoad("/searchMenu","POST", data,(result) => {
            //console.log(result.data.menu);
            if(result.data.menu){
                document.getElementById("idCheck").innerText = "중복된 메뉴가 존재합니다.";
                document.getElementById("idCheck").style.color = "red";
                setOverLab(true);
            } else {
                document.getElementById("idCheck").innerText = "메뉴";
                document.getElementById("idCheck").style.color = "black";
                setOverLab(false);
            }

        });
    }

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">MENU</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">{pageTitle} 관리</li>
            </ol>
            <div className="row py-2">
                <div className="col-md-3 my-2">
                    <input type="text" className="form-control search-slt" placeholder="메뉴 ID" id="menuId"/>
                </div>
                <div className="col-md-3 my-2">
                    <input type="text" className="form-control search-slt" placeholder="메뉴 명" id="menuName"/>
                </div>
                <div className="col-md-2 my-2">
                    <Select upperCodeId={"U001"}
                            codeId={"useYn"}
                            codeClassName={"form-select search-slt"}
                            text={"사용여부"}/>
                </div>
                <div className="col-md-2 my-2">
                    <button type="button" className="btn btn-primary wrn-btn" onClick={menuSearch}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
            </div>

            <Table tableInit={tableInit}
                   bodyData={bodyData}
                   bodyCnt={bodyCnt}/>

            <Modal open={modalOpen} close={closeModal} header={modalTitle}>
                <form id="formTest">
                    <div className="form-floating mb-3">
                        <input className="form-control" type="text" maxLength="20" id="menuIdPopup" onChange={menuOverlapChk}/>
                        <label htmlFor="userId" id="idCheck">메뉴</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" type="text" maxLength="20" id="menuNamePopup"/>
                        <label>메뉴 명</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" type="text" maxLength="20" id="upperMenuIdPopup" disabled={"disabled"}/>
                        <label>부모 메뉴</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" type="text" maxLength="20" id="menuValuePopup"/>
                        <label>메뉴 값</label>
                    </div>
                    <div className="form-floating mb-3">
                        <Select upperCodeId={"U001"}
                                menuId={"useYnPopup"}
                                menuClassName={"form-select"}
                                chkVal={"Y"}/>
                        <label>사용여부</label>
                    </div>
                    <div className="mt-4 mb-0">
                        <div className="d-grid">
                            <a className="btn btn-primary btn-block" id="btnRegister" onClick={menuSave}>저장</a>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default AdminMenu;
