package lgs.com.board.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import lgs.com.board.vo.BoardVO;

@Mapper
public interface BoardMapper {

	public List<BoardVO> boardList(BoardVO boardVO);
	public BoardVO searchBoard(BoardVO boardVO);

	public int boardCnt(BoardVO boardVO);
	public void saveBoard(BoardVO boardVO);
	public void deleteBoard(BoardVO boardVO);
	public List<BoardVO> boardCodeList(BoardVO boardVO);

}