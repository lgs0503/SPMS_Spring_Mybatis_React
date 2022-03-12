package lgs.com.banner.controller;

import lgs.com.banner.service.BannerService;
import lgs.com.banner.vo.BannerVO;
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
    @RequestMapping(value = "/bannerList", method = RequestMethod.POST)
    public ResponseEntity<Message> bannerList(@RequestBody BannerVO bannerVO) {
        logger.info("bannerList");
        CommonResponse commonResponse = new CommonResponse();

        commonResponse.putData("bannerList", bannerService.bannerList(bannerVO));
        commonResponse.putData("bannerCnt", bannerService.bannerCnt(bannerVO));

        return new ResponseEntity<>(commonResponse.getMessage(), commonResponse.getHeaders(), HttpStatus.OK);
    }

    /**
     *  배너 조회
     * @param BannerVO 조회조건
     * @return 배너 리스트
     */
    @RequestMapping(value = "/searchBanner", method = RequestMethod.POST)
    public ResponseEntity<Message> searchBanner(@RequestBody BannerVO bannerVO) {
        logger.info("searchBanner");
        CommonResponse commonResponse = new CommonResponse();

        commonResponse.putData("banner", bannerService.searchBanner(bannerVO));

        return new ResponseEntity<>(commonResponse.getMessage(), commonResponse.getHeaders(), HttpStatus.OK);
    }

    /**
     *  배너 저장 (신규, 수정)
     * @param BannerVO 저장 배너 데이터
     */
    @RequestMapping(value = "/saveBanner", method = {RequestMethod.POST, RequestMethod.PUT})
    public ResponseEntity<Message> saveBanner(@RequestBody BannerVO bannerVO) {
        logger.info("saveBanner");

        bannerService.saveBanner(bannerVO);
        CommonResponse commonResponse = new CommonResponse();
        return new ResponseEntity<>(commonResponse.getMessage(), commonResponse.getHeaders(), HttpStatus.OK);
    }

    /**
     *  배너 삭제
     * @param BannerVO 삭제 배너 데이터
     */
    @RequestMapping(value = "/deleteBanner", method = RequestMethod.POST)
    public ResponseEntity<Message> deleteBanner(@RequestBody BannerVO bannerVO) {
        logger.info("deleteBanner");

        bannerService.deleteBanner(bannerVO);
        CommonResponse commonResponse = new CommonResponse();
        return new ResponseEntity<>(commonResponse.getMessage(), commonResponse.getHeaders(), HttpStatus.OK);
    }
}
