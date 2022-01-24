package lgs.com.product.vo;

import lgs.com.utill.vo.DefaultVO;
import lombok.Data;

import java.util.ArrayList;

@Data
public class ProductVO extends DefaultVO {

	private String idx;
	private String productName;
	private int productPrice;
	private int productCnt;
	private String productDescription;
	private String productImageNo;
	private String productClass1;
	private String productClass2;
	private String deleted;
	private String useYn;

	private ArrayList<String> idxs;

}
