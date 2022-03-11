package lgs.com.banner.vo;

import lgs.com.utill.vo.DefaultVO;
import lombok.Data;

import java.util.ArrayList;

@Data
public class BannerVO extends DefaultVO {

	private String bannerId;
	private String bannerTitle;
	private String bannerStatus;
	private String bannerStatusName;
	private String bannerContent;
	private String bannerImageNo;
	private String useYn;
	private String useYnName;

	private ArrayList<String> bannerIds;

}
