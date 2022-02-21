package lgs.com.post.controller;

import lgs.com.post.service.PostService;
import lgs.com.post.vo.PostVO;
import lgs.com.utill.StatusEnum;
import lgs.com.utill.vo.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Map;

@Controller
public class PostController {

    private static final Logger logger = LoggerFactory.getLogger(PostController.class);

    @Autowired
    PostService postService;

    /**
     *  게시글 리스트 조회
     * @param PostVO 조회조건
     * @return 게시글 리스트
     */
    @RequestMapping(value = "/postList", method = RequestMethod.GET)
    public ResponseEntity<Message> postList(@RequestBody PostVO postVO) {
        logger.info("postList");
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        Map<String, Object> data = new HashMap<String, Object>();

        message.setStatus(StatusEnum.OK);
        data.put("postList", postService.postList(postVO));
        data.put("postCnt", postService.postCnt(postVO));
        message.setData(data);

        return new ResponseEntity<>(message, headers, HttpStatus.OK);
    }

    /**
     *  게시글 조회
     * @param PostVO 조회조건
     * @return 게시글 리스트
     */
    @RequestMapping(value = "/searchPost", method = RequestMethod.GET)
    public ResponseEntity<Message> searchPost(@RequestBody PostVO postVO) {
        logger.info("searchPost");
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        Map<String, Object> data = new HashMap<String, Object>();

        message.setStatus(StatusEnum.OK);
        data.put("post", postService.searchPost(postVO));
        message.setData(data);

        return new ResponseEntity<>(message, headers, HttpStatus.OK);
    }

    /**
     *  게시글 viewCnt +1
     * @param PostVO 수정 게시글 데이터
     */
    @RequestMapping(value = "/updateViewCnt", method = {RequestMethod.PUT})
    public ResponseEntity<Message> updateViewCnt(@RequestBody PostVO postVO) {
        logger.info("updateViewCnt");
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        postService.updateViewCnt(postVO);
        message.setStatus(StatusEnum.OK);
        return new ResponseEntity<>(message, headers, HttpStatus.OK);
    }

    /**
     *  게시글 저장 (신규, 수정)
     * @param PostVO 저장 게시글 데이터
     */
    @RequestMapping(value = "/savePost", method = {RequestMethod.POST, RequestMethod.PUT})
    public ResponseEntity<Message> savePost(@RequestBody PostVO postVO) {
        logger.info("savePost");
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        postService.savePost(postVO);
        message.setStatus(StatusEnum.OK);
        return new ResponseEntity<>(message, headers, HttpStatus.OK);
    }

    /**
     *  게시글 삭제
     * @param PostVO 삭제 게시글 데이터
     */
    @RequestMapping(value = "/deletePost", method = RequestMethod.DELETE)
    public ResponseEntity<Message> deletePost(@RequestBody PostVO postVO) {
        logger.info("deletePost");
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        postService.deletePost(postVO);
        message.setStatus(StatusEnum.OK);
        return new ResponseEntity<>(message, headers, HttpStatus.OK);
    }
}
