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
    public List<ProductVO> productList(ProductVO productVO) {
        List<ProductVO> result = new ArrayList<ProductVO>();

        try (SqlSession session = sqlSessionFactory.openSession()) {
            ProductMapper mapper = session.getMapper(ProductMapper.class);

            result = mapper.productList(productVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    @Override
    public int productCnt(ProductVO productVO) {
        int result = 0;

        try (SqlSession session = sqlSessionFactory.openSession()) {
            ProductMapper mapper = session.getMapper(ProductMapper.class);

            result = mapper.productCnt(productVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    @Override
    public void saveProduct(ProductVO productVO) {

        try (SqlSession session = sqlSessionFactory.openSession()) {
            ProductMapper mapper = session.getMapper(ProductMapper.class);

            mapper.saveProduct(productVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteProduct(ProductVO productVO) {
        try (SqlSession session = sqlSessionFactory.openSession()) {
            ProductMapper mapper = session.getMapper(ProductMapper.class);

            mapper.deleteProduct(productVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
