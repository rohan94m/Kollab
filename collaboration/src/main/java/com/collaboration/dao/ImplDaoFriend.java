package com.collaboration.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.collaboration.model.Friendship;

@Repository("DaoFriend")
public class ImplDaoFriend implements DaoFriend {

	@Autowired
	private SessionFactory factory;
	
	
	public SessionFactory getFactory() {
		return factory;
	}

	public void setFactory(SessionFactory factory) {
		this.factory = factory;
	}

	public void newRequest(Friendship f) {
		
		
		
		factory.getCurrentSession().save(f);
		
		
		
	}

	public void updateRequest(Friendship f) {
		
		factory.getCurrentSession().update(f);
		
	}

	

	public List<Friendship> friendList(int userid) {
		
		Session session=factory.getCurrentSession();
		String hql="FROM Friendship WHERE requestSender ="+userid+" OR requestReceiver= "+userid;
		Query query= session.createQuery(hql);
		@SuppressWarnings("unchecked")
		List<Friendship> friendslist = (List<Friendship>)query.list();
		
		
		
		return friendslist;
	}

	public void deleteFriend(Friendship f) {
		
		factory.getCurrentSession().delete(f);
		
	}

	





}
