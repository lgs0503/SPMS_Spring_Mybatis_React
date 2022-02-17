package lgs.com.code.mapper;

import lgs.com.code.vo.CodeVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface CodeMapper {

	public List<CodeVO> codeList(CodeVO codeVO);
	public int codeCnt(CodeVO codeVO);
	public void saveCode(CodeVO codeVO);
	public void deleteCode(CodeVO codeVO);

}