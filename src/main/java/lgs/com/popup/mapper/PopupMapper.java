package lgs.com.popup.mapper;

import lgs.com.popup.vo.PopupVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface PopupMapper {

	public List<PopupVO> popupList(PopupVO popupVO);
	public PopupVO searchPopup(PopupVO popupVO);

	public int popupCnt(PopupVO popupVO);
	public void savePopup(PopupVO popupVO);
	public void deletePopup(PopupVO popupVO);

}