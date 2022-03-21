package lgs.com.menu.controller;

import lgs.com.menu.service.MenuService;
import lgs.com.menu.vo.MenuVO;
import lgs.com.utill.CommonResponse;
import lgs.com.utill.vo.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class MenuController {

    private static final Logger logger = LoggerFactory.getLogger(MenuController.class);

    @Autowired
    MenuService menuService;

    /**
     *  메뉴 리스트 조회
     * @param MenuVO 조회조건
     * @return 메뉴 리스트
     */
    @RequestMapping(value = "/menuList", method = RequestMethod.POST)
    public ResponseEntity<Message> menuList(@RequestBody MenuVO menuVO) {
        logger.info("menuList");
        CommonResponse commonResponse = new CommonResponse();

        commonResponse.putData("menuList", menuService.menuList(menuVO));
        commonResponse.putData("menuCnt", menuService.menuCnt(menuVO));

        return new ResponseEntity<>(commonResponse.getMessage(), commonResponse.getHeaders(), HttpStatus.OK);
    }

    /**
     *  메뉴 조회
     * @param MenuVO 조회조건
     * @return 메뉴 리스트
     */
    @RequestMapping(value = "/searchMenu", method = RequestMethod.POST)
    public ResponseEntity<Message> searchMenu(@RequestBody MenuVO menuVO) {
        logger.info("serachMenu");
        CommonResponse commonResponse = new CommonResponse();

        commonResponse.putData("menu", menuService.searchMenu(menuVO));

        return new ResponseEntity<>(commonResponse.getMessage(), commonResponse.getHeaders(), HttpStatus.OK);
    }

    /**
     *  메뉴 저장 (신규, 수정)
     * @param MenuVO 저장 메뉴 데이터
     */
    @RequestMapping(value = "/saveMenu", method = {RequestMethod.POST, RequestMethod.PUT})
    public ResponseEntity<Message> saveMenu(@RequestBody MenuVO menuVO) {
        logger.info("saveMenu");
        menuService.saveMenu(menuVO);

        CommonResponse commonResponse = new CommonResponse();
        return new ResponseEntity<>(commonResponse.getMessage(), commonResponse.getHeaders(), HttpStatus.OK);
    }

    /**
     *  메뉴 삭제
     * @param MenuVO 삭제 메뉴 데이터
     */
    @RequestMapping(value = "/deleteMenu", method = RequestMethod.POST)
    public ResponseEntity<Message> deleteMenu(@RequestBody MenuVO menuVO) {
        logger.info("deleteMenu");

        menuService.deleteMenu(menuVO);
        CommonResponse commonResponse = new CommonResponse();
        return new ResponseEntity<>(commonResponse.getMessage(), commonResponse.getHeaders(), HttpStatus.OK);
    }
}
