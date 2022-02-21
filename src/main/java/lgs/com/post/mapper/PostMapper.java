package lgs.com.post.mapper;

import lgs.com.post.vo.PostVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface PostMapper {

	public List<PostVO> postList(PostVO postVO);
	public PostVO searchPost(PostVO postVO);

	public int postCnt(PostVO postVO);
	public void updateViewCnt(PostVO postVO);
	public void savePost(PostVO postVO);
	public void deletePost(PostVO postVO);


}