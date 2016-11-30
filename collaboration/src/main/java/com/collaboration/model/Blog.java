package com.collaboration.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

@Entity
@Table(name="blog_details")
public class Blog implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8337187672333872141L;


	@Id
	@Column
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int blog_id;
	
	@Column
	private String blog_title;
	
	

	@Lob
	@Column
	private String content;
	
	//mappedBy comment indicates Comment bean has ownership
	
	@OneToMany(fetch=FetchType.EAGER,mappedBy="blog")
	@Fetch(FetchMode.SELECT)
	private List<Comment> comments;
	
	@Column
	private String date_created;
	
	@Column
	private String status;
	
	@Column
	private String reason;
	
	
	@Column
	private int user_id;
	
	@Column
	private String author_name;





	public String getAuthor_name() {
		return author_name;
	}


	public void setAuthor_name(String author_name) {
		this.author_name = author_name;
	}


	public int getBlog_id() {
		return blog_id;
	}


	public void setBlog_id(int blog_id) {
		this.blog_id = blog_id;
	}




	public String getContent() {
		return content;
	}


	public void setContent(String content) {
		this.content = content;
	}


	public List<Comment> getComments() {
		return comments;
	}


	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}


	public String getDate_created() {
		return date_created;
	}


	public void setDate_created(String date_created) {
		this.date_created = date_created;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public String getReason() {
		return reason;
	}


	public void setReason(String reason) {
		this.reason = reason;
	}


	
	


	public int getUser_id() {
		return user_id;
	}


	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}


	public String getBlog_title() {
		return blog_title;
	}


	public void setBlog_title(String blog_title) {
		this.blog_title = blog_title;
	}


	
	
	
	
	
	
	
}
