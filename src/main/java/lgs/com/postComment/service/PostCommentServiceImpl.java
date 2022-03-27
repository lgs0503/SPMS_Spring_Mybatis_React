package lgs.com.postComment.service;

import lgs.com.postComment.mapper.PostCommentMapper;
import lgs.com.postComment.vo.PostCommentVO;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PostCommentServiceImpl implements PostCommentService {

    @Autowired
    private SqlSessionFactory sqlSessionFactory;

    @Override
    public List<PostCommentVO> postCommentList(PostCommentVO postCommentVO) {
        List<PostCommentVO> result = new ArrayList<PostCommentVO>();

        try (SqlSession session = sqlSessionFactory.openSession()) {
            PostCommentMapper mapper = session.getMapper(PostCommentMapper.class);

            result = mapper.postCommentList(postCommentVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    @Override
    public PostCommentVO searchPostComment(PostCommentVO postCommentVO) {
        PostCommentVO result = new PostCommentVO();

        try (SqlSession session = sqlSessionFactory.openSession()) {
            PostCommentMapper mapper = session.getMapper(PostCommentMapper.class);

            result = mapper.searchPostComment(postCommentVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    @Override
    public int postCommentCnt(PostCommentVO postCommentVO) {
        int result = 0;

        try (SqlSession session = sqlSessionFactory.openSession()) {
            PostCommentMapper mapper = session.getMapper(PostCommentMapper.class);

            result = mapper.postCommentCnt(postCommentVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    @Override
    public void savePostComment(PostCommentVO postCommentVO) {

        try (SqlSession session = sqlSessionFactory.openSession()) {
            PostCommentMapper mapper = session.getMapper(PostCommentMapper.class);

            mapper.savePostComment(postCommentVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deletePostComment(PostCommentVO postCommentVO) {
        try (SqlSession session = sqlSessionFactory.openSession()) {
            PostCommentMapper mapper = session.getMapper(PostCommentMapper.class);

            mapper.deletePostComment(postCommentVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
