package lgs.com.postcomment.mapper;

import lgs.com.postcomment.vo.PostCommentVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface PostCommentMapper {

	public List<PostCommentVO> postCommentList(PostCommentVO postCommentVO);
	public PostCommentVO searchPostComment(PostCommentVO postCommentVO);

	public int postCommentCnt(PostCommentVO postCommentVO);
	public void savePostComment(PostCommentVO postCommentVO);
	public void deletePostComment(PostCommentVO postCommentVO);

}