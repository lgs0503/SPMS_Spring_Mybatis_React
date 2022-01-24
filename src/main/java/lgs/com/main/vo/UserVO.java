package lgs.com.main.vo;

import lgs.com.utill.vo.DefaultVO;
import lombok.Data;

@Data
public class UserVO extends DefaultVO {

	private String userId;
	private String password;
	private String userName;
	private int age;
	private String gender;
	private String email;
	private String location;
	private String locationDetail;
	private String imageFileNo;
	private String phoneNum;
	private String rule;
	private String deleted;

}
