package lgs.com.board.controller;

import lgs.com.board.vo.BoardVO;
import lgs.com.utill.CommonResponse;
import lgs.com.utill.vo.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import lgs.com.board.service.BoardService;

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
	@RequestMapping(value = "/boardList", method = RequestMethod.POST)
	public ResponseEntity<Message> boardList(@RequestBody BoardVO boardVO) {
		logger.info("boardList");

		CommonResponse commonResponse = new CommonResponse();

		commonResponse.putData("boardList", boardService.boardList(boardVO));
		commonResponse.putData("boardCnt", boardService.boardCnt(boardVO));

		return new ResponseEntity<>(commonResponse.getMessage(), commonResponse.getHeaders(), HttpStatus.OK);
	}

	/**
	 *  게시판 조회
	 * @param BoardVO 조회조건
	 * @return 게시판 리스트
	 */
	@RequestMapping(value = "/searchBoard", method = RequestMethod.POST)
	public ResponseEntity<Message> searchBoard(@RequestBody BoardVO boardVO) {
		logger.info("serachBoard");

		CommonResponse commonResponse = new CommonResponse();

		commonResponse.putData("board", boardService.searchBoard(boardVO));

		return new ResponseEntity<>(commonResponse.getMessage(), commonResponse.getHeaders(), HttpStatus.OK);
	}

	/**
	 *  게시판 저장 (신규, 수정)
	 * @param BoardVO 저장 게시판 데이터
	 */
	@RequestMapping(value = "/saveBoard", method = {RequestMethod.POST, RequestMethod.PUT})
	public ResponseEntity<Message> saveBoard(@RequestBody BoardVO boardVO) {
		logger.info("saveBoard");
		boardService.saveBoard(boardVO);

		CommonResponse commonResponse = new CommonResponse();
		return new ResponseEntity<>(commonResponse.getMessage(), commonResponse.getHeaders(), HttpStatus.OK);
	}

	/**
	 *  게시판 삭제
	 * @param BoardVO 삭제 게시판 데이터
	 */
	@RequestMapping(value = "/deleteBoard", method = RequestMethod.DELETE)
	public ResponseEntity<Message> deleteBoard(@RequestBody BoardVO boardVO) {
		logger.info("deleteBoard");

		boardService.deleteBoard(boardVO);
		CommonResponse commonResponse = new CommonResponse();
		return new ResponseEntity<>(commonResponse.getMessage(), commonResponse.getHeaders(), HttpStatus.OK);
	}
}