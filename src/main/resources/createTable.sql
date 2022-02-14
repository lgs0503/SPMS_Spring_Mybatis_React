-- 제품 테이블
CREATE table PRODUCT
 (
    IDX VARCHAR2(20) not null,
    PRODUCT_NAME VARCHAR2(50),
    PRODUCT_PRICE int,
    PRODUCT_CNT int,
    PRODUCT_DESCRIPTION VARCHAR2(2000),
    PRODUCT_IMAGE_NO VARCHAR2(20),
    PRODUCT_CLASS1 VARCHAR2(20),
    PRODUCT_CLASS2 VARCHAR2(20),
    DELETED VARCHAR2(20),
    USE_YN VARCHAR2(10),
    CREATE_DATE DATE,
    UPDATE_DATE DATE,
    CREATE_USER VARCHAR2(20),
    UPDATE_USER VARCHAR2(20)
 );

comment on table PRODUCT is '제품';
comment on column PRODUCT.IDX is '일련번호';
comment on column PRODUCT.PRODUCT_NAME is '제품명';
comment on column PRODUCT.PRODUCT_PRICE is '제품가격';
comment on column PRODUCT.PRODUCT_CNT is '제품수량';
comment on column PRODUCT.PRODUCT_DESCRIPTION is '제품설명';
comment on column PRODUCT.PRODUCT_IMAGE_NO is '제품 섬네일 파일번호';
comment on column PRODUCT.PRODUCT_CLASS1 is '대분류';
comment on column PRODUCT.PRODUCT_CLASS2 is '소분류';
comment on column PRODUCT.DELETED is '삭제여부';
comment on column PRODUCT.USE_YN is '사용여부';
comment on column PRODUCT.CREATE_DATE is '생성일';
comment on column PRODUCT.UPDATE_DATE is '수정일';
comment on column PRODUCT.CREATE_USER is '생성자';
comment on column PRODUCT.UPDATE_USER is '수정자';
create unique index PRODUCT_IDX_uindex
    on PRODUCT (IDX);
alter table PRODUCT
    add constraint PRODUCT_pk
        primary key (IDX);

-- 유저 테이블
CREATE TABLE "USER_INFO"
(
    USER_ID VARCHAR2(20),
    PASSWORD VARCHAR2(500),
    USER_NAME VARCHAR2(20),
    AGE INT,
    GENDER VARCHAR2(20),
    EMAIL VARCHAR2(20),
    LOCATION VARCHAR2(20),
    LOCATION_DTL VARCHAR2(20),
    IMAGE_FILE_NO VARCHAR2(500),
    USER_URLE VARCHAR2(500),
    DELETED VARCHAR2(20),
    CREATE_USER VARCHAR2(20),
    CREATE_DATE DATE,
    UPDATE_USER VARCHAR2(20),
    UPDATE_DATE DATE,
    PHONE_NUM VARCHAR2(50)
);
comment on table USER_INFO is '사용자';
comment on column USER_INFO.USER_ID is '계정';
comment on column USER_INFO.PASSWORD is '비밀번호';
comment on column USER_INFO.USER_NAME is '성명';
comment on column USER_INFO.AGE is '나이';
comment on column USER_INFO.GENDER is '성별';
comment on column USER_INFO.EMAIL is '이메일';
comment on column USER_INFO.LOCATION is '주소';
comment on column USER_INFO.LOCATION_DTL is '주소 상세';
comment on column USER_INFO.IMAGE_FILE_NO is '프로필 사진';
comment on column USER_INFO.DELETED is '삭제여부';
comment on column USER_INFO.CREATE_DATE is '생성일';
comment on column USER_INFO.UPDATE_DATE is '수정일';
comment on column USER_INFO.CREATE_USER is '생성자';
comment on column USER_INFO.UPDATE_USER is '수정자';
comment on column USER_INFO.PHONE_NUM is '연락처';
create unique index USER_IDX_uindex
    on USER_INFO (USER_ID);
