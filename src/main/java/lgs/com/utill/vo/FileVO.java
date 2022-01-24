package lgs.com.utill.vo;

import lombok.Data;

@Data
public class FileVO extends DefaultVO {

    private String fileNo;
    private String filePath;
    private String fileName;
    private String filePhysicalName;
    private String fileExten;
    private Long fileSize;
    private String useYn;
    private String deleted;

}
