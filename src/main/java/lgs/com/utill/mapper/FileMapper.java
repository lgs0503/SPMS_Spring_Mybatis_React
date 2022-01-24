package lgs.com.utill.mapper;

import lgs.com.utill.vo.FileVO;
import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface FileMapper {

	public void fileUpload(FileVO fileVO);

	public String createfileNo();

	public FileVO fileSearch(FileVO fileVO);
	
}