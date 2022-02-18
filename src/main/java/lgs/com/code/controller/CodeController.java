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

        message.setStatus(StatusEnum.OK);
        message.setMessage("성공 코드");
        message.setData(codeService.codeList(codeVO));

        return new ResponseEntity<>(message, headers, HttpStatus.OK);
/*
        ModelAndView mv = new ModelAndView();

        mv.addObject("codeList", );
        mv.addObject("codeCnt", codeService.codeCnt(codeVO));
        mv.setViewName("jsonView");
        return mv;*/
    }

    /**
     *  제품 저장 (신규, 수정)
     * @param CodeVO 저장 제품 데이터
     */
    @RequestMapping(value = "/saveCode", method = {RequestMethod.POST, RequestMethod.PUT})
    public void saveCode(@RequestBody CodeVO codeVO) {
        logger.info("saveCode");
        codeService.saveCode(codeVO);
    }

    /**
     *  제품 삭제
     * @param CodeVO 삭제 제품 데이터
     */
    @RequestMapping(value = "/deleteCode", method = RequestMethod.DELETE)
    public void deleteCode(@RequestBody CodeVO codeVO) {
        logger.info("deleteCode");
        codeService.deleteCode(codeVO);
    }
}
