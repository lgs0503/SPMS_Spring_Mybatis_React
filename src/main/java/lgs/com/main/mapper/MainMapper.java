package lgs.com.main.mapper;

import lgs.com.main.vo.UserVO;
import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface MainMapper {

	public UserVO loginProcessing(UserVO userVO);

	public int userIdCheck(UserVO userVO);

	public void registerProcessing(UserVO userVO);
	
}