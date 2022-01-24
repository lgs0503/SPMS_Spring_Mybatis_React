package lgs.com.utill.controller;

import lgs.com.utill.vo.FileVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.util.List;

@Controller
public class FileController {

    private static final Logger logger = LoggerFactory.getLogger(FileController.class);

    /** 파일 업로드 등록된 빈 활용 */
    @Autowired
    String uploadPath;

    /**
     *  파일 업로드
     * @param MultipartHttpServletRequest 업로드 파일 정보를 담은 request
     * @return ModelAndView 업로드 파일 정보 및 업로드 성공여부
     */
    @RequestMapping(value="/file/upload", method=RequestMethod.POST)
    public ModelAndView fileUpload(MultipartHttpServletRequest request){
        logger.info("fileUpload");

        List<MultipartFile> fileList = request.getFiles("file");

        /* 경로 폴더 없을 경우 생성 */
        makeDirectories(uploadPath);

        long time = System.currentTimeMillis();

        /* 여러개 파일을 한번에 업로드 하기위해 반복 진행 */
        for (MultipartFile mf : fileList) {
            String originFileName = mf.getOriginalFilename();
            // 원본 파일 명
            String saveFileName = String.format("%d_%s", time, originFileName);
            try { // 파일생성
                mf.transferTo(new File(uploadPath, saveFileName));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        ModelAndView mv = new ModelAndView();
        mv.setViewName("jsonView");

        return mv;
    }

    /**
     *  파일 다운로드
     * @param HttpServletResponse 업로드 파일 정보를 담은 request
     * @return ModelAndView 업로드 파일 정보 및 업로드 성공여부
     */
    @RequestMapping(value="/file/download", method=RequestMethod.POST)
    public void download(@RequestBody FileVO fileVO, HttpServletResponse response) throws Exception {
        logger.info("download");

        try {
            /* 업로드 경로 + 파일명 + 파일확장자*/
            String path = uploadPath + "/" + fileVO.getFileName() + fileVO.getFileExten();

            File file = new File(path);

            // 다운로드 되거나 로컬에 저장되는 용도로 쓰이는지를 알려주는 헤더
            response.setHeader("Content-Disposition", "attachment;filename=" + file.getName());

            // 파일 읽어오기
            FileInputStream fileInputStream = new FileInputStream(path);
            OutputStream out = response.getOutputStream();

            //1024바이트씩 계속 읽으면서 outputStream에 저장, -1이 나오면 더이상 읽을 파일이 없음
            int read = 0;
            byte[] buffer = new byte[1024];
            while ((read = fileInputStream.read(buffer)) != -1) {
                out.write(buffer, 0, read);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     *  폴더 생성
     * @param dirPath 폴더위치
     */
    public void makeDirectories(String dirPath){
        logger.info("makeDirectories");
        boolean result;
        File f = new File(dirPath);

        // 최 하위 디렉토리에 대해서만 생성을 함.
        // 최 하위 디렉토리의 바루 상위 디렉토리가 존재하지 않을 경우,
        // 디렉토리가 생성되지 못하고, false를 리턴함
        result = f.mkdir();
        logger.debug(result ? "폴더 생성" : "폴더 생성되지않음");
        // 상위 디렉토리가 존재하지 않을 경우, 상위 디렉토리까지 생성함

        result = f.mkdirs();
        logger.debug(result == true ? "폴더 생성" : "폴더 생성되지않음");
    }
}