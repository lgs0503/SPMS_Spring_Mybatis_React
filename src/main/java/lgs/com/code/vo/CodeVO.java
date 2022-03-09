package lgs.com.code.vo;

import lgs.com.utill.vo.DefaultVO;
import lombok.Data;

import java.util.ArrayList;

@Data
public class CodeVO extends DefaultVO {

	private String level;
	private String codeId;
	private String codeName;
	private String upperCodeId;
	private String codeValue;
	private String useYn;
	private String useYnName;
	private String deleted;
	private String codeInfo;

	private ArrayList<String> codeIds;

}
