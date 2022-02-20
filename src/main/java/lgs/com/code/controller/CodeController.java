package lgs.com.code.controller;

import lgs.com.code.service.CodeService;
import lgs.com.code.vo.CodeVO;
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
import org.springframework.web.servlet.ModelAndView;

import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Map;

@Controller
public class CodeController {

    private static final Logger logger = LoggerFactory.getLogger(CodeController.class);

    @Autowired
    CodeService codeService;

    /**
     *  코드 리스트 조회
     * @param CodeVO 조회조건
     * @return 코드 리스트
     */
    @RequestMapping(value = "/codeList", method = RequestMethod.GET)
    public ResponseEntity<Message> codeList(@RequestBody CodeVO codeVO) {
        logger.info("codeList");
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        Map<String, Object> data = new HashMap<String, Object>();

        message.setStatus(StatusEnum.OK);
        data.put("codeList", codeService.codeList(codeVO));
        data.put("codeCnt", codeService.codeCnt(codeVO));
        message.setData(data);

        return new ResponseEntity<>(message, headers, HttpStatus.OK);
    }

    /**
     *  코드 조회
     * @param CodeVO 조회조건
     * @return 코드 리스트
     */
    @RequestMapping(value = "/serachCode", method = RequestMethod.GET)
    public ResponseEntity<Message> serachCode(@RequestBody CodeVO codeVO) {
        logger.info("serachCode");
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        Map<String, Object> data = new HashMap<String, Object>();

        message.setStatus(StatusEnum.OK);
        data.put("code", codeService.serachCode(codeVO));
        message.setData(data);

        return new ResponseEntity<>(message, headers, HttpStatus.OK);
    }

    /**
     *  코드 저장 (신규, 수정)
     * @param CodeVO 저장 코드 데이터
     */
    @RequestMapping(value = "/saveCode", method = {RequestMethod.POST, RequestMethod.PUT})
    public ResponseEntity<Message> saveCode(@RequestBody CodeVO codeVO) {
        logger.info("saveCode");
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        codeService.saveCode(codeVO);
        message.setStatus(StatusEnum.OK);
        return new ResponseEntity<>(message, headers, HttpStatus.OK);
    }

    /**
     *  코드 삭제
     * @param CodeVO 삭제 코드 데이터
     */
    @RequestMapping(value = "/deleteCode", method = RequestMethod.DELETE)
    public ResponseEntity<Message> deleteCode(@RequestBody CodeVO codeVO) {
        logger.info("deleteCode");
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        codeService.deleteCode(codeVO);
        message.setStatus(StatusEnum.OK);
        return new ResponseEntity<>(message, headers, HttpStatus.OK);
    }
}
