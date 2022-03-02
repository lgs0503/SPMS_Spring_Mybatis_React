package lgs.com.code.controller;

import lgs.com.code.service.CodeService;
import lgs.com.code.vo.CodeVO;
import lgs.com.utill.CommonResponse;
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
    @RequestMapping(value = "/codeList", method = RequestMethod.POST)
    public ResponseEntity<Message> codeList(@RequestBody CodeVO codeVO) {
        logger.info("codeList");
        CommonResponse commonResponse = new CommonResponse();

        commonResponse.putData("codeList", codeService.codeList(codeVO));
        commonResponse.putData("codeCnt", codeService.codeCnt(codeVO));

        return new ResponseEntity<>(commonResponse.getMessage(), commonResponse.getHeaders(), HttpStatus.OK);
    }

    /**
     *  코드 조회
     * @param CodeVO 조회조건
     * @return 코드 리스트
     */
    @RequestMapping(value = "/searchCode", method = RequestMethod.POST)
    public ResponseEntity<Message> searchCode(@RequestBody CodeVO codeVO) {
        logger.info("serachCode");
        CommonResponse commonResponse = new CommonResponse();

        commonResponse.putData("code", codeService.searchCode(codeVO));

        return new ResponseEntity<>(commonResponse.getMessage(), commonResponse.getHeaders(), HttpStatus.OK);
    }

    /**
     *  코드 저장 (신규, 수정)
     * @param CodeVO 저장 코드 데이터
     */
    @RequestMapping(value = "/saveCode", method = {RequestMethod.POST, RequestMethod.PUT})
    public ResponseEntity<Message> saveCode(@RequestBody CodeVO codeVO) {
        logger.info("saveCode");
        codeService.saveCode(codeVO);

        CommonResponse commonResponse = new CommonResponse();
        return new ResponseEntity<>(commonResponse.getMessage(), commonResponse.getHeaders(), HttpStatus.OK);
    }

    /**
     *  코드 삭제
     * @param CodeVO 삭제 코드 데이터
     */
    @RequestMapping(value = "/deleteCode", method = RequestMethod.POST)
    public ResponseEntity<Message> deleteCode(@RequestBody CodeVO codeVO) {
        logger.info("deleteCode");

        codeService.deleteCode(codeVO);
        CommonResponse commonResponse = new CommonResponse();
        return new ResponseEntity<>(commonResponse.getMessage(), commonResponse.getHeaders(), HttpStatus.OK);
    }
}
