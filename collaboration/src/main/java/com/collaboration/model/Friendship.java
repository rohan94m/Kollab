package com.collaboration.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Friendship implements Serializable {
	
	

	 /**
	 * 
	 */
	private static final long serialVersionUID = 5660099763335028121L;

	 @Id
	 @Column
	 @GeneratedValue(strategy=GenerationType.AUTO)
	 private int friendid;
	 
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "requestSender", nullable = false)
	private User requestSender;
	 
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "requestReceiver", nullable = false)
	private User requestReceiver;
	 
	 
	

	@Column
	 private String  request_status;



	public int getFriendid() {
		return friendid;
	}



	public void setFriendid(int friendid) {
		this.friendid = friendid;
	}





	public User getRequestSender() {
		return requestSender;
	}



	public void setRequestSender(User requestSender) {
		this.requestSender = requestSender;
	}



	public User getRequestReceiver() {
		return requestReceiver;
	}



	public void setRequestReceiver(User requestReceiver) {
		this.requestReceiver = requestReceiver;
	}



	public String getRequest_status() {
		return request_status;
	}



	public void setRequest_status(String request_status) {
		this.request_status = request_status;
	}

	
	 
	 
	 
	 
	 
	 
	 

}
