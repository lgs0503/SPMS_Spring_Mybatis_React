package lgs.com.product.controller;

import lgs.com.product.service.ProductService;
import lgs.com.product.vo.ProductVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
public class ProductController {
	
	private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

	@Autowired
	ProductService productService;

	/**
	 *  제품 화면 으로 이동
	 */
	@RequestMapping(value = "/product", method = RequestMethod.GET)
	public String productPage(Model model) {
		logger.info("productPage");

		return "/product/list";
	}


	/**
	*  제품 리스트 조회
	 * @param ProductVO 조회조건
	 * @return 제품 리스트
	*/
	@RequestMapping(value = "/productList", method = RequestMethod.GET)
	public ModelAndView productList(@RequestBody ProductVO productVO) {
		logger.info("productList");
		ModelAndView mv = new ModelAndView();

		mv.addObject("productList", productService.productList(productVO));
		mv.addObject("productCnt", productService.productCnt(productVO));
		mv.setViewName("jsonView");
		return mv;
	}
}
