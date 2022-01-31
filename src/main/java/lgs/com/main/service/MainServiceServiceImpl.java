package lgs.com.main.service;

import lgs.com.main.mapper.MainMapper;
import lgs.com.main.vo.UserVO;
import lgs.com.utill.StringUtils;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.inject.Inject;

@Service
public class MainServiceServiceImpl implements MainService {

    private final static int SUCCESS = 1;
    private final static int FAIL = 0;

    @Autowired
    private SqlSessionFactory sqlSessionFactory;

    @Inject
    PasswordEncoder passwordEncoder;

    @Override
    public int loginProcessing(UserVO userVO) {
        int result = FAIL;

        try (SqlSession session = sqlSessionFactory.openSession()) {
            MainMapper mapper = session.getMapper(MainMapper.class);

            UserVO loginUser = mapper.loginProcessing(userVO);

            if(loginUser == null){
                return FAIL;
            }

            String password = StringUtils.nvl(loginUser.getPassword(), "");
            String rawPassword = StringUtils.nvl(userVO.getPassword(), "");

            /* 입력 비밀번호와 db 계정 비밀번호를 디코딩하여 비교 */
            if(passwordEncoder.matches(rawPassword, password)) {

                result = SUCCESS;
            } else {
                result = FAIL;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    @Override
    public int userIdCheck(UserVO userVO) {
        int result = FAIL;

        try (SqlSession session = sqlSessionFactory.openSession()) {
            MainMapper mapper = session.getMapper(MainMapper.class);

            result = mapper.userIdCheck(userVO);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    @Override
    public void registerProcessing(UserVO userVO) {
        int result = 0;

        try (SqlSession session = sqlSessionFactory.openSession()) {
            MainMapper mapper = session.getMapper(MainMapper.class);

            /* 비밀번호 암호화 */
            String encPassword = passwordEncoder.encode(userVO.getPassword());
            userVO.setPassword(encPassword);

             mapper.registerProcessing(userVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
