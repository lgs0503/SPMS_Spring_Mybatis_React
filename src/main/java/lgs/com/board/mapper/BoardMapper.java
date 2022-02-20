package lgs.com.board.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import lgs.com.board.vo.BoardVO;

@Mapper
public interface BoardMapper {

	public List<BoardVO> getBoardList();
	
}