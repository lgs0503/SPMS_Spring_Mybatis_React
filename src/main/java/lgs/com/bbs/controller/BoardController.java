package lgs.com.bbs.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import lgs.com.bbs.service.BoardService;
import lgs.com.bbs.vo.BoardVO;

@Controller
@RequestMapping("board/")
public class BoardController {

	private static final Logger LOG = LoggerFactory.getLogger(BoardController.class);

	@Autowired
	BoardService service;

	@RequestMapping(value = "list", method = RequestMethod.GET)
	public String BoardView() 
	{	
		LOG.info("[GET] BoardView");
		return "borad";
	}
	
	@RequestMapping(value = "getBoardList", method = RequestMethod.POST)
	public @ResponseBody List<BoardVO> getBoardList() 
	{	
		LOG.info("[POST] getBoardList");
		List<BoardVO> result = new ArrayList<BoardVO>();

		try {
			result = service.getBoardList();
		} catch (Exception e) {
			// TODO: handle exception
			LOG.error("[Board] getBoardList : " + e.getMessage(), e);
		}

		return result;
	}
}