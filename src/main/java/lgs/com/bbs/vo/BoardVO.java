package lgs.com.bbs.vo;

import java.util.Date;
import lombok.Data;

@Data
public class BoardVO {
/*
	BNO INT NOT NULL ,	-- 게시판 고유 번호 (자동증가)
	TITLE VARCHAR(100),	-- 게시글 제목
	CONTENT VARCHAR(1000),	-- 게시글 내용
	WRITER VARCHAR(100),	-- 글쓴이
	REGDATE TIMESTAMP DEFAULT SYSDATE(),	-- 날짜(기본값 현재시각)
	PRIMARY KEY (BNO)	-- 게시판 번호 기본키 지정
*/
	
	int bno;
	String title;
	String content;
	String writer;
	String regDate;

}
