package lgs.com.banner.service;

import lgs.com.banner.vo.BannerVO;

import java.util.List;

public interface BannerService {

    public List<BannerVO> bannerList(BannerVO codeVO);
    public BannerVO searchBanner(BannerVO codeVO);
    public int bannerCnt(BannerVO codeVO);
    public void saveBanner(BannerVO codeVO);
    public void deleteBanner(BannerVO codeVO);

}
