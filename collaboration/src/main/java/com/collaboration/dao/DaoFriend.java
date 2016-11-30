package com.collaboration.dao;

import java.util.List;

import com.collaboration.model.Friendship;

public interface DaoFriend {
	
	void newRequest(Friendship f);
	
	void updateRequest(Friendship f);
	
	List<Friendship> friendList(int userid);
	
	void deleteFriend(Friendship f);

}
