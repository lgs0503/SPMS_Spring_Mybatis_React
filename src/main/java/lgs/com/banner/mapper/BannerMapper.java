package lgs.com.banner.mapper;

import lgs.com.banner.vo.BannerVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface BannerMapper {

	public List<BannerVO> bannerList(BannerVO codeVO);
	public BannerVO serachBanner(BannerVO codeVO);

	public int bannerCnt(BannerVO codeVO);
	public void saveBanner(BannerVO codeVO);
	public void deleteBanner(BannerVO codeVO);

}