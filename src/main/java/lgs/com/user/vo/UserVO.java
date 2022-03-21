package lgs.com.user.vo;

import lgs.com.utill.vo.DefaultVO;
import lombok.Data;

import java.util.List;

@Data
public class UserVO extends DefaultVO {

	private String userId;
	private String password;
	private String userName;
	private int age;
	private String birthday;
	private String gender;
	private String genderName;
	private String email;
	private String location;
	private String locationDtl;
	private String imageFileNo;
	private String imageFileNoName;
	private String phoneNum;
	private String userRule;
	private String userRuleName;
	private String deleted;

	private List<String> userIds;

}
