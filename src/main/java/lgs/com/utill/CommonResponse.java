package lgs.com.utill;

import lgs.com.utill.vo.Message;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Map;

public class CommonResponse{

    private Message message;
    private HttpHeaders headers;
    private Map<String, Object> messageData;

    public CommonResponse(){
        message = new Message();
        headers = new HttpHeaders();
        messageData = new HashMap<String, Object>();

        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        message.setStatus(StatusEnum.OK);
    }

    public void putData(String name, Object data){
        this.messageData.put(name, data);
        this.message.setData(this.messageData);
    }

    public Message getMessage() {
        return message;
    }

    public void setMessage(Message message) {
        this.message = message;
    }

    public HttpHeaders getHeaders() {
        return headers;
    }

    public void setHeaders(HttpHeaders headers) {
        this.headers = headers;
    }

    public Map<String, Object> getMessageData() {
        return messageData;
    }

    public void setMessageData(Map<String, Object> messageData) {
        this.messageData = messageData;
    }
}
