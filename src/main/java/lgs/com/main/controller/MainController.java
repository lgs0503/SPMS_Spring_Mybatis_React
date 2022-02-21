package lgs.com.main.controller;

import lgs.com.main.service.MainService;
import lgs.com.main.vo.UserVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class MainController {
	
	private static final Logger logger = LoggerFactory.getLogger(MainController.class);

	private final static int SUCCESS = 1;
	private final static int FAIL = 0;

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
	*  로그인 프로세스
	 * @param UserVO 로그인 ID ,PW
	 * @return 로그인 결과값
	*/
	@RequestMapping(value = "/loginProcessing", method = RequestMethod.POST)
	public ModelAndView loginProcessing(@RequestBody UserVO userVO, HttpServletRequest request) {
		logger.info("loginProcessing");

		ModelAndView mv = new ModelAndView();

		int loginStatus = mainService.loginProcessing(userVO);

		if(loginStatus == SUCCESS) {
			HttpSession session = request.getSession();

			session.setAttribute("LOGIN_USER_ID", userVO.getUserId());
			session.setAttribute("LOGIN_USER_NAME", userVO.getUserName());
		}

		mv.addObject("loginStatus", loginStatus);
		mv.setViewName("jsonView");

		return mv;
	}

	/**
	 *  계정 중복확인
	 * @param UserVO 로그인 ID
	 * @return 중복확인 결과값
	 */
	@RequestMapping(value = "/userIdCheck", method = RequestMethod.POST)
	public ModelAndView userIdCheck(@RequestBody UserVO userVO) {
		logger.info("userIdCheck");

		ModelAndView mv = new ModelAndView();

		mv.addObject("idCheckStatus", mainService.userIdCheck(userVO));
		mv.setViewName("jsonView");

		return mv;
	}

	/**
	 *  회원가입 프로세스
	 * @param UserVO 회원가입 할 데이터 input
	 * @return 회원가입 결과값
	 */
	@RequestMapping(value = "/registerProcessing", method = RequestMethod.POST)
	public ModelAndView registerProcessing(@RequestBody UserVO userVO) {
		logger.info("registerProcessing");

		ModelAndView mv = new ModelAndView();

		mainService.registerProcessing(userVO);

		mv.addObject("registerStatus", SUCCESS);
		mv.setViewName("jsonView");

		return mv;
	}
}
