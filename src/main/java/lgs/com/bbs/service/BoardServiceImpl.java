package lgs.com.bbs.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lgs.com.bbs.mapper.BoardMapper;
import lgs.com.bbs.vo.BoardVO;

@Service
public class BoardServiceImpl implements BoardService {

	@Autowired
	private SqlSessionFactory sqlSessionFactory;

	@Override
	public List<BoardVO> getBoardList() {
		// TODO Auto-generated method stub
		List<BoardVO> boardList = new ArrayList<BoardVO>();

		try (SqlSession session = sqlSessionFactory.openSession()) {
			BoardMapper mapper = session.getMapper(BoardMapper.class);

			boardList = mapper.getBoardList();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return boardList;
	}

}