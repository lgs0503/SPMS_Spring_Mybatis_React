package lgs.com.popup.service;

import lgs.com.popup.vo.PopupVO;

import java.util.List;

public interface PopupService {

    public List<PopupVO> popupList(PopupVO popupVO);
    public PopupVO searchPopup(PopupVO popupVO);
    public int popupCnt(PopupVO popupVO);
    public void savePopup(PopupVO popupVO);
    public void deletePopup(PopupVO popupVO);

}
