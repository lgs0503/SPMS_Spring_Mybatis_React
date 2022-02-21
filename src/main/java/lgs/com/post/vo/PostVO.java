package lgs.com.post.vo;

import lgs.com.utill.vo.DefaultVO;
import lombok.Data;

import java.util.ArrayList;

@Data
public class PostVO extends DefaultVO {

	private String boardId;
	private String postId;
	private String postType;
	private String postContent;
	private String viewCnt;
	private String deleted;
	private String fileNo1;
	private String fileNo2;

	private ArrayList<String> postIds;

}