alter table USER_INFO
    add constraint USER_pk
        primary key (USER_ID);

-- 구매신청 테이블


-- 공통코드 테이블
CREATE TABLE "CODE"
(
    CODE_ID VARCHAR2(20),
    CODE_NAME VARCHAR2(500),
    UPPER_CODE_ID VARCHAR2(20),
    CODE_VALUE VARCHAR2(50),
    USE_YN VARCHAR2(20),
    DELETED VARCHAR2(20),
    CODE_INFO VARCHAR2(500),
    CREATE_USER VARCHAR2(20),
    CREATE_DATE DATE,
    UPDATE_USER VARCHAR2(20),
    UPDATE_DATE DATE
);
comment on table "CODE" is '공통코드';
comment on column "CODE".CODE_ID is '공통코드 일련번호';
comment on column "CODE".CODE_NAME is '공통코드 명칭';
comment on column "CODE".UPPER_CODE_ID is '공통코드 부모 일련번호';
comment on column "CODE".CODE_VALUE is '공통코드 값';
comment on column "CODE".USE_YN is '사용여부';
comment on column "CODE".DELETED is '삭제여부';
comment on column "CODE".CREATE_USER is '생성자';
comment on column "CODE".CREATE_DATE is '생성일';
comment on column "CODE".UPDATE_USER is '수정자';
comment on column "CODE".UPDATE_DATE is '수정일';

create unique index CODE_IDX_uindex
    on CODE (CODE_ID);

alter table CODE
    add constraint CODE_pk
        primary key (CODE_ID);


-- 파일 테이블
CREATE TABLE "FILE_INFO"
(
	FILE_NO VARCHAR2(20),
	FILE_PATH VARCHAR2(500),
	FILE_NAME VARCHAR2(100),
	FILE_PHYSICAL_NAME VARCHAR2(100),
	FILE_EXTEN VARCHAR2(20),
	FILE_SIZE VARCHAR2(50),
	USE_YN VARCHAR2(20),
	DELETED VARCHAR2(20),
	CREATE_USER VARCHAR2(20),
	CREATE_DATE DATE,
	UPDATE_USER VARCHAR2(20),
	UPDATE_DATE DATE
);

comment on table "FILE_INFO" is '파일';
comment on column "FILE_INFO".FILE_NO is '파일 일련번호';
comment on column "FILE_INFO".FILE_PATH is '파일 경로';
comment on column "FILE_INFO".FILE_NAME is '파일 명';
comment on column "FILE_INFO".FILE_PHYSICAL_NAME is '파일 물리명(중복방지)';
comment on column "FILE_INFO".FILE_EXTEN is '파일 확장자';
comment on column "FILE_INFO".FILE_SIZE is '파일 사이즈';
comment on column "FILE_INFO".USE_YN is '사용여부';
comment on column "FILE_INFO".DELETED is '삭제여부';
comment on column "FILE_INFO".CREATE_USER is '생성자';
comment on column "FILE_INFO".CREATE_DATE is '생성일';
comment on column "FILE_INFO".UPDATE_USER is '수정자';
comment on column "FILE_INFO".UPDATE_DATE is '수정일';

create unique index FILE_IDX_uindex
    on FILE_INFO (FILE_NO);

alter table FILE_INFO
    add constraint FILE_pk
        primary key (FILE_NO);

-- 게시판 테이블
CREATE TABLE BOARD
(
    BOARD_ID VARCHAR2(20),
    BOARD_NAME VARCHAR2(50),
    BOARD_TYPE VARCHAR2(10),
    BOARD_DESCRIPTION VARCHAR2(50),
    USE_YN VARCHAR2(10),
    FILE_YN VARCHAR2(10),
    CREATE_DATE DATE,
    CREATE_USER VARCHAR2(20),
    UPDATE_DATE DATE,
    UPDATE_USER VARCHAR2(20)
);

