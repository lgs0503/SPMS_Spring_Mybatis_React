package lgs.com.product.vo;

import lgs.com.utill.vo.DefaultVO;
import lombok.Data;

import java.util.ArrayList;

@Data
public class ProductVO extends DefaultVO {

	String idx;
	String productName;
	int productPrice;
	int productCnt;
	String productDescription;
	String productImageNo;
	String productClass1;
	String productClass2;
	String deleted;
	String useYn;

	ArrayList<String> idxs;

}
