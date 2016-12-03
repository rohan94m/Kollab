package com.collaboration.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.collaboration.dao.DaoFriend;
import com.collaboration.dao.DaoUser;
import com.collaboration.model.Friendship;
import com.collaboration.model.User;

@Service
@Transactional
public class UserService {

	
	@Autowired
	private DaoUser userDao;
	
	@Autowired
	private DaoFriend friendDao;
	
	
	public void saveUser(User u) {
		
		
		userDao.saveUser(u);
		
		
	}
	
	public List<User> getAllUsers() {
		
	 return userDao.getAllUsers();
		
	}
	
	
	public User getUserByEmail(String email) {
		
		return userDao.getUserByEmail(email);
		
		
	}
	
	
	public User getUserById(Integer id){
		
		return userDao.getUserById(id);
		
		
	}
	
	public void deleteUser(Integer id) {
		
		userDao.deleteUser(id);
	}
	
	
	
	public void newFriendRequest(Friendship f) {
		
		friendDao.newRequest(f);
				
	}
	
	public void updateRequest(Friendship f) {
		friendDao.updateRequest(f);
		
	}
	
	public List<User> friendList(int userid) {
		
		ArrayList<Friendship> f= (ArrayList<Friendship>) friendDao.friendList(userid);
		
		List<User> flist=new ArrayList<User>();
		
		for(int i=0;i<f.size();i++)
		{
			
			if(f.get(i).getRequestSender().getUserId()==userid)
			{
				flist.add(f.get(i).getRequestReceiver());
			}
			
			else
			{
				flist.add(f.get(i).getRequestSender());
			}
			
			
		}
		return flist;
		
	}
	
	
	public void deleteFriend(Friendship f) {
		friendDao.deleteFriend(f);
	}
	
	
	public User authorizeUser(User u)
	{
		
		
		User fetched=userDao.getUserByEmail(u.getEmailid());
		
		if(fetched!=null)
		{
		
			System.out.println("Fetched password is "+fetched.getPassword());
			System.out.println("typed password is "+u.getPassword());
			if(fetched.getPassword().equals(u.getPassword())){
				
				return fetched;
				
		}
			else
			{
				u.setEmailid("Invalid");
				return u;
			}
			
		}
				
				u.setEmailid("Invalid");
				return u;
	
	}
	
	public void updateUser(User u)
	{
		 userDao.updateUser(u);
	}
	
	
	
}
