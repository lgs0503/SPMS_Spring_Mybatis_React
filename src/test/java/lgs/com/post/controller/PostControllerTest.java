package lgs.com.post.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import lgs.com.code.controller.CodeController;
import lgs.com.main.controller.MainControllerTest;
import lgs.com.popup.controller.PopupController;
import lgs.com.post.vo.PostVO;
import lgs.com.utill.vo.Message;
import lombok.extern.log4j.Log4j;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Map;

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.handler;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebAppConfiguration
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({
        "file:src/main/webapp/WEB-INF/spring/config/*.xml",
        "file:src/main/webapp/WEB-INF/spring/**/appServlet/servlet-context.xml"
})
@Log4j
public class PostControllerTest {
    private static final Logger logger = LoggerFactory.getLogger(MainControllerTest.class);

    @Autowired
    private WebApplicationContext ctx;

    private MockMvc mockMvc;

    private PostVO postVO = new PostVO();

    private ObjectMapper mapper = new ObjectMapper();

    private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(),
            Charset.forName("utf8"));

    @Autowired
    private PostController postController;

    @Before
    public void setup() {
        logger.debug("setup");
        mockMvc = MockMvcBuilders.webAppContextSetup(ctx).build();
    }

    @Test
    public void postList() throws Exception{
        postVO.setPostId(null);

        mockMvc.perform(get("/postList")
                .contentType(contentType)
                .content(mapper.writeValueAsString(postVO)))
                .andExpect(status().isOk())
                /*.andExpect(view().name("jsonView"))*/
                .andExpect(handler().handlerType(PostController.class))
                .andExpect(handler().methodName("postList"));

        ResponseEntity<Message> re = postController.postList(postVO);

        Map<String, Object> data = (Map<String, Object>) re.getBody().getData();

        System.out.println("postList:"+data.get("postList"));
        System.out.println("postCnt:"+data.get("postCnt"));
    }

    @Test
    public void searchPost() throws Exception {
        postVO.setPostId("1");

        mockMvc.perform(get("/searchPost")
                .contentType(contentType)
                .content(mapper.writeValueAsString(postVO)))
                .andExpect(status().isOk())
                /*.andExpect(view().name("jsonView"))*/
                .andExpect(handler().handlerType(PostController.class))
                .andExpect(handler().methodName("searchPost"));

        ResponseEntity<Message> re = postController.searchPost(postVO);

        Map<String, Object> data = (Map<String, Object>) re.getBody().getData();

        System.out.println("post:"+data.get("post"));
    }

    @Test
    public void updateViewCnt() throws Exception {
        postVO.setPostId("1");

        mockMvc.perform(get("/updateViewCnt")
                .contentType(contentType)
                .content(mapper.writeValueAsString(postVO)))
                .andExpect(status().isOk())
                /*.andExpect(view().name("jsonView"))*/
                .andExpect(handler().handlerType(PostController.class))
                .andExpect(handler().methodName("updateViewCnt"));

    }

    @Test
    public void savePost() throws Exception {
        postVO.setPostId("1");
        postVO.setBoardId("1");
        postVO.setDeleted("0");
        postVO.setFileNo1("0");
        postVO.setFileNo2("0");
        postVO.setPostContent("테스트");
        postVO.setPostType("test");
        postVO.setViewCnt("0");

        mockMvc.perform(put("/savePost")
                .contentType(contentType)
                .content(mapper.writeValueAsString(postVO)))
                .andExpect(status().isOk())
                /*.andExpect(view().name("jsonView"))*/
                .andExpect(handler().handlerType(PostController.class))
                .andExpect(handler().methodName("savePost"));
    }

    @Test
    public void deletePost() throws Exception {
        ArrayList<String> deletes = new ArrayList<String>();
        deletes.add("1");
        postVO.setPostIds(deletes);

        mockMvc.perform(delete("/deletePost")
                .contentType(contentType)
                .content(mapper.writeValueAsString(postVO)))
                .andExpect(status().isOk())
                /*.andExpect(view().name("jsonView"))*/
                .andExpect(handler().handlerType(PostController.class))
                .andExpect(handler().methodName("deletePost"));
    }
}