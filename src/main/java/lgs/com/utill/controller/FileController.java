package lgs.com.utill.controller;

import lgs.com.utill.CommonResponse;
import lgs.com.utill.service.FileService;
import lgs.com.utill.vo.FileVO;
import lgs.com.utill.vo.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Controller
public class FileController {

    private static final Logger logger = LoggerFactory.getLogger(FileController.class);

    /** 파일 업로드 등록된 빈 활용 */
    @Autowired
    String uploadPath;

    @Autowired
    FileService fileService;

    /**
     *  파일 업로드
     * @param MultipartHttpServletRequest 업로드 파일 정보를 담은 request
     * @return ModelAndView 업로드 파일 정보 및 업로드 성공여부
     */
    @Transactional
    @RequestMapping(value="/file/upload", method=RequestMethod.POST)
    public ModelAndView fileUpload(MultipartHttpServletRequest request) throws Exception {
        logger.info("fileUpload");

        List<MultipartFile> fileList = request.getFiles("file");

        /* 경로 폴더 없을 경우 생성 */
        makeDirectories(uploadPath);

        long time = System.currentTimeMillis();

        /* 업로드 완료된 파일정보 를 담을 리스트 객체 */
        List<FileVO> uploadList = new ArrayList<FileVO>();

        /* 여러개 파일을 한번에 업로드 하기위해 반복 진행 */
        for (MultipartFile mf : fileList) {

            FileVO fileVO = new FileVO();

            String originFileName = mf.getOriginalFilename();
            String fileExten = originFileName.substring(originFileName.lastIndexOf(".") + 1);
            String fileName = originFileName.replace(fileExten,"").replace(".","");

            String saveFileName = String.format("%d_%s", time, fileName);

            /* DB FILE TABLE 저장 */
            fileVO.setFilePath(uploadPath);
            fileVO.setFileName(fileName);
            fileVO.setFilePhysicalName(saveFileName);
            fileVO.setFileSize(mf.getSize());
            fileVO.setFileExten(fileExten);
            fileVO.setUseYn("Y");
            fileVO.setDeleted("0");

            fileService.fileUpload(fileVO);

            /* 파일 생성 */
            try {
                mf.transferTo(new File(uploadPath, saveFileName + '.' + fileExten));
            } catch (Exception e) {
                e.printStackTrace();
            }

            uploadList.add(fileVO);
        }
        ModelAndView mv = new ModelAndView();

        /* 업로드 완료된 파일정보들 반환 */
        mv.setViewName("jsonView");
        mv.addObject("uploadList", uploadList);

        return mv;
    }

    @GetMapping("/download")
    public ResponseEntity<?> downloadTest(@RequestBody FileVO fileVO, HttpServletResponse response) throws IOException {
        fileVO = fileService.fileSearch(fileVO);

        /* 업로드 경로 + 파일명 + 파일확장자*/
        String path = uploadPath + "/" + fileVO.getFilePhysicalName() + '.' + fileVO.getFileExten();

        File file = new File(path);
        InputStreamResource resource3 = new InputStreamResource(new FileInputStream(file));

        if(fileVO.getFileName() != null) {
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                    .body(resource3);
        }else{
            return ResponseEntity.noContent().build();
        }
    }


    /**
     *  파일 다운로드
     * @param HttpServletRequest 파일 다운로드 fileNo 파라미터 정보
     * @return HttpServletResponse 파일 다운로드 정보
     */
    @GetMapping("/file/download")
    public void download(HttpServletRequest request, HttpServletResponse response) throws Exception {
        logger.info("download");

        try {
            FileVO fileVO = new FileVO();
            fileVO.setFileNo(request.getParameter("fileNo"));
            /*파일 번호로 상세 정보 조회 */
            fileVO = fileService.fileSearch(fileVO);

            /* 업로드 경로 + 파일명 + 파일확장자*/
            String path = uploadPath + "/" + fileVO.getFilePhysicalName() + '.' + fileVO.getFileExten();

            File file = new File(path);
            int bytes = (int)file.length();

            String fileName = fileVO.getFileName() + '.' + fileVO.getFileExten();
            String header = request.getHeader("User-Agent");

            // 파일 읽어오기
            FileInputStream fileInputStream = new FileInputStream(file);

            // 다운로드 되거나 로컬에 저장되는 용도로 쓰이는지를 알려주는 헤더
            if (header.contains("MSIE") || header.contains("Trident")) {
                fileName = URLEncoder.encode(fileName,"UTF-8").replaceAll("\\+", "%20");
                response.setHeader("Content-Disposition", "attachment;filename=" + fileName + ";");
            } else {
                fileName = new String(fileName.getBytes("UTF-8"), "ISO-8859-1");
                response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
            }

            response.setContentType( "application/download; UTF-8" );
            response.setContentLength(bytes);
            response.setHeader("Content-Type", "application/octet-stream");
            response.setHeader("Content-Transfer-Encoding", "binary;");
            response.setHeader("Pragma", "no-cache;");
            response.setHeader("Expires", "-1;");

            OutputStream out = response.getOutputStream();

            //1024바이트씩 계속 읽으면서 outputStream에 저장, -1이 나오면 더이상 읽을 파일이 없음
            int read = 0;
            byte[] buffer = new byte[1024];
            while ((read = fileInputStream.read(buffer)) != -1) {
                out.write(buffer, 0, read);
            }

            response.flushBuffer();
            fileInputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     *  이미지 데이터 조회
     * @param BannerVO 조회조건
     * @return 배너 리스트
     */
    @RequestMapping(value = "/getImageData", method = RequestMethod.POST)
    public ResponseEntity<Message> bannerList(@RequestBody FileVO fileVO) throws IOException {
        logger.info("getImageData");
        CommonResponse commonResponse = new CommonResponse();

        fileVO = fileService.fileSearch(fileVO);

        /* 업로드 경로 + 파일명 + 파일확장자*/
        String path = uploadPath + "/" + fileVO.getFilePhysicalName() + '.' + fileVO.getFileExten();

        File file = new File(path);

        commonResponse.putData("imageData", fileToBase64(file));

        return new ResponseEntity<>(commonResponse.getMessage(), commonResponse.getHeaders(), HttpStatus.OK);
    }


    /**
     *  폴더 생성
     * @param dirPath 폴더위치
     */
    public boolean makeDirectories(String dirPath){
        logger.info("makeDirectories");
        boolean result;
        File f = new File(dirPath);

        // 최 하위 디렉토리에 대해서만 생성을 함.
        // 최 하위 디렉토리의 바루 상위 디렉토리가 존재하지 않을 경우,
        // 디렉토리가 생성되지 못하고, false를 리턴함

        result = f.mkdirs();
        logger.debug(result == true ? "폴더 생성" : "폴더 생성되지않음");

        return result;
    }

    /**
     *  파일 BASE64 인코딩
     * @param file 인코딩 파일
     */
    public String fileToBase64(File file) throws IOException {

        byte[] data = new byte[(int) file.length()];
        try (FileInputStream stream = new FileInputStream(file)) {
            stream.read(data, 0, data.length);
        } catch (Throwable e) {
            e.printStackTrace();
        }

        return Base64.getEncoder().encodeToString(data);
    }
}