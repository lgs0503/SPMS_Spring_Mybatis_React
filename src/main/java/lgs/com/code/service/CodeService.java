package lgs.com.code.service;

import lgs.com.code.vo.CodeVO;

import java.util.List;

public interface CodeService {

    public List<CodeVO> codeList(CodeVO codeVO);
    public CodeVO searchCode(CodeVO codeVO);
    public int codeCnt(CodeVO codeVO);
    public void saveCode(CodeVO codeVO);
    public void deleteCode(CodeVO codeVO);

}