comment on table BOARD is '게시판';
comment on column BOARD.BOARD_ID is '게시판 일련번호';
comment on column BOARD.BOARD_NAME is '게시판 이름';
comment on column BOARD.BOARD_TYPE is '게시판 타입 [ 게시판 / 사진게시판 / 커스텀]';
comment on column BOARD.BOARD_DESCRIPTION is '게시판 설명';
comment on column BOARD.USE_YN is '사용여부';
comment on column BOARD.FILE_YN is '파일 사용여부';
comment on column BOARD.CREATE_DATE is '등록일';
comment on column BOARD.CREATE_USER is '등록자';
comment on column BOARD.UPDATE_DATE is '수정일';
comment on column BOARD.UPDATE_USER is '수정자';

create unique index BOARD_ID_uindex
    on BOARD (BOARD_ID);

alter table BOARD
    add constraint BOARD_pk
        primary key (BOARD_ID);


-- 게시글 테이블
CREATE TABLE POST
(
    BOARD_ID VARCHAR2(20),
    POST_ID VARCHAR2(20),
    POST_TYPE VARCHAR2(10),
    POST_TITLE VARCHAR2(50),
    POST_CONTENT CLOB,
    VIEW_CNT VARCHAR2(10),
    DELETED VARCHAR2(10),
    FILE_NO1 VARCHAR2(20),
    FILE_NO2 VARCHAR2(20),
    CREATE_DATE DATE,
    CREATE_USER VARCHAR2(20),
    UPDATE_DATE DATE,
    UPDATE_USER VARCHAR2(20)
);

comment on table POST is '게시글';
comment on column POST.BOARD_ID is '게시판 일련번호';
comment on column POST.POST_ID is '게시글 일련번호';
comment on column POST.POST_TYPE is '게시글 타입 [공지/일반]';
comment on column POST.POST_TITLE is '게시글 제목';
comment on column POST.POST_CONTENT is '게시글 컨텐츠';
comment on column POST.VIEW_CNT is '게시글 view count';
comment on column POST.DELETED is '삭제여부';
comment on column POST.FILE_NO1 is '파일번호1';
comment on column POST.FILE_NO2 is '파일번호2';
comment on column POST.CREATE_DATE is '등록일';
comment on column POST.CREATE_USER is '등록자';
comment on column POST.UPDATE_DATE is '수정일';
comment on column POST.UPDATE_USER is '수정자';

create unique index POST_ID_uindex
    on POST (POST_ID);

alter table POST
    add constraint POST_pk
        primary key (POST_ID);



-- 댓글 테이블
CREATE TABLE COMMENT
(
    POST_ID VARCHAR2(20),
    COMMENT_ID VARCHAR2(20),
    COMMENT_UPPER_ID VARCHAR2(20),
    COMMENT_TITLE VARCHAR2(50),
    COMMENT_TEXT VARCHAR2(4000),
    DELETED VARCHAR2(10),
    CREATE_DATE DATE,
    CREATE_USER VARCHAR2(20),
    UPDATE_DATE DATE,
    UPDATE_USER VARCHAR2(20)
);

comment on table COMMENT is '댓글';
comment on column COMMENT.POST_ID is '게시글 일련번호';
comment on column COMMENT.COMMENT_ID is '댓글 일련번호';
comment on column COMMENT.COMMENT_UPPER_ID is '부모 댓글 일련번호';
comment on column COMMENT.COMMENT_TITLE is '댓글 제목';
comment on column COMMENT.COMMENT_TEXT is '댓글 내용';
comment on column COMMENT.DELETED is '삭제여부';
comment on column COMMENT.CREATE_DATE is '등록일';
comment on column COMMENT.CREATE_USER is '등록자';
comment on column COMMENT.UPDATE_DATE is '수정일';
comment on column COMMENT.UPDATE_USER is '수정자';

create unique index COMMENT_ID_uindex
    on POST (COMMENT_ID);

alter table COMMENT
    add constraint COMMENT_pk
        primary key (COMMENT_ID);

-- 제품구매 테이블
CREATE TABLE PRODUCT_BUY
(
    PRODUCT_ID VARCHAR2(20),
    BUY_ID VARCHAR2(20),
    BUY_USER_ID VARCHAR2(20),
    BUY_STATUS VARCHAR2(20),
    BUY_CNT int,
    CREATE_DATE DATE,
    CREATE_USER VARCHAR2(20),
    UPDATE_DATE DATE,
    UPDATE_USER VARCHAR2(20)
);

comment on table PRODUCT_BUY is '제품구매 테이블';
comment on column PRODUCT_BUY.PRODUCT_ID is '제품 일련번호';
comment on column PRODUCT_BUY.BUY_ID is '제품구매 일련번호';
comment on column PRODUCT_BUY.BUY_USER_ID is '제품구매 유저아이디';
comment on column PRODUCT_BUY.BUY_STATUS is '제품구매 상태 [구매완료 배송준비중 배송중 배송완료 구매취소]';
comment on column PRODUCT_BUY.BUY_CNT is '제품구매 갯수';
comment on column PRODUCT_BUY.CREATE_DATE is '등록일';
comment on column PRODUCT_BUY.CREATE_USER is '등록자';
comment on column PRODUCT_BUY.UPDATE_DATE is '수정일';
comment on column PRODUCT_BUY.UPDATE_USER is '수정자';

create unique index PRODUCT_BUY_uindex
    on POST (BUY_ID);

alter table PRODUCT_BUY
    add constraint PRODUCT_BUY_pk
        primary key (BUY_ID);


-- 제품 문의
CREATE TABLE PRODUCT_QA
(
    PRODUCT_ID VARCHAR2(20),
    QA_ID VARCHAR2(20),
    QA_UPPER_ID  VARCHAR2(20),
    QA_STATUS  VARCHAR2(20),
    QA_TITLE VARCHAR2(50),
    QA_TEXT VARCHAR2(4000),
    CREATE_DATE DATE,
    CREATE_USER VARCHAR2(20),
    UPDATE_DATE DATE,
    UPDATE_USER VARCHAR2(20)
);

comment on table PRODUCT_QA is '제품 문의 테이블';
comment on column PRODUCT_QA.PRODUCT_ID is '제품 일련번호';
comment on column PRODUCT_QA.QA_ID is '제품 문의 일련번호';
comment on column PRODUCT_QA.QA_UPPER_ID  is '제품 문의 부모 일련번호';
comment on column PRODUCT_QA.QA_STATUS  is '제품 문의 상태 [답변 , 미답변]';
comment on column PRODUCT_QA.QA_TITLE is '제품문의 제목';
comment on column PRODUCT_QA.QA_TEXT is '제품문의 내용';
comment on column PRODUCT_QA.CREATE_DATE is '등록일';
comment on column PRODUCT_QA.CREATE_USER is '등록자';
comment on column PRODUCT_QA.UPDATE_DATE is '수정일';
comment on column PRODUCT_QA.UPDATE_USER is '수정자';

create unique index PRODUCT_QA_uindex
    on POST (QA_ID);

alter table PRODUCT_QA
    add constraint PRODUCT_QA_pk
        primary key (QA_ID);

-- 배너
CREATE TABLE BANNER
(
    BANNER_ID VARCHAR2(20),
    BANNER_TITLE VARCHAR2(50),
    BANNER_STATUS VARCHAR2(20),
    BANNER_CONTENT CLOB,
    BANNER_IMAGE_NO VARCHAR2(50),
    USE_YN VARCHAR2(4000),
    CREATE_DATE DATE,
    CREATE_USER VARCHAR2(20),
    UPDATE_DATE DATE,
    UPDATE_USER VARCHAR2(20)
);

