package lgs.com.main.service;

import lgs.com.main.mapper.MainMapper;
import lgs.com.main.vo.UserVO;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MainServiceServiceImpl implements MainService {

    @Autowired
    private SqlSessionFactory sqlSessionFactory;

    @Override
    public int loginProcessing(UserVO userVO) {
        int result = 0;

        try (SqlSession session = sqlSessionFactory.openSession()) {
            MainMapper mapper = session.getMapper(MainMapper.class);

            result = mapper.loginProcessing(userVO);
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

             mapper.registerProcessing(userVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
