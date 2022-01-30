package lgs.com.main.controller;

import org.junit.Test;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import lombok.extern.log4j.Log4j;

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
    public void loginPage() throws Exception {
        mockMvc.perform(get("/login")).andExpect(status().isOk())
                .andExpect(view().name("login"))
                .andExpect(handler().handlerType(MainController.class))
                .andExpect(handler().methodName("loginPage"));
    }

    @Test
    public void loginProcessing() throws Exception  {
        mockMvc.perform(post("/loginProcessing")).andExpect(status().isOk());
    }

    @Test
    public void registerProcessing() throws Exception {
        mockMvc.perform(post("/registerProcessing")).andExpect(status().isOk());
    }
}