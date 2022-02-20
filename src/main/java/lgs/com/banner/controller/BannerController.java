package lgs.com.banner.controller;

import lgs.com.banner.service.BannerService;
import lgs.com.banner.vo.BannerVO;
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
public class BannerController {

    private static final Logger logger = LoggerFactory.getLogger(BannerController.class);

    @Autowired
    BannerService bannerService;

    /**
     *  배너 리스트 조회
     * @param BannerVO 조회조건
     * @return 배너 리스트
     */
    @RequestMapping(value = "/bannerList", method = RequestMethod.GET)
    public ResponseEntity<Message> bannerList(@RequestBody BannerVO bannerVO) {
        logger.info("bannerList");
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        Map<String, Object> data = new HashMap<String, Object>();

        message.setStatus(StatusEnum.OK);
        data.put("bannerList", bannerService.bannerList(bannerVO));
        data.put("bannerCnt", bannerService.bannerCnt(bannerVO));
        message.setData(data);

        return new ResponseEntity<>(message, headers, HttpStatus.OK);
    }

    /**
     *  배너 조회
     * @param BannerVO 조회조건
     * @return 배너 리스트
     */
    @RequestMapping(value = "/serachBanner", method = RequestMethod.GET)
    public ResponseEntity<Message> serachBanner(@RequestBody BannerVO bannerVO) {
        logger.info("serachBanner");
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        Map<String, Object> data = new HashMap<String, Object>();

        message.setStatus(StatusEnum.OK);
        data.put("banner", bannerService.serachBanner(bannerVO));
        message.setData(data);

        return new ResponseEntity<>(message, headers, HttpStatus.OK);
    }

    /**
     *  배너 저장 (신규, 수정)
     * @param BannerVO 저장 배너 데이터
     */
    @RequestMapping(value = "/saveBanner", method = {RequestMethod.POST, RequestMethod.PUT})
    public ResponseEntity<Message> saveBanner(@RequestBody BannerVO bannerVO) {
        logger.info("saveBanner");
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        bannerService.saveBanner(bannerVO);
        message.setStatus(StatusEnum.OK);
        return new ResponseEntity<>(message, headers, HttpStatus.OK);
    }

    /**
     *  배너 삭제
     * @param BannerVO 삭제 배너 데이터
     */
    @RequestMapping(value = "/deleteBanner", method = RequestMethod.DELETE)
    public ResponseEntity<Message> deleteBanner(@RequestBody BannerVO bannerVO) {
        logger.info("deleteBanner");
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        bannerService.deleteBanner(bannerVO);
        message.setStatus(StatusEnum.OK);
        return new ResponseEntity<>(message, headers, HttpStatus.OK);
    }
}
