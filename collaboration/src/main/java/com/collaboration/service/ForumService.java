package com.collaboration.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.collaboration.dao.DaoForum;
import com.collaboration.model.Blog;
import com.collaboration.model.Comment;

@Service
@Transactional
public class ForumService {
	
	@Autowired
	private DaoForum forumDao;
	
	
	public void saveBlog(Blog b) {
		
		forumDao.saveBlog(b);
		
	}
	
	public Blog getBlog(int blogid) {
		
		return forumDao.getBlog(blogid);
	}
	
	public void editBlog(Blog b) {
		forumDao.editBlog(b);
		
	}
	
	public void addComment(Comment c) {
		
		forumDao.addComment(c);
	}
	
	public List<Comment> getAllComments(int blogid) {
		
		return forumDao.getAllComments(blogid);
		
	}
	
	public void deleteBlog(int blogid) {
		forumDao.deleteBlog(blogid);
	}
	
	public List<Blog> getAllBlogs() {
		
		return forumDao.getAllBlogs();
	}
	
	

}
