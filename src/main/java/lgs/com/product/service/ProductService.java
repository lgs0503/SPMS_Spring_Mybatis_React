package lgs.com.product.service;

import lgs.com.product.vo.ProductVO;

import java.util.List;

public interface ProductService {

    public List<ProductVO> productList(ProductVO productVO);
    public int productCnt(ProductVO productVO);
    public void saveProduct(ProductVO productVO);
    public void deleteProduct(ProductVO productVO);

}
