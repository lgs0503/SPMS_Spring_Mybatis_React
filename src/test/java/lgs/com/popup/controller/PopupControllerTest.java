package lgs.com.popup.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import lgs.com.banner.controller.BannerController;
import lgs.com.main.controller.MainControllerTest;
import lgs.com.popup.vo.PopupVO;
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
public class PopupControllerTest {

    private static final Logger logger = LoggerFactory.getLogger(MainControllerTest.class);

    @Autowired
    private WebApplicationContext ctx;

    private MockMvc mockMvc;

    private PopupVO popupVO = new PopupVO();

    private ObjectMapper mapper = new ObjectMapper();

    private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(),
            Charset.forName("utf8"));

    @Autowired
    private PopupController popupController;

    @Before
    public void setup() {
        logger.debug("setup");
        mockMvc = MockMvcBuilders.webAppContextSetup(ctx).build();
    }

    @Test
    public void popupList() throws Exception {
        popupVO.setPopupId(null);

        mockMvc.perform(get("/popupList")
                .contentType(contentType)
                .content(mapper.writeValueAsString(popupVO)))
                .andExpect(status().isOk())
                /*.andExpect(view().name("jsonView"))*/
                .andExpect(handler().handlerType(PopupController.class))
                .andExpect(handler().methodName("popupList"));

        ResponseEntity<Message> re = popupController.popupList(popupVO);

        Map<String, Object> data = (Map<String, Object>) re.getBody().getData();

        System.out.println("popupList:"+data.get("popupList"));
        System.out.println("popupCnt:"+data.get("popupCnt"));
    }

    @Test
    public void searchPopup() throws Exception {
        popupVO.setPopupId("1");

        mockMvc.perform(get("/searchPopup")
                .contentType(contentType)
                .content(mapper.writeValueAsString(popupVO)))
                .andExpect(status().isOk())
                /*.andExpect(view().name("jsonView"))*/
                .andExpect(handler().handlerType(PopupController.class))
                .andExpect(handler().methodName("searchPopup"));

        ResponseEntity<Message> re = popupController.searchPopup(popupVO);

        Map<String, Object> data = (Map<String, Object>) re.getBody().getData();

        System.out.println("popup:"+data.get("popup"));

    }

    @Test
    public void savePopup() throws Exception {
        popupVO.setPopupId("1");
        popupVO.setPopupContent("테스트");
        popupVO.setPopupImageNo("0");
        popupVO.setPopupStatus("0");
        popupVO.setPopupTitle("테스트");
        popupVO.setPopupUrl("/test");
        popupVO.setUesYn("Y");

        mockMvc.perform(put("/savePopup")
                .contentType(contentType)
                .content(mapper.writeValueAsString(popupVO)))
                .andExpect(status().isOk())
                /*.andExpect(view().name("jsonView"))*/
                .andExpect(handler().handlerType(PopupController.class))
                .andExpect(handler().methodName("savePopup"));
    }

    @Test
    public void deletePopup() throws Exception {
        ArrayList<String> deletes = new ArrayList<String>();
        deletes.add("1");
        popupVO.setPopupIds(deletes);

        mockMvc.perform(delete("/deletePopup")
                .contentType(contentType)
                .content(mapper.writeValueAsString(popupVO)))
                .andExpect(status().isOk())
                /*.andExpect(view().name("jsonView"))*/
                .andExpect(handler().handlerType(PopupController.class))
                .andExpect(handler().methodName("deletePopup"));
    }
}