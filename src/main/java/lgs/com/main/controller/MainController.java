package lgs.com.main.controller;

import lgs.com.bbs.vo.BoardVO;
import lgs.com.main.service.MainService;
import lgs.com.main.vo.UserVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@Controller
public class MainController {
	
	private static final Logger logger = LoggerFactory.getLogger(MainController.class);

	@Autowired
	MainService mainService;

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

	/**
	*  로그인 프로세스
	 * @param UserVO 로그인 ID ,PW
	 * @return 로그인 결과값
	*/
	@RequestMapping(value = "/loginProcessing", method = RequestMethod.POST)
	public @ResponseBody int loginProcessing(@RequestBody UserVO userVO) {
		logger.info("loginProcessing");
		return mainService.loginProcessing(userVO);
	}

	/**
	 *  회원가입 프로세스
	 * @param UserVO 회원가입 할 데이터 input
	 */
	@RequestMapping(value = "/registerProcessing", method = RequestMethod.POST)
	public @ResponseBody void registerProcessing(@RequestBody UserVO userVO) {
		logger.info("registerProcessing");
		mainService.registerProcessing(userVO);
	}
}
