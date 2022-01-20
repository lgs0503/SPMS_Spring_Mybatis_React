package lgs.com.main.service;

import lgs.com.bbs.mapper.BoardMapper;
import lgs.com.bbs.vo.BoardVO;
import lgs.com.main.mapper.MainMapper;
import lgs.com.main.vo.UserVO;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MainServiceServiceImpl implements MainService{

    @Autowired
    private SqlSessionFactory sqlSessionFactory;

    @Override
    public int loginProcessing(UserVO userVO) {
        // TODO Auto-generated method stub
       int result = 0;

        try (SqlSession session = sqlSessionFactory.openSession()) {
            MainMapper mapper = session.getMapper(MainMapper.class);

            result = mapper.loginProcessing(userVO);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }
        return result;
    }
}
