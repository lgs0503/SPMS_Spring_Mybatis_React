package lgs.com.post.service;

import lgs.com.post.mapper.PostMapper;
import lgs.com.post.vo.PostVO;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private SqlSessionFactory sqlSessionFactory;

    @Override
    public List<PostVO> postList(PostVO postVO) {
        List<PostVO> result = new ArrayList<PostVO>();

        try (SqlSession session = sqlSessionFactory.openSession()) {
            PostMapper mapper = session.getMapper(PostMapper.class);

            result = mapper.postList(postVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    @Override
    public PostVO searchPost(PostVO postVO) {
        PostVO result = new PostVO();

        try (SqlSession session = sqlSessionFactory.openSession()) {
            PostMapper mapper = session.getMapper(PostMapper.class);

            result = mapper.searchPost(postVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    @Override
    public int postCnt(PostVO postVO) {
        int result = 0;

        try (SqlSession session = sqlSessionFactory.openSession()) {
            PostMapper mapper = session.getMapper(PostMapper.class);

            result = mapper.postCnt(postVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    @Override
    public void updateViewCnt(PostVO postVO) {

        try (SqlSession session = sqlSessionFactory.openSession()) {
            PostMapper mapper = session.getMapper(PostMapper.class);

            mapper.updateViewCnt(postVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void savePost(PostVO postVO) {

        try (SqlSession session = sqlSessionFactory.openSession()) {
            PostMapper mapper = session.getMapper(PostMapper.class);

            mapper.savePost(postVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deletePost(PostVO postVO) {
        try (SqlSession session = sqlSessionFactory.openSession()) {
            PostMapper mapper = session.getMapper(PostMapper.class);

            mapper.deletePost(postVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
