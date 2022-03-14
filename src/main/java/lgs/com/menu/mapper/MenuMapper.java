package lgs.com.menu.mapper;

import lgs.com.menu.vo.MenuVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface MenuMapper {

	public List<MenuVO> menuList(MenuVO menuVO);
	public MenuVO searchMenu(MenuVO menuVO);

	public int menuCnt(MenuVO menuVO);
	public void saveMenu(MenuVO menuVO);
	public void deleteMenu(MenuVO menuVO);

}