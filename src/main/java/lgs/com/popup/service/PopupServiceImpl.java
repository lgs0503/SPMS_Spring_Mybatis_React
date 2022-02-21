package lgs.com.popup.service;

import lgs.com.popup.mapper.PopupMapper;
import lgs.com.popup.vo.PopupVO;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PopupServiceImpl implements PopupService {

    @Autowired
    private SqlSessionFactory sqlSessionFactory;

    @Override
    public List<PopupVO> popupList(PopupVO popupVO) {
        List<PopupVO> result = new ArrayList<PopupVO>();

        try (SqlSession session = sqlSessionFactory.openSession()) {
            PopupMapper mapper = session.getMapper(PopupMapper.class);

            result = mapper.popupList(popupVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    @Override
    public PopupVO searchPopup(PopupVO popupVO) {
        PopupVO result = new PopupVO();

        try (SqlSession session = sqlSessionFactory.openSession()) {
            PopupMapper mapper = session.getMapper(PopupMapper.class);

            result = mapper.searchPopup(popupVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    @Override
    public int popupCnt(PopupVO popupVO) {
        int result = 0;

        try (SqlSession session = sqlSessionFactory.openSession()) {
            PopupMapper mapper = session.getMapper(PopupMapper.class);

            result = mapper.popupCnt(popupVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    @Override
    public void savePopup(PopupVO popupVO) {

        try (SqlSession session = sqlSessionFactory.openSession()) {
            PopupMapper mapper = session.getMapper(PopupMapper.class);

            mapper.savePopup(popupVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deletePopup(PopupVO popupVO) {
        try (SqlSession session = sqlSessionFactory.openSession()) {
            PopupMapper mapper = session.getMapper(PopupMapper.class);

            mapper.deletePopup(popupVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
