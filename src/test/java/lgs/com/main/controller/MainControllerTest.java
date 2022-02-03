package lgs.com.main.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import lgs.com.main.vo.UserVO;
import org.junit.Test;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import lombok.extern.log4j.Log4j;

import java.nio.charset.Charset;

@WebAppConfiguration
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({
        "file:src/main/webapp/WEB-INF/spring/config/*.xml",
        "file:src/main/webapp/WEB-INF/spring/**/appServlet/servlet-context.xml"
})
@Log4j
public class MainControllerTest {

    private static final Logger logger = LoggerFactory.getLogger(MainControllerTest.class);

    @Autowired
    private WebApplicationContext ctx;

    private MockMvc mockMvc;

    private UserVO userVO = new UserVO();

    private ObjectMapper mapper = new ObjectMapper();

    private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(),
            Charset.forName("utf8"));

    @Before
    public void setup() {
        logger.debug("setup");
        mockMvc = MockMvcBuilders.webAppContextSetup(ctx).build();
    }

    @Test
    public void mainPage() throws Exception {
        mockMvc.perform(get("/")).andExpect(status().isOk())
                .andExpect(view().name("index"))
                .andExpect(handler().handlerType(MainController.class))
                .andExpect(handler().methodName("mainPage"));
    }

    @Test
    public void loginProcessing() throws Exception  {
        /* 로그인 계정 */
        userVO.setUserId("lgs0503");
        userVO.setPassword("0609");

        mockMvc.perform(post("/loginProcessing")
                .contentType(contentType)
                .content(mapper.writeValueAsString(userVO)))
                .andExpect(status().isOk())
                .andExpect(view().name("jsonView"))
                .andExpect(handler().handlerType(MainController.class))
                .andExpect(handler().methodName("loginProcessing"))
                .andExpect(content().string("{\"loginStatus\":1}"));
    }

    @Test
    public void registerProcessing() throws Exception {
        /* 회원가입 계정 */
        userVO.setUserId("lgs0503테스터");
        userVO.setPassword("0609테스터");
        userVO.setUserName("테스터");
        userVO.setAge(20);
        userVO.setDeleted("0");
        userVO.setEmail("test@naver.com");
        userVO.setGender("1");
        userVO.setImageFileNo("3");
        userVO.setLocation("테스트 주소");
        userVO.setLocationDetail("테스트 상세주소");
        userVO.setPhoneNum("01012347235");
        userVO.setRule("admin");

        mockMvc.perform(post("/registerProcessing")
                .contentType(contentType)
                .content(mapper.writeValueAsString(userVO)))
                .andExpect(status().isOk())
                .andExpect(view().name("jsonView"))
                .andExpect(handler().handlerType(MainController.class))
                .andExpect(handler().methodName("registerProcessing"))
                .andExpect(content().string("{\"registerStatus\":1}"));
    }

    @Test
    public void userIdCheck()  throws Exception {
        /* 중복확인 계정 */
        userVO.setUserId("lgs0503테스터");

        mockMvc.perform(get("/userIdCheck")
                .contentType(contentType)
                .content(mapper.writeValueAsString(userVO)))
                .andExpect(status().isOk())
                .andExpect(view().name("jsonView"))
                .andExpect(handler().handlerType(MainController.class))
                .andExpect(handler().methodName("userIdCheck"))
                .andExpect(content().string("{\"idCheckStatus\":1}"));
    }

}