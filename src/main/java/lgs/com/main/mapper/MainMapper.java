package lgs.com.main.mapper;

import lgs.com.main.vo.UserVO;
import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface MainMapper {

	public int loginProcessing(UserVO userVO);
	
}