package lgs.com.product.service;

import lgs.com.product.mapper.ProductMapper;
import lgs.com.product.vo.ProductVO;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private SqlSessionFactory sqlSessionFactory;

    @Override
    public List<ProductVO> productList(ProductVO userVO) {
        List<ProductVO> result = new ArrayList<ProductVO>();

        try (SqlSession session = sqlSessionFactory.openSession()) {
            ProductMapper mapper = session.getMapper(ProductMapper.class);

            result = mapper.productList(userVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
