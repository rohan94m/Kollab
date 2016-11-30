package com.collaboration.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.collaboration.model.User;


@Repository("DaoUser")
public class ImplDaoUser implements DaoUser {

	@Autowired
	private SessionFactory factory;
	
	public SessionFactory getFactory() {
		return factory;
	}

	public void setFactory(SessionFactory factory) {
		this.factory = factory;
	}

	public void saveUser(User u) {
		
	
		
		
		Session session;
		session= factory.getCurrentSession();
		
	
		
		System.out.println("Saving user");
		
		session.save(u);
		
	}

	public List<User> getAllUsers() {
		
		Session session;
		
		session=factory.getCurrentSession();
		
		@SuppressWarnings("unchecked")
		List<User> list=(List<User>) session.createCriteria(User.class).list();
		
		return list;
			
	}

	public User getUserByEmail(String email) {
	
		String hql = "from UserDetails where emailid=" + "'" + email + "'" ;
		Session session=factory.getCurrentSession();
		
		Query query= session.createQuery(hql);
		@SuppressWarnings("unchecked")
		List<User> list = (List<User>)query.list();
		
		if(list !=null && !list.isEmpty())
		{
			return list.get(0);
		}
		return null;
			
	}

	public void deleteUser(Integer id) {
		
		
		User u=getUserById(id);
		Session session=factory.getCurrentSession();
		session.delete(u);
		
	}

	public User getUserById(Integer id) {
	
		User u=new User();
		u=factory.getCurrentSession().get(User.class, id);
		return u;
		
	}

	


}
