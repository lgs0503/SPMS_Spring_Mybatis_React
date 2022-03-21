package lgs.com.postcomment.service;

import lgs.com.postcomment.vo.PostCommentVO;

import java.util.List;

public interface PostCommentService {

    public List<PostCommentVO> postCommentList(PostCommentVO postCommentVO);
    public PostCommentVO searchPostComment(PostCommentVO postCommentVO);
    public int postCommentCnt(PostCommentVO postCommentVO);
    public void savePostComment(PostCommentVO postCommentVO);
    public void deletePostComment(PostCommentVO postCommentVO);

}
