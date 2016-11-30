package com.collaboration.dao;

import java.util.List;

import com.collaboration.model.Blog;
import com.collaboration.model.Comment;

public interface DaoForum {

	void saveBlog(Blog b);
	
	Blog getBlog(int blogid);
	
	void editBlog(Blog b);
	
	List<Blog> getAllBlogs();
	
	void addComment(Comment c);
	
	List<Comment> getAllComments(int blogid);
	
	void deleteBlog(int blogid);
	
	
	
}
