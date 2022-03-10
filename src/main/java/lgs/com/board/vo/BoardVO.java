package lgs.com.board.vo;

import lgs.com.utill.vo.DefaultVO;
import lombok.Data;

import java.util.List;

@Data
public class BoardVO extends DefaultVO {

	private String boardId;
	private String boardName;
	private String boardType;
	private String boardTypeName;
	private String boardDescription;
	private String useYn;
	private String useYnName;
	private String fileYn;
	private String fileYnName;

	private List<String> boardIds;

}
