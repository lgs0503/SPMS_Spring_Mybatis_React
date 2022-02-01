package lgs.com.utill.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import lgs.com.utill.vo.FileVO;
import lombok.extern.log4j.Log4j;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.inject.Inject;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebAppConfiguration
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({
        "file:src/main/webapp/WEB-INF/spring/config/*.xml",
        "file:src/main/webapp/WEB-INF/spring/**/appServlet/servlet-context.xml"
})
@Log4j
public class FileControllerTest {

    private static final Logger logger = LoggerFactory.getLogger(FileControllerTest.class);

    @Autowired
    private WebApplicationContext ctx;

    @Inject
    private FileController fileController;

    @Autowired
    String uploadPath;

    private MockMvc mockMvc;

    private FileVO fileVO = new FileVO();

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
    public void fileUpload() throws Exception {
        /*
        * 업로드 테스트파일
        * */
        MockMultipartFile multipartFile1 = new MockMultipartFile("file", "test.txt", "text/plain", "test file".getBytes(StandardCharsets.UTF_8) );
        MockMultipartFile multipartFile2 = new MockMultipartFile("file", "test2.txt", "text/plain", "test file2".getBytes(StandardCharsets.UTF_8) );

        mockMvc.perform(multipart("/file/upload")
                        .file(multipartFile1)
                        .file(multipartFile2)
                        .with(requestPostProcessor -> {
                            requestPostProcessor.setMethod("POST");
                            return requestPostProcessor;
                        })
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isOk())
                .andExpect(view().name("jsonView"))
                .andExpect(handler().handlerType(FileController.class))
                .andExpect(handler().methodName("fileUpload"));
    }

    @Test
    public void download() throws Exception {
        /*
        * 다운로드 파일번호
        * */
        fileVO.setFileNo("1");

        mockMvc.perform(post("/file/download")
                .contentType(contentType)
                .content(mapper.writeValueAsString(fileVO)))
                .andExpect(status().isOk())
                .andExpect(handler().handlerType(FileController.class))
                .andExpect(handler().methodName("download"));
    }

    @Test
    public void makeDirectories() throws Exception {
        /* 폴더생성 true 실패 false */
        assertTrue(fileController.makeDirectories(uploadPath));
    }
}