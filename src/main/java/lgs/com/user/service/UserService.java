package lgs.com.user.service;

import lgs.com.code.vo.CodeVO;
import lgs.com.user.vo.UserVO;

import java.util.List;

public interface UserService {

	public List<UserVO> userList(UserVO userVO);
	public UserVO searchUser(UserVO userVO);
	public int userCnt(UserVO userVO);
	public void saveUser(UserVO userVO);
	public void deleteUser(UserVO userVO);

}