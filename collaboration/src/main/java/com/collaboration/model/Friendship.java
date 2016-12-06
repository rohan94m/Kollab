package com.collaboration.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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
	 
	 
	 @Column
	 private int sender_id;
	 
	 @Column
	 private String sender_name;
	 
	 @Column
	 private int receiver_id;
	 
	 @Column
	 private String receiver_name;
	 
	
	 @Column
	 private String request_status;


	public int getFriendid() {
		return friendid;
	}


	public void setFriendid(int friendid) {
		this.friendid = friendid;
	}


	public int getSender_id() {
		return sender_id;
	}


	public void setSender_id(int sender_id) {
		this.sender_id = sender_id;
	}


	public String getSender_name() {
		return sender_name;
	}


	public void setSender_name(String sender_name) {
		this.sender_name = sender_name;
	}


	public int getReceiver_id() {
		return receiver_id;
	}


	public void setReceiver_id(int receiver_id) {
		this.receiver_id = receiver_id;
	}


	public String getReceiver_name() {
		return receiver_name;
	}


	public void setReceiver_name(String receiver_name) {
		this.receiver_name = receiver_name;
	}


	public String getRequest_status() {
		return request_status;
	}


	public void setRequest_status(String request_status) {
		this.request_status = request_status;
	}
	 
	 
	 
	 
	 

}
