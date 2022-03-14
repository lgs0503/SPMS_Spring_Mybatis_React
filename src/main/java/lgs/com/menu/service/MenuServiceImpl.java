package lgs.com.menu.service;

import lgs.com.menu.service.MenuService;
import lgs.com.menu.mapper.MenuMapper;
import lgs.com.menu.vo.MenuVO;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MenuServiceImpl implements MenuService {

    @Autowired
    private SqlSessionFactory sqlSessionFactory;

    @Override
    public List<MenuVO> menuList(MenuVO menuVO) {
        List<MenuVO> result = new ArrayList<MenuVO>();

        try (SqlSession session = sqlSessionFactory.openSession()) {
            MenuMapper mapper = session.getMapper(MenuMapper.class);

            result = mapper.menuList(menuVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    @Override
    public MenuVO searchMenu(MenuVO menuVO) {
        MenuVO result = new MenuVO();

        try (SqlSession session = sqlSessionFactory.openSession()) {
            MenuMapper mapper = session.getMapper(MenuMapper.class);

            result = mapper.searchMenu(menuVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    @Override
    public int menuCnt(MenuVO menuVO) {
        int result = 0;

        try (SqlSession session = sqlSessionFactory.openSession()) {
            MenuMapper mapper = session.getMapper(MenuMapper.class);

            result = mapper.menuCnt(menuVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    @Override
    public void saveMenu(MenuVO menuVO) {

        try (SqlSession session = sqlSessionFactory.openSession()) {
            MenuMapper mapper = session.getMapper(MenuMapper.class);

            mapper.saveMenu(menuVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteMenu(MenuVO menuVO) {
        try (SqlSession session = sqlSessionFactory.openSession()) {
            MenuMapper mapper = session.getMapper(MenuMapper.class);

            mapper.deleteMenu(menuVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
