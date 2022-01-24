package lgs.com.utill.service;

import lgs.com.utill.mapper.FileMapper;
import lgs.com.utill.vo.FileVO;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FileServiceServiceImpl implements FileService {

    @Autowired
    private SqlSessionFactory sqlSessionFactory;

    @Transactional
    @Override
    public FileVO fileUpload(FileVO fileVO) {

        try (SqlSession session = sqlSessionFactory.openSession()) {
            FileMapper mapper = session.getMapper(FileMapper.class);

            /* 파일 일련번호 생성 */
            fileVO.setFileNo(mapper.createfileNo());

            mapper.fileUpload(fileVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return fileVO;
    }

    @Override
    public FileVO fileSearch(FileVO fileVO) {
        FileVO result = new FileVO();

        try (SqlSession session = sqlSessionFactory.openSession()) {
            FileMapper mapper = session.getMapper(FileMapper.class);

            result = mapper.fileSearch(fileVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
