package lgs.com.postcomment.controller;

import lgs.com.postcomment.service.PostCommentService;
import lgs.com.postcomment.vo.PostCommentVO;
import lgs.com.utill.CommonResponse;
import lgs.com.utill.vo.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class PostCommentController {

    private static final Logger logger = LoggerFactory.getLogger(PostCommentController.class);

    @Autowired
    PostCommentService postCommentService;

    /**
     *  댓글 리스트 조회
     * @param PostCommentVO 조회조건
     * @return 댓글 리스트
     */
    @RequestMapping(value = "/postCommentList", method = RequestMethod.POST)
    public ResponseEntity<Message> postCommentList(@RequestBody PostCommentVO postCommentVO) {
        logger.info("postCommentList");
        CommonResponse commonResponse = new CommonResponse();

        commonResponse.putData("postCommentList", postCommentService.postCommentList(postCommentVO));
        commonResponse.putData("postCommentCnt", postCommentService.postCommentCnt(postCommentVO));

        return new ResponseEntity<>(commonResponse.getMessage(), commonResponse.getHeaders(), HttpStatus.OK);
    }

    /**
     *  댓글 조회
     * @param PostCommentVO 조회조건
     * @return 댓글 리스트
     */
    @RequestMapping(value = "/searchPostComment", method = RequestMethod.POST)
    public ResponseEntity<Message> searchPostComment(@RequestBody PostCommentVO postCommentVO) {
        logger.info("serachPostComment");
        CommonResponse commonResponse = new CommonResponse();

        commonResponse.putData("postComment", postCommentService.searchPostComment(postCommentVO));

        return new ResponseEntity<>(commonResponse.getMessage(), commonResponse.getHeaders(), HttpStatus.OK);
    }

    /**
     *  댓글 저장 (신규, 수정)
     * @param PostCommentVO 저장 댓글 데이터
     */
    @RequestMapping(value = "/savePostComment", method = {RequestMethod.POST, RequestMethod.PUT})
    public ResponseEntity<Message> savePostComment(@RequestBody PostCommentVO postCommentVO) {
        logger.info("savePostComment");
        postCommentService.savePostComment(postCommentVO);

        CommonResponse commonResponse = new CommonResponse();
        return new ResponseEntity<>(commonResponse.getMessage(), commonResponse.getHeaders(), HttpStatus.OK);
    }

    /**
     *  댓글 삭제
     * @param PostCommentVO 삭제 댓글 데이터
     */
    @RequestMapping(value = "/deletePostComment", method = RequestMethod.POST)
    public ResponseEntity<Message> deletePostComment(@RequestBody PostCommentVO postCommentVO) {
        logger.info("deletePostComment");

        postCommentService.deletePostComment(postCommentVO);
        CommonResponse commonResponse = new CommonResponse();
        return new ResponseEntity<>(commonResponse.getMessage(), commonResponse.getHeaders(), HttpStatus.OK);
    }
}
