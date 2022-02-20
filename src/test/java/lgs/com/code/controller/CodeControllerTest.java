package lgs.com.code.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import lgs.com.code.vo.CodeVO;
import lgs.com.main.controller.MainController;
import lgs.com.main.controller.MainControllerTest;
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

import java.lang.reflect.Array;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebAppConfiguration
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({
        "file:src/main/webapp/WEB-INF/spring/config/*.xml",
        "file:src/main/webapp/WEB-INF/spring/**/appServlet/servlet-context.xml"
})
@Log4j
public class CodeControllerTest {

    private static final Logger logger = LoggerFactory.getLogger(MainControllerTest.class);

    @Autowired
    private WebApplicationContext ctx;

    private MockMvc mockMvc;

    private CodeVO codeVO = new CodeVO();

    private ObjectMapper mapper = new ObjectMapper();

    private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(),
            Charset.forName("utf8"));

    @Autowired
    private CodeController codeController;

    @Before
    public void setup() {
        logger.debug("setup");
        mockMvc = MockMvcBuilders.webAppContextSetup(ctx).build();
    }

    @Test
    public void codeList()  throws Exception  {
        codeVO.setCodeId(null);

        mockMvc.perform(get("/codeList")
                .contentType(contentType)
                .content(mapper.writeValueAsString(codeVO)))
                .andExpect(status().isOk())
                /*.andExpect(view().name("jsonView"))*/
                .andExpect(handler().handlerType(CodeController.class))
                .andExpect(handler().methodName("codeList"));

        ResponseEntity<Message> re = codeController.codeList(codeVO);

        Map<String, Object> data = (Map<String, Object>) re.getBody().getData();

        System.out.println("codeList:"+data.get("codeList"));
        System.out.println("codeCnt:"+data.get("codeCnt"));
    }

    @Test
    public void serachCode() throws Exception  {
        codeVO.setCodeId("T000");

        mockMvc.perform(get("/serachCode")
                .contentType(contentType)
                .content(mapper.writeValueAsString(codeVO)))
                .andExpect(status().isOk())
                /*.andExpect(view().name("jsonView"))*/
                .andExpect(handler().handlerType(CodeController.class))
                .andExpect(handler().methodName("serachCode"));

        ResponseEntity<Message> re = codeController.serachCode(codeVO);

        Map<String, Object> data = (Map<String, Object>) re.getBody().getData();

        System.out.println("code:"+data.get("code"));

    }

    @Test
    public void saveCode() throws Exception  {
        codeVO.setCodeId("T000");
        codeVO.setCodeInfo("테스트");
        codeVO.setCodeName("테스트코드");
        codeVO.setDeleted("0");
        codeVO.setUpperCodeId("TEST");
        codeVO.setCodeValue("0");
        codeVO.setUseYn("Y");

        mockMvc.perform(put("/saveCode")
                .contentType(contentType)
                .content(mapper.writeValueAsString(codeVO)))
                .andExpect(status().isOk())
                /*.andExpect(view().name("jsonView"))*/
                .andExpect(handler().handlerType(CodeController.class))
                .andExpect(handler().methodName("saveCode"));

    }

    @Test
    public void deleteCode() throws Exception  {
        ArrayList<String> deletes = new ArrayList<String>();
        deletes.add("T001");
        codeVO.setCodeIds(deletes);

        mockMvc.perform(delete("/deleteCode")
                .contentType(contentType)
                .content(mapper.writeValueAsString(codeVO)))
                .andExpect(status().isOk())
                /*.andExpect(view().name("jsonView"))*/
                .andExpect(handler().handlerType(CodeController.class))
                .andExpect(handler().methodName("deleteCode"));
    }
}