package lgs.com.banner.service;

import lgs.com.banner.mapper.BannerMapper;
import lgs.com.banner.vo.BannerVO;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BannerServiceImpl implements BannerService {

    @Autowired
    private SqlSessionFactory sqlSessionFactory;

    @Override
    public List<BannerVO> bannerList(BannerVO bannerVO) {
        List<BannerVO> result = new ArrayList<BannerVO>();

        try (SqlSession session = sqlSessionFactory.openSession()) {
            BannerMapper mapper = session.getMapper(BannerMapper.class);

            result = mapper.bannerList(bannerVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    @Override
    public BannerVO searchBanner(BannerVO bannerVO) {
        BannerVO result = new BannerVO();

        try (SqlSession session = sqlSessionFactory.openSession()) {
            BannerMapper mapper = session.getMapper(BannerMapper.class);

            result = mapper.searchBanner(bannerVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    @Override
    public int bannerCnt(BannerVO bannerVO) {
        int result = 0;

        try (SqlSession session = sqlSessionFactory.openSession()) {
            BannerMapper mapper = session.getMapper(BannerMapper.class);

            result = mapper.bannerCnt(bannerVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    @Override
    public void saveBanner(BannerVO bannerVO) {

        try (SqlSession session = sqlSessionFactory.openSession()) {
            BannerMapper mapper = session.getMapper(BannerMapper.class);

            mapper.saveBanner(bannerVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteBanner(BannerVO bannerVO) {
        try (SqlSession session = sqlSessionFactory.openSession()) {
            BannerMapper mapper = session.getMapper(BannerMapper.class);

            mapper.deleteBanner(bannerVO);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
