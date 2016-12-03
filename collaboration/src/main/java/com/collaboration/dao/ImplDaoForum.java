package com.collaboration.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.collaboration.model.Blog;
import com.collaboration.model.Comment;

@Repository("DaoForum")
public class ImplDaoForum implements DaoForum{
	
	@Autowired 
	private SessionFactory factory;
	

	public SessionFactory getFactory() {
		return factory;
	}

	public void setFactory(SessionFactory factory) {
		this.factory = factory;
	}

	public void saveBlog(Blog b) {
		
		Session session;
		session= factory.getCurrentSession();
		session.save(b);
		
	}

	public Blog getBlog(int blogid) {
		
		Session session;
		session= factory.getCurrentSession();
		Blog b=session.get(Blog.class, blogid);
		return b;
		
	}

	public void editBlog(Blog b) {
		Session session;
		session= factory.getCurrentSession();
		session.update(b);
	
		
	}

	

	public void addComment(Comment c) {
		Session session;
		
		session= factory.getCurrentSession();
		session.save(c);
		
		
	}

	public List<Comment> getAllComments(int blogid) {
		
		Session session;
		session= factory.getCurrentSession();
		String hql="from Comment where blogid="+blogid;
		Query query=session.createQuery(hql);
		@SuppressWarnings("unchecked")
		List<Comment> list=(List<Comment>)query.list();
		return list;
		
		
		
		
	}

	public void deleteBlog(int blogid) {
		
		Session session;
		session= factory.getCurrentSession();
		Blog b=getBlog(blogid);
		session.delete(b);
		
	}

	public List<Blog> getAllBlogs() {
		
		Session session;
		session= factory.getCurrentSession();
		@SuppressWarnings("unchecked")
		List<Blog> list=(List<Blog>) session.createCriteria(Blog.class).list();
		
		
		return list;
	}
	
	
	public List<Blog> getUserBlogs(int userid)
	{
		Session session;
		session= factory.getCurrentSession();
		String hql="from Blog where user_id="+userid;
		Query query=session.createQuery(hql);
		@SuppressWarnings("unchecked")
		List<Blog> list=(List<Blog>)query.list();
		return list;
		
		
	}
	
	


}
