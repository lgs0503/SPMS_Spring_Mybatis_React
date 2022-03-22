/** -------------------------------------------
 *  공통 함수
 * -------------------------------------------*/
export function getServerURL(){
    const href = window.location.href;
    let serverUrl = "";

    if(href.indexOf("localhost") == -1){   /* 운영 */
        serverUrl = "https://3.35.218.236";
    } else {                               /* 로컬 */
        serverUrl = "http://localhost:8080"
    }
    return serverUrl;
}
/**
 * 서버와 ajax 통신
 * @param url : 요청url
 * @param method : 요청method
 * @param data : 요청에필요한데이터값
 * @param callback : 성공결과콜백함수
 * */
export function fetchLoad(url, method, data, callback, fileUpload = false){

    let serverUrl = getServerURL();
    let fetchData = {method : method};

    if(fileUpload){
        fetchData.body = data;
    } else {
        fetchData.body = JSON.stringify(data);
        fetchData.headers = {'content-Type': 'application/json; charset=utf-8'};
    }

    fetch(serverUrl + url, fetchData)
        .then(e => e.json())
        .then(callback)
        .catch(function(error){
            console.log(error);
        });
}

/**
 * Null Check 함수
 * @param data : NULL체크할데이터
 * @return Null아니면TRUENull이면FALSE
 * */
export function nullCheck(data) {
    if (data == null || data == "" || data == "undefined" || data == [] || data == {}){
        return false;
    } else {
        return true;
    }
}
/**
 * 쿠키 저장하기
 * @param cookieName : 쿠키이름
 * @param value : 쿠키값
 * @param exdays : 쿠키저장날짜몇일
 * */
export function setCookie(cookieName, value, exdays) {
    let exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    let cookieValue = escape(value)
        + ((exdays == null) ? "" : "; expires=" + exdate.toGMTString());
    document.cookie = cookieName + "=" + cookieValue;
}
/**
 * 쿠키 삭제
 * @param cookieName : 삭제할쿠키이름
 * */
export function deleteCookie(cookieName) {
    let expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires="
        + expireDate.toGMTString();
}
/**
 * 쿠키 가져오기
 * @param cookieName : 가져올쿠키이름
 * */
export function getCookie(cookieName) {
    cookieName = cookieName + '=';
    let cookieData = document.cookie;
    let start = cookieData.indexOf(cookieName);
    let cookieValue = '';
    if (start != -1) { // 쿠키가 존재하면
        start += cookieName.length;
        let end = cookieData.indexOf(';', start);
        if (end == -1) // 쿠키 값의 마지막 위치 인덱스 번호 설정
            end = cookieData.length;
        cookieValue = cookieData.substring(start, end);
    }
    return unescape(cookieValue);
}
/**
 * 이미지 체인지
 * @param fileId : 파일inputID
 * @param thumId : 섬네일imgID
 * */
export function uploadImgChange(fileId, thumId) {

    let fileInfo = document.getElementById(fileId).files[0];
    let reader = new FileReader();

    if(!valiImageType(fileInfo)) {
        alert("jpeg/png/jpg 파일만 선택 가능합니다.");
        document.getElementById(fileId).value = "";
        document.getElementById(thumId).src = "";
        return;
    }

    reader.onload = function() {
        document.getElementById(thumId).src = reader.result;
    };

    if( fileInfo ) {
        reader.readAsDataURL( fileInfo );
    }
}
/**
 * 이미지 타입 유효성 체크
 * @param image : imageFile
 * @param result : 이미지타입일경우TRUE아닌경우FALSE
 * */
export function valiImageType(image) {
    const result = ([ 'image/jpeg'
        , 'image/png'
        ,  'image/jpg' ].indexOf(image.type) > -1);
    return result;
}
/**
 * 로그인 세션 체크
 * */
export function loginUserSessionCheck(){
    let userId = sessionStorage.getItem("userId");
    if(!userId){
        return true;
    }
}
/**
 * 체크박스 개수 반환
 * @param elName : 체크박스name
 * */
export function tableChkCnt(elName){
    let chk = 0;
    document.getElementsByName(elName).forEach((value, index) => {
        if(value.checked){
            chk ++;
        }
    });
    return chk;
}
/**
 * 체크박스 선택된 ids 반환
 * @param elName : 체크박스name
 * */
export function tableChkIds(elName){
    let data = [];
    document.getElementsByName(elName).forEach((value, index) => {
        if(value.checked){
            data.push(value.parentNode.parentNode.id);
        }
    });
    return data;
}
/**
 * base64 데이터 이미지 사용 하게 변경
 * @param base64str : base64
 * */
export function base64Img(base64str){
    return "data:image/png;base64,"+base64str;
}