package lgs.com.main.service;

import lgs.com.main.vo.UserVO;

public interface MainService {

    public int loginProcessing(UserVO userVO);

    public String loginRuleCheck(UserVO userVO);

    public int userIdCheck(UserVO userVO);

    public void registerProcessing(UserVO userVO);
}
