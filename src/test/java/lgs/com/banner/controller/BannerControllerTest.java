package lgs.com.banner.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import lgs.com.banner.vo.BannerVO;
import lgs.com.main.controller.MainControllerTest;
import lgs.com.utill.vo.Message;
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
public class BannerControllerTest {

    private static final Logger logger = LoggerFactory.getLogger(MainControllerTest.class);

    @Autowired
    private WebApplicationContext ctx;

    private MockMvc mockMvc;

    private BannerVO bannerVO = new BannerVO();

    private ObjectMapper mapper = new ObjectMapper();

    private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(),
            Charset.forName("utf8"));

    @Autowired
    private BannerController bannerController;

    @Before
    public void setup() {
        logger.debug("setup");
        mockMvc = MockMvcBuilders.webAppContextSetup(ctx).build();
    }

    @Test
    public void bannerList() throws Exception   {
        bannerVO.setBannerId(null);

        mockMvc.perform(post("/bannerList")
                .contentType(contentType)
                .content(mapper.writeValueAsString(bannerVO)))
                .andExpect(status().isOk())
                /*.andExpect(view().name("jsonView"))*/
                .andExpect(handler().handlerType(BannerController.class))
                .andExpect(handler().methodName("bannerList"));

        ResponseEntity<Message> re = bannerController.bannerList(bannerVO);

        Map<String, Object> data = (Map<String, Object>) re.getBody().getData();

        System.out.println("bannerList:"+data.get("bannerList"));
        System.out.println("bannerCnt:"+data.get("bannerCnt"));
    }

    @Test
    public void searchBanner() throws Exception   {
        bannerVO.setBannerId("1");

        mockMvc.perform(post("/searchBanner")
                .contentType(contentType)
                .content(mapper.writeValueAsString(bannerVO)))
                .andExpect(status().isOk())
                /*.andExpect(view().name("jsonView"))*/
                .andExpect(handler().handlerType(BannerController.class))
                .andExpect(handler().methodName("searchBanner"));

        ResponseEntity<Message> re = bannerController.searchBanner(bannerVO);

        Map<String, Object> data = (Map<String, Object>) re.getBody().getData();

        System.out.println("banner:"+data.get("banner"));

    }

    @Test
    public void saveBanner() throws Exception   {
        bannerVO.setBannerId("1");
        bannerVO.setBannerContent("테스트");
        bannerVO.setBannerImageNo("5");
        bannerVO.setBannerStatus("0");
        bannerVO.setBannerTitle("배너");
        bannerVO.setUseYn("Y");

        mockMvc.perform(post("/saveBanner")
                .contentType(contentType)
                .content(mapper.writeValueAsString(bannerVO)))
                .andExpect(status().isOk())
                /*.andExpect(view().name("jsonView"))*/
                .andExpect(handler().handlerType(BannerController.class))
                .andExpect(handler().methodName("saveBanner"));
    }

    @Test
    public void deleteBanner() throws Exception   {
        ArrayList<String> deletes = new ArrayList<String>();
        deletes.add("1");
        bannerVO.setBannerIds(deletes);

        mockMvc.perform(post("/deleteBanner")
                .contentType(contentType)
                .content(mapper.writeValueAsString(bannerVO)))
                .andExpect(status().isOk())
                /*.andExpect(view().name("jsonView"))*/
                .andExpect(handler().handlerType(BannerController.class))
                .andExpect(handler().methodName("deleteBanner"));
    }
}