package lgs.com.menu.service;

import lgs.com.menu.vo.MenuVO;

import java.util.List;

public interface MenuService {

    public List<MenuVO> menuList(MenuVO menuVO);
    public MenuVO searchMenu(MenuVO menuVO);
    public int menuCnt(MenuVO menuVO);
    public void saveMenu(MenuVO menuVO);
    public void deleteMenu(MenuVO menuVO);

}
