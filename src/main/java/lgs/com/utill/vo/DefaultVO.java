package lgs.com.utill.vo;

import lombok.Data;

import java.text.SimpleDateFormat;
import java.util.Date;

@Data
public class DefaultVO {

	private String createDate;
	private String createUser;
	private String updateDate;
	private String updateUser;

	/* 기본값 초기화 생성자 */
	public DefaultVO(){
		long currTime = System.currentTimeMillis();

		SimpleDateFormat timeFormat = new SimpleDateFormat("yyyy-MM-dd");

		this.createUser = "admin";
		this.updateUser = "admin";

		this.createDate = timeFormat.format(new Date(currTime));
		this.updateDate = timeFormat.format(new Date(currTime));
	}
}
