package lgs.com.board.vo;

import lgs.com.utill.vo.DefaultVO;
import lombok.Data;

@Data
public class BoardVO extends DefaultVO {

	private String boardId;
	private String boardName;
	private String boardType;
	private String boardDescription;
	private String useYn;
	private String fileYn;

}
