package lgs.com.user.controller;

import lgs.com.user.service.UserService;
import lgs.com.user.vo.UserVO;
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

@Controller
public class UserController {

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
    UserService userService;

	/**
	 *  회원 리스트 조회
	 * @param UserVO 조회조건
	 * @return 회원 리스트
	 */
	@RequestMapping(value = "/userList", method = RequestMethod.POST)
	public ResponseEntity<Message> userList(@RequestBody UserVO userVO) {
		logger.info("userList");

		CommonResponse commonResponse = new CommonResponse();

		commonResponse.putData("userList", userService.userList(userVO));
		commonResponse.putData("userCnt", userService.userCnt(userVO));

		return new ResponseEntity<>(commonResponse.getMessage(), commonResponse.getHeaders(), HttpStatus.OK);
	}

	/**
	 *  회원 조회
	 * @param UserVO 조회조건
	 * @return 회원 리스트
	 */
	@RequestMapping(value = "/searchUser", method = RequestMethod.POST)
	public ResponseEntity<Message> searchUser(@RequestBody UserVO userVO) {
		logger.info("serachUser");

		CommonResponse commonResponse = new CommonResponse();

		commonResponse.putData("user", userService.searchUser(userVO));

		return new ResponseEntity<>(commonResponse.getMessage(), commonResponse.getHeaders(), HttpStatus.OK);
	}

	/**
	 *  회원 저장 (신규, 수정)
	 * @param UserVO 저장 회원 데이터
	 */
	@RequestMapping(value = "/saveUser", method = {RequestMethod.POST, RequestMethod.PUT})
	public ResponseEntity<Message> saveUser(@RequestBody UserVO userVO) {
		logger.info("saveUser");
		userService.saveUser(userVO);

		CommonResponse commonResponse = new CommonResponse();
		return new ResponseEntity<>(commonResponse.getMessage(), commonResponse.getHeaders(), HttpStatus.OK);
	}

	/**
	 *  회원 삭제
	 * @param UserVO 삭제 회원 데이터
	 */
	@RequestMapping(value = "/deleteUser", method = RequestMethod.POST)
	public ResponseEntity<Message> deleteUser(@RequestBody UserVO userVO) {
		logger.info("deleteUser");

		userService.deleteUser(userVO);
		CommonResponse commonResponse = new CommonResponse();
		return new ResponseEntity<>(commonResponse.getMessage(), commonResponse.getHeaders(), HttpStatus.OK);
	}
}