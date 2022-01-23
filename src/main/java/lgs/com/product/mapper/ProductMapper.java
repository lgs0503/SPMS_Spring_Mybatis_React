package lgs.com.product.mapper;

import lgs.com.product.vo.ProductVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface ProductMapper {

	public List<ProductVO> productList(ProductVO productVO);
	public int productCnt(ProductVO productVO);
	public void saveProduct(ProductVO productVO);
	public void deleteProduct(ProductVO productVO);

}