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
function fetchLoad(url, method, data, callback){
    const serverUrl = "http://3.35.218.236";

    fetch(serverUrl + url, {
        method : method,
        headers : { 'content-Type': 'application/json; charset=utf-8' },
        body : JSON.stringify(data)
    }).then(e => e.json()).then(callback
    ).catch(function(error){
        console.log(error);
    });
}