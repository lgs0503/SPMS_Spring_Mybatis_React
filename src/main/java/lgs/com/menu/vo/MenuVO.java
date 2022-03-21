package lgs.com.menu.vo;

import lgs.com.utill.vo.DefaultVO;
import lombok.Data;

import java.util.ArrayList;

@Data
public class MenuVO extends DefaultVO {

	private String level;
	private String leaf;
	private String menuId;
	private String menuName;
	private String upperMenuId;
	private String menuDescription;
	private String menuUrl;
	private String useYn;
	private String useYnName;

	private ArrayList<String> menuIds;

}
