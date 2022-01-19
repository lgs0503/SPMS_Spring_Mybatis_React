package lgs.com.main.controller;

import lgs.com.bbs.vo.BoardVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@Controller
public class MainController {
	
	private static final Logger logger = LoggerFactory.getLogger(MainController.class);

	/**
	 *  메인화면 으로 이동
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String mainPage(Model model) {
		logger.info("mainPage");

		return "index";
	}

	/**
	 *  로그인 으로 이동
	 */
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String loginPage(Model model) {
		logger.info("loginPage");

		return "login";
	}


	@RequestMapping(value = "/loginProcessing", method = RequestMethod.POST)
	public @ResponseBody void loginProcessing()
	{
		return;
	}
}
