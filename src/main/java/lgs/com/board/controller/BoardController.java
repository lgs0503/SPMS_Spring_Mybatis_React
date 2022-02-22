package lgs.com.board.controller;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lgs.com.board.controller.BoardController;
import lgs.com.board.vo.BoardVO;
import lgs.com.utill.StatusEnum;
import lgs.com.utill.vo.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import lgs.com.board.service.BoardService;
import lgs.com.board.vo.BoardVO;

@Controller
public class BoardController {

	private static final Logger logger = LoggerFactory.getLogger(BoardController.class);

	@Autowired
	BoardService boardService;

	/**
	 *  게시판 리스트 조회
	 * @param BoardVO 조회조건
	 * @return 게시판 리스트
	 */
	@RequestMapping(value = "/boardList", method = RequestMethod.GET)
	public ResponseEntity<Message> boardList(@RequestBody BoardVO boardVO) {
		logger.info("boardList");
		Message message = new Message();
		HttpHeaders headers= new HttpHeaders();
		headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

		Map<String, Object> data = new HashMap<String, Object>();

		message.setStatus(StatusEnum.OK);
		data.put("boardList", boardService.boardList(boardVO));
		data.put("boardCnt", boardService.boardCnt(boardVO));
		message.setData(data);

		return new ResponseEntity<>(message, headers, HttpStatus.OK);
	}

	/**
	 *  게시판 조회
	 * @param BoardVO 조회조건
	 * @return 게시판 리스트
	 */
	@RequestMapping(value = "/searchBoard", method = RequestMethod.GET)
	public ResponseEntity<Message> searchBoard(@RequestBody BoardVO boardVO) {
		logger.info("serachBoard");
		Message message = new Message();
		HttpHeaders headers= new HttpHeaders();
		headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

		Map<String, Object> data = new HashMap<String, Object>();

		message.setStatus(StatusEnum.OK);
		data.put("board", boardService.searchBoard(boardVO));
		message.setData(data);

		return new ResponseEntity<>(message, headers, HttpStatus.OK);
	}

	/**
	 *  게시판 저장 (신규, 수정)
	 * @param BoardVO 저장 게시판 데이터
	 */
	@RequestMapping(value = "/saveBoard", method = {RequestMethod.POST, RequestMethod.PUT})
	public ResponseEntity<Message> saveBoard(@RequestBody BoardVO boardVO) {
		logger.info("saveBoard");
		Message message = new Message();
		HttpHeaders headers= new HttpHeaders();
		headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

		boardService.saveBoard(boardVO);
		message.setStatus(StatusEnum.OK);
		return new ResponseEntity<>(message, headers, HttpStatus.OK);
	}

	/**
	 *  게시판 삭제
	 * @param BoardVO 삭제 게시판 데이터
	 */
	@RequestMapping(value = "/deleteBoard", method = RequestMethod.DELETE)
	public ResponseEntity<Message> deleteBoard(@RequestBody BoardVO boardVO) {
		logger.info("deleteBoard");
		Message message = new Message();
		HttpHeaders headers= new HttpHeaders();
		headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

		boardService.deleteBoard(boardVO);
		message.setStatus(StatusEnum.OK);
		return new ResponseEntity<>(message, headers, HttpStatus.OK);
	}
}