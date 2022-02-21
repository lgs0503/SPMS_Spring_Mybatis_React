package lgs.com.popup.controller;

import lgs.com.popup.service.PopupService;
import lgs.com.popup.vo.PopupVO;
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

import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Map;

@Controller
public class PopupController {

    private static final Logger logger = LoggerFactory.getLogger(PopupController.class);

    @Autowired
    PopupService popuptService;

    /**
     *  팝업 리스트 조회
     * @param PopupVO 조회조건
     * @return 팝업 리스트
     */
    @RequestMapping(value = "/popupList", method = RequestMethod.GET)
    public ResponseEntity<Message> popupList(@RequestBody PopupVO popupVO) {
        logger.info("popupList");
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        Map<String, Object> data = new HashMap<String, Object>();

        message.setStatus(StatusEnum.OK);
        data.put("popupList", popuptService.popupList(popupVO));
        data.put("popupCnt", popuptService.popupCnt(popupVO));
        message.setData(data);

        return new ResponseEntity<>(message, headers, HttpStatus.OK);
    }

    /**
     *  팝업 조회
     * @param PopupVO 조회조건
     * @return 팝업 리스트
     */
    @RequestMapping(value = "/searchPopup", method = RequestMethod.GET)
    public ResponseEntity<Message> searchPopup(@RequestBody PopupVO popupVO) {
        logger.info("searchPopup");
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        Map<String, Object> data = new HashMap<String, Object>();

        message.setStatus(StatusEnum.OK);
        data.put("popup", popuptService.searchPopup(popupVO));
        message.setData(data);

        return new ResponseEntity<>(message, headers, HttpStatus.OK);
    }

    /**
     *  팝업 저장 (신규, 수정)
     * @param PopupVO 저장 팝업 데이터
     */
    @RequestMapping(value = "/savePopup", method = {RequestMethod.POST, RequestMethod.PUT})
    public ResponseEntity<Message> savePopup(@RequestBody PopupVO popupVO) {
        logger.info("savePopup");
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        popuptService.savePopup(popupVO);
        message.setStatus(StatusEnum.OK);
        return new ResponseEntity<>(message, headers, HttpStatus.OK);
    }

    /**
     *  팝업 삭제
     * @param PopupVO 삭제 팝업 데이터
     */
    @RequestMapping(value = "/deletePopup", method = RequestMethod.DELETE)
    public ResponseEntity<Message> deletePopup(@RequestBody PopupVO popupVO) {
        logger.info("deletePopup");
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        popuptService.deletePopup(popupVO);
        message.setStatus(StatusEnum.OK);
        return new ResponseEntity<>(message, headers, HttpStatus.OK);
    }
}
