package lgs.com.popup.vo;

import lgs.com.utill.vo.DefaultVO;
import lombok.Data;

import java.util.ArrayList;

@Data
public class PopupVO extends DefaultVO {

	private String popupId;
	private String popupTitle;
	private String popupStatus;
	private String popupContent;
	private String popupImageNo;
	private String popupUrl;
	private String uesYn;

	private ArrayList<String> popupIds;

}
