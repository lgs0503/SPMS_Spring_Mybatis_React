package lgs.com.user.mapper;

import lgs.com.code.vo.CodeVO;
import lgs.com.user.vo.UserVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {

	public List<UserVO> userList(UserVO userVO);
	public UserVO searchUser(UserVO userVO);

	public int userCnt(UserVO userVO);
	public void saveUser(UserVO userVO);
	public void deleteUser(UserVO userVO);

}