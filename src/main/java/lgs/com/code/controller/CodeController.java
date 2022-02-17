package lgs.com.code.controller;

import lgs.com.code.service.CodeService;
import lgs.com.code.vo.CodeVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

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
    public ModelAndView codeList(@RequestBody CodeVO codeVO) {
        logger.info("codeList");
        ModelAndView mv = new ModelAndView();

        mv.addObject("productList", codeService.codeList(codeVO));
        mv.addObject("productCnt", codeService.codeCnt(codeVO));
        mv.setViewName("jsonView");
        return mv;
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
