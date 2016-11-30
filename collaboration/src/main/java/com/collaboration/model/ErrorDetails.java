package com.collaboration.model;

import java.io.Serializable;

public class ErrorDetails implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -347985507136559704L;

	private String errorcode;
	
	private String errordetails;

	public String getErrorcode() {
		return errorcode;
	}

	public void setErrorcode(String errorcode) {
		this.errorcode = errorcode;
	}

	public String getErrordetails() {
		return errordetails;
	}

	public void setErrordetails(String errordetails) {
		this.errordetails = errordetails;
	}
	
	


	
	
}
