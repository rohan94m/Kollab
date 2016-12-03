package com.collaboration.dao;

import java.util.List;

import com.collaboration.model.User;

public interface DaoUser {
	
	
	void saveUser(User u);
	
	List<User> getAllUsers();
	
	User getUserByEmail(String email);
	
	User getUserById(Integer id);
	
	
	void deleteUser(Integer id);
	
	void updateUser(User u);
	
	
	


}
