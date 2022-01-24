package lgs.com.utill.service;

import lgs.com.utill.vo.FileVO;

public interface FileService {

    public FileVO fileUpload(FileVO fileVO);

    public FileVO fileSearch(FileVO fileVO);
}
