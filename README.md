 # ShowPingMall - Spring

스프링 프레임워크 쇼핑몰 프로젝트

사용자와 관리자로 권한을 나누어

관리자가 관리자 페이지에서 

등록한 물품을 사용자가 구매신청 하는 사이트

***
## 사용 기술
> 
>
> ### Front Stak
> - HTML
> - CSS
> - Javascript
> - React.Js

> ### Back End 
> - Java 1.8
> - Spring 
>   - MVC 
>   - MyBatis
>   - interceptor
>   - DBTranscation
>   - log4j
>   - JsonView
>   - JUnit4
>   - Maven
>   - Security
> - Aws EC2 (WAS/Jenkins, DB)
> - Docker 
> - Oracle 11g (Docker image)
> - Tomcat 
>
***
## 협업 담당
프론트 : 정다은(jde98)
 - HTML CSS Javascript 

백엔드 / 프론트 : 이광석(lgs0503)
- Java DB WebServer React Javascript

***
## 브런치 설명

|  브런치                          |  설명                                   | 
| --------                       | ---------                               | 
|master                           |백엔드 운영 소스, Pull request 후 머지된 데이터를 Jenkins 자동배포 툴을 통해 AWS 백엔드 서버에 자동 배포된다.   |
|development                           |개발용 브런치, development에 개발 소스를 푸쉬 후 Pull Request를 통해 소스 리뷰를 한 뒤 마스터 브런치에 병합한다.   |
|gh-pages                           |프론트엔드 운영 소스, React JS를 빌드한 코드를 깃허브 페이지에 호스팅한다.   |



빌드 명령어
```
npm run deploy
```

***
## 기타 설명
깃헙 협업 개발 ~~및 추후 react.js 스터디 를~~ (React js 적용) 위해 진행된 프로젝트

## 폴더 구조 
***

|  위치                          |  설명                                            | 
| --------                       | ---------                                       | 
|/docs                           |퍼블리싱 프론트 정적 소스(html, css, js) 파일 구성  |
|/docs/html                      |퍼블리싱 사용자 페이지                             |
|/docs/html/admin                |퍼블리싱 관리자 페이지                             |
|/src/react                      |프론트 React 소스 구성                             |
|/src/main/java                  |백엔드 java 파일 구성                              |
|/src/main/resources/mappers     |mybatis mapper xml 파일 구성                      |
|/src/main/resources/properties  |properties 파일 구성                              |
|/src/main/webapp/WEB_INF/spring |spring config xml 파일 구성                       |
|/src/test/java                  |junit test 소스                                   |


***

프론트 사용자 페이지 : https://lgs0503.github.io/spring-showpingmall/

프론트 관리자 페이지 : https://lgs0503.github.io/spring-showpingmall/#/admin/login

백 엔드 서버 : http://3.35.218.236/

젠킨스 서버 : http://3.35.218.236/jenkins/

***
## 참고 자료
젠킨스 자동배포 설정 : https://shlee0882.tistory.com/267

AWS EC2 젠킨스 자동배포 빌드에러 해결 : https://tape22.tistory.com/22

ubuntu docker 설치 : https://shanepark.tistory.com/237

docker oracle11g 설치 : https://romeoh.tistory.com/entry/Oracle-docker%EC%97%90-Oracle-11g-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0

HTTPS ssl 인증서 발급 및 apache , tomcat 설정 : https://jdh5202.tistory.com/772

GitHub Pages SPA 배포시 설정 : https://velog.io/@alvin/Github-Pages%EC%97%90-HashRouter%EB%A1%9C-SPA-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0