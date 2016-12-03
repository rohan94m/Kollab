package com.collaboration.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;



@Entity
@Table(name="user_details")
public class User implements Serializable {

		


	/**
	 * 
	 */
	private static final long serialVersionUID = 7080835059101029934L;

	@Id
	@Column
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int userId;
	
	
	@Column
	private String emailid;
	

	@Column
	private String fullname;
	
	@Column
	private String password;
	
	@Column
	private String mobileno;
	
	@Column
	private String isOnline;
	
	@Column
	private String accountstatus;
	
	@Column
	private String reason;

	@Column
	private String role;
	
	
	@Column
	private int friendCount;
	
	@Column(length=500)
	private String user_bio;
	
	@Column
	private String user_status;
	

	
	
	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	

	public String getUser_bio() {
		return user_bio;
	}

	public void setUser_bio(String user_bio) {
		this.user_bio = user_bio;
	}

	public String getUser_status() {
		return user_status;
	}

	public void setUser_status(String user_status) {
		this.user_status = user_status;
	}

	public int getFriendCount() {
		return friendCount;
	}

	public void setFriendCount(int friendCount) {
		this.friendCount = friendCount;
	}


	

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getEmailid() {
		return emailid;
	}

	public void setEmailid(String emailid) {
		this.emailid = emailid;
	}

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getMobileno() {
		return mobileno;
	}

	public void setMobileno(String mobileno) {
		this.mobileno = mobileno;
	}

	public String getIsOnline() {
		return isOnline;
	}

	public void setIsOnline(String isOnline) {
		this.isOnline = isOnline;
	}

	public String getAccountstatus() {
		return accountstatus;
	}

	public void setAccountstatus(String accountstatus) {
		this.accountstatus = accountstatus;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}


	
	
	
}
