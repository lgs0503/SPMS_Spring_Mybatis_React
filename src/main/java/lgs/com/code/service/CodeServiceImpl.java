package lgs.com.code.service;

import lgs.com.code.mapper.CodeMapper;
import lgs.com.code.vo.CodeVO;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CodeServiceImpl implements CodeService {

    @Autowired
    private SqlSessionFactory sqlSessionFactory;

    @Override
    public List<CodeVO> codeList(CodeVO codeVO) {
        List<CodeVO> result = new ArrayList<CodeVO>();

        try (SqlSession session = sqlSessionFactory.openSession()) {
            CodeMapper mapper = session.getMapper(CodeMapper.class);

            result = mapper.codeList(codeVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    @Override
    public CodeVO searchCode(CodeVO codeVO) {
        CodeVO result = new CodeVO();

        try (SqlSession session = sqlSessionFactory.openSession()) {
            CodeMapper mapper = session.getMapper(CodeMapper.class);

            result = mapper.searchCode(codeVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    @Override
    public int codeCnt(CodeVO codeVO) {
        int result = 0;

        try (SqlSession session = sqlSessionFactory.openSession()) {
            CodeMapper mapper = session.getMapper(CodeMapper.class);

            result = mapper.codeCnt(codeVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    @Override
    public void saveCode(CodeVO codeVO) {

        try (SqlSession session = sqlSessionFactory.openSession()) {
            CodeMapper mapper = session.getMapper(CodeMapper.class);

            mapper.saveCode(codeVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteCode(CodeVO codeVO) {
        try (SqlSession session = sqlSessionFactory.openSession()) {
            CodeMapper mapper = session.getMapper(CodeMapper.class);

            mapper.deleteCode(codeVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
