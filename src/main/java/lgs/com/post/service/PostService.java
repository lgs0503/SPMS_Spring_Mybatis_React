package lgs.com.post.service;

import lgs.com.post.vo.PostVO;

import java.util.List;

public interface PostService {

    public List<PostVO> postList(PostVO postVO);
    public PostVO searchPost(PostVO postVO);
    public int postCnt(PostVO postVO);
    public void updateViewCnt(PostVO postVO);
    public void savePost(PostVO postVO);
    public void deletePost(PostVO postVO);

}
