package lgs.com.user.service;

import lgs.com.code.vo.CodeVO;
import lgs.com.user.mapper.UserMapper;
import lgs.com.user.vo.UserVO;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private SqlSessionFactory sqlSessionFactory;

	@Override
	public List<UserVO> userList(UserVO userVO) {
		List<UserVO> result = new ArrayList<UserVO>();

		try (SqlSession session = sqlSessionFactory.openSession()) {
			UserMapper mapper = session.getMapper(UserMapper.class);

			result = mapper.userList(userVO);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	@Override
	public UserVO searchUser(UserVO userVO) {
		UserVO result = new UserVO();

		try (SqlSession session = sqlSessionFactory.openSession()) {
			UserMapper mapper = session.getMapper(UserMapper.class);

			result = mapper.searchUser(userVO);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	@Override
	public int userCnt(UserVO userVO) {
		int result = 0;

		try (SqlSession session = sqlSessionFactory.openSession()) {
			UserMapper mapper = session.getMapper(UserMapper.class);

			result = mapper.userCnt(userVO);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	@Override
	public void saveUser(UserVO userVO) {
		try (SqlSession session = sqlSessionFactory.openSession()) {
			UserMapper mapper = session.getMapper(UserMapper.class);

			mapper.saveUser(userVO);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void deleteUser(UserVO userVO) {
		try (SqlSession session = sqlSessionFactory.openSession()) {
			UserMapper mapper = session.getMapper(UserMapper.class);

			mapper.deleteUser(userVO);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}