comment on table BANNER is '배너 테이블';
comment on column BANNER.BANNER_ID is '배너 일련번호';
comment on column BANNER.BANNER_TITLE is '배너 제목';
comment on column BANNER.BANNER_STATUS  is '배너 상태 [Html / Image]';
comment on column BANNER.BANNER_CONTENT  is '배너 컨텐츠내용 [HTML]';
comment on column BANNER.BANNER_IMAGE_NO is '이미지 번호 [IMAGE]';
comment on column BANNER.USE_YN is '사용여부';
comment on column BANNER.CREATE_DATE is '등록일';
comment on column BANNER.CREATE_USER is '등록자';
comment on column BANNER.UPDATE_DATE is '수정일';
comment on column BANNER.UPDATE_USER is '수정자';

create unique index BANNER_uindex
    on POST (BANNER_ID);

alter table BANNER
    add constraint BANNER_pk
        primary key (BANNER_ID);



-- 팝업
CREATE TABLE POPUP
(
    POPUP_ID VARCHAR2(20),
    POPUP_TITLE VARCHAR2(50),
    POPUP_STATUS VARCHAR2(20),
    POPUP_CONTENT CLOB,
    POPUP_IMAGE_NO VARCHAR2(50),
    POPUP_URL VARCHAR2(400),
    USE_YN VARCHAR2(4000),
    CREATE_DATE DATE,
    CREATE_USER VARCHAR2(20),
    UPDATE_DATE DATE,
    UPDATE_USER VARCHAR2(20)
);

comment on table POPUP is '팝업 테이블';
comment on column POPUP.POPUP_ID is '팝업 일련번호';
comment on column POPUP.POPUP_TITLE is '팝업 제목';
comment on column POPUP.POPUP_STATUS  is '팝업 상태 [Html / Image]';
comment on column POPUP.POPUP_CONTENT  is '팝업 컨텐츠내용 [HTML]';
comment on column POPUP.POPUP_IMAGE_NO is '팝업 이미지 번호 [IMAGE]';
comment on column POPUP.POPUP_URL is '팝업 URL';
comment on column POPUP.USE_YN is '사용여부';
comment on column POPUP.CREATE_DATE is '등록일';
comment on column POPUP.CREATE_USER is '등록자';
comment on column POPUP.UPDATE_DATE is '수정일';
comment on column POPUP.UPDATE_USER is '수정자';

create unique index POPUP_uindex
    on POST (POPUP_ID);

alter table POPUP
    add constraint POPUP_pk
        primary key (POPUP_ID);


-- 메뉴
CREATE TABLE MENU
(
    MENU_ID VARCHAR2(20),
    UPPER_MENU_ID VARCHAR2(20),
    MENU_NAME VARCHAR2(50),
    MENU_DESCRIPTION VARCHAR2(500),
    MENU_URL VARCHAR2(400),
    USE_YN VARCHAR2(20),
    CREATE_DATE DATE,
    CREATE_USER VARCHAR2(20),
    UPDATE_DATE DATE,
    UPDATE_USER VARCHAR2(20)
);

comment on table MENU is '메뉴 테이블';
comment on column MENU.MENU_ID is '메뉴 일련번호';
comment on column MENU.UPPER_MENU_ID is '부모 메뉴 일련번호';
comment on column MENU.MENU_NAME  is '메뉴명';
comment on column MENU.MENU_DESCRIPTION  is '메뉴 설명';
comment on column MENU.MENU_URL is '메뉴 URL';
comment on column MENU.USE_YN is '사용여부';
comment on column MENU.CREATE_DATE is '등록일';
comment on column MENU.CREATE_USER is '등록자';
comment on column MENU.UPDATE_DATE is '수정일';
comment on column MENU.UPDATE_USER is '수정자';

create unique index MENU_uindex
    on POST (MENU_ID);

alter table MENU
    add constraint MENU_pk
        primary key (MENU_ID);