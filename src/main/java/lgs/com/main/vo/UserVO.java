package lgs.com.main.vo;

import lgs.com.utill.vo.DefaultVO;
import lombok.Data;

@Data
public class UserVO extends DefaultVO {

	String userId;
	String password;
	String userName;
	int age;
	String gender;
	String email;
	String location;
	String locationDetail;
	String imageFileNo;
	String phoneNum;
	String rule;
	String deleted;

}
