/** -------------------------------------------
*  공통 함수
* -------------------------------------------*/

/**
* 서버와 ajax 통신
* @param url : 요청url
* @param method : 요청method
* @param data : 요청에필요한데이터값
* @param callback : 성공결과콜백함수
* */
function fetchLoad(url, method, data, callback, fileUpload = false){
    const serverUrl = "https://3.35.218.236";
    //const serverUrl = "http://localhost:8080";

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
function nullCheck(data) {
    if (data == null || data == "" || data == "undefined"){
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
function setCookie(cookieName, value, exdays) {
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
function deleteCookie(cookieName) {
    let expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires="
        + expireDate.toGMTString();
}
/**
 * 쿠키 가져오기
 * @param cookieName : 가져올쿠키이름
 * */
function getCookie(cookieName) {
    cookieName = cookieName + '=';
    let cookieData = document.cookie;
    let start = cookieData.indexOf(cookieName);
    let cookieValue = '';
    if (start != -1) { // 쿠키가 존재하면
        start += cookieName.length;
        let end = cookieData.indexOf(';', start);
        if (end == -1) // 쿠키 값의 마지막 위치 인덱스 번호 설정
            end = cookieData.length;
        console.log("end위치  : " + end);
        cookieValue = cookieData.substring(start, end);
    }
    return unescape(cookieValue);
}

function uploadImgPreview(e) {

    let fileInfo = document.getElementById("imageFile").files[0];
    let reader = new FileReader();

    reader.onload = function() {
        document.getElementById("thumbnailImg").src = reader.result;
        document.getElementById("thumbnailUrl").innerText = reader.result;
    };

    if( fileInfo ) {
        reader.readAsDataURL( fileInfo );
    }
}