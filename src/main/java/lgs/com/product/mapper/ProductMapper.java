package lgs.com.product.mapper;

import lgs.com.product.vo.ProductVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface ProductMapper {

	public List<ProductVO> productList(ProductVO userVO);
	
}