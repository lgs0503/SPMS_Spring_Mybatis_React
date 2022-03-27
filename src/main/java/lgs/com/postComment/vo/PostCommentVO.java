package lgs.com.postComment.vo;

import lgs.com.utill.vo.DefaultVO;
import lombok.Data;

import java.util.ArrayList;

@Data
public class PostCommentVO extends DefaultVO {

	private String level;
	private String leaf;
	private String commentId;
	private String commentUpperId;
	private String commentTitle;
	private String commentText;
	private String deleted;

	private ArrayList<String> codeIds;

}
