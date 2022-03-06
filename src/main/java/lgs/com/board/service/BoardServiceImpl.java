package lgs.com.board.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lgs.com.board.mapper.BoardMapper;
import lgs.com.board.vo.BoardVO;

@Service
public class BoardServiceImpl implements BoardService {

	@Autowired
	private SqlSessionFactory sqlSessionFactory;

	@Override
	public List<BoardVO> boardList(BoardVO boardVO) {
		List<BoardVO> result = new ArrayList<BoardVO>();

		try (SqlSession session = sqlSessionFactory.openSession()) {
			BoardMapper mapper = session.getMapper(BoardMapper.class);

			result = mapper.boardList(boardVO);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	@Override
	public BoardVO searchBoard(BoardVO boardVO) {
		BoardVO result = new BoardVO();

		try (SqlSession session = sqlSessionFactory.openSession()) {
			BoardMapper mapper = session.getMapper(BoardMapper.class);

			result = mapper.searchBoard(boardVO);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	@Override
	public int boardCnt(BoardVO boardVO) {
		int result = 0;

		try (SqlSession session = sqlSessionFactory.openSession()) {
			BoardMapper mapper = session.getMapper(BoardMapper.class);

			result = mapper.boardCnt(boardVO);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	@Override
	public void saveBoard(BoardVO boardVO) {
		try (SqlSession session = sqlSessionFactory.openSession()) {
			BoardMapper mapper = session.getMapper(BoardMapper.class);

			mapper.saveBoard(boardVO);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void deleteBoard(BoardVO boardVO) {
		try (SqlSession session = sqlSessionFactory.openSession()) {
			BoardMapper mapper = session.getMapper(BoardMapper.class);

			mapper.deleteBoard(boardVO);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public List<BoardVO> boardCodeList(BoardVO boardVO) {
		List<BoardVO> result = new ArrayList<BoardVO>();

		try (SqlSession session = sqlSessionFactory.openSession()) {
			BoardMapper mapper = session.getMapper(BoardMapper.class);

			result = mapper.boardCodeList(boardVO);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

}