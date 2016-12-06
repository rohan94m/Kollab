package com.collaboration.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.collaboration.model.Friendship;
import com.collaboration.model.User;
import com.collaboration.service.UserService;

@RestController
public class UserController {
	
	@Autowired
	private UserService userService;
	
	
	
	
	//@CrossOrigin(origins="http://localhost:8088")
	
	@RequestMapping(value="/user/{id}", method = RequestMethod.GET )
	public ResponseEntity<User> get(@PathVariable("id") Integer id) 
	{
		System.out.println("getUser() method in controller reached ---- ");
		
		User user = userService.getUserById(id);
		
		System.out.println("User fetched with id"+id);
		
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}
	
	
	
	@RequestMapping(value="/userbyemail/{id}", method = RequestMethod.GET )
	public ResponseEntity<User> getByEmail(@PathVariable("id") String id) 
	{
		System.out.println("getByEmail() method in controller reached ---- ");
		
		User user = userService.getUserByEmail(id);
		
		System.out.println("User fetched with email"+id);
		
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}
	
	
	@RequestMapping(value="/user",method=RequestMethod.PUT)
	public ResponseEntity<User> updateUser(@RequestBody User u)
	{
		System.out.println("updateUser() method in controller reached ---- ");
		
		try
		{
			userService.updateUser(u);
			System.out.println("User updated with id"+u.getUserId());
			return new ResponseEntity<User>(u,HttpStatus.OK);
		}
		
		catch(Exception e)
		{
			System.out.println("FAiled to update user with id"+u.getUserId());
			u=null;
			
			return new ResponseEntity<User>(u,HttpStatus.CONFLICT);
			
			
		}
		
	}
	
	
	
	
	
	@RequestMapping(value= "/user", method = RequestMethod.GET)
	public ResponseEntity<List<User>> list() 
	{	
		
		System.out.println("Get userList() Reached----");
		try
		{		
		List<User> list = userService.getAllUsers();	
		System.out.println("Obtained List of users");
		return new ResponseEntity<List<User>>(list, HttpStatus.OK);				
		}
		
		catch(Exception e)
		{
			System.out.println("Falied to obtain List of users");
			List<User> list=null;
			return  new ResponseEntity<List<User>>(list,HttpStatus.NOT_FOUND);
		}
	}
	
	
	
	
	@RequestMapping(value= "/latestusers", method = RequestMethod.GET)
	public ResponseEntity<List<User>> latestUserList() 
	{	
		System.out.println("Get latesUseList Reached ----");
		try
		{		
		List<User> list = userService.getAllUsers();	
		List<User> latestusers=new ArrayList<User>();
		
		if(list.size()>=3)
		{
			latestusers.add(list.get(list.size()-1));
			latestusers.add(list.get(list.size()-2));
			latestusers.add(list.get(list.size()-3));
		}
		else if(list.size()==2)
		{
			latestusers.add(list.get(list.size()-1));
			latestusers.add(list.get(list.size()-2));			
		}
		else if(list.size()==1)
		{
			latestusers.add(list.get(0));
		}
		else
		{
			latestusers=null;
		}
		
		System.out.println("Obtained List of Latest users");
		return new ResponseEntity<List<User>>(latestusers, HttpStatus.OK);				
		
		
		}
		
		catch(Exception e)
		{
			System.out.println("Failed to obtain List of latest atusers");
			List<User> list=null;
			return  new ResponseEntity<List<User>>(list,HttpStatus.NOT_FOUND);
		}
		
		
	}
	
	
	
	
	
	@RequestMapping(value="/user", method=RequestMethod.POST,consumes="application/json", produces="application/json")
	public ResponseEntity<User> saveNewUser(@RequestBody User user)
	{
		user.setFriendCount(0);
		System.out.println("save User reached for user"+user.getFullname()+" ----");
		
		try
		{
			userService.saveUser(user);
			System.out.println("Succesfully saved users");
			return new ResponseEntity<User>(user,HttpStatus.OK);
		}
		
		catch(Exception e)
		{
			e.printStackTrace();
			System.out.println("Could not save user");
			return new ResponseEntity<User>(user,HttpStatus.CONFLICT);
		}
				
	}
	
	

	
	
	
	@RequestMapping(value="/login",method=RequestMethod.POST)
	public ResponseEntity<User> authenticate(@RequestBody User u,HttpSession session )
	{
		System.out.println("authenticatezUser() method in controller reached ---- ");
		
		
		try
		{
			User fetched= userService.authorizeUser(u);
			if(fetched.getEmailid().equals("Invalid"))
			{
				fetched=u;
				fetched.setEmailid("Invalid");
				fetched.setPassword("Invalid");
				System.out.println("User"+u.getEmailid()+" not  Authenticated");
				
			}
			
			else
			{
				
				System.out.println("Session set for "+fetched.getFullname());
				session.setAttribute("currentuser", fetched);
				System.out.println("User"+u.getEmailid()+" Authenticated");
				
				
			}
			
			
			
			return new ResponseEntity<User>(fetched,HttpStatus.OK);
			
		}
		catch(Exception e)
		{
			System.out.println("could not perform authentication");
			e.printStackTrace();
			
			u=null;
			return new ResponseEntity<User>(u,HttpStatus.CONFLICT);
			
		}
		
	}
	
	@RequestMapping(value="/logout", method=RequestMethod.GET)
	public ResponseEntity<Void> logout(HttpSession session)
	{
		User u = (User) session.getAttribute("currentuser");
		System.out.println("Session is invalidated for "+u.getFullname());
		session.invalidate();
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	
	
	
	
	
	
	
	
	//MUST BE LOGGED IN
	
	@RequestMapping(value="/sendrequest/{id}",method=RequestMethod.PUT)
	public ResponseEntity<Friendship> newRequest(@PathVariable("id") Integer friendid,HttpSession session)
	{
		System.out.println("sendFriendRequest() method in controller reached ---- ");
		Friendship f=new Friendship();
		try
		{
		
		User u=(User) session.getAttribute("currentuser");
		
		User friendperson=userService.getUserById(friendid);
		
		
	
		f.setSender_id(u.getUserId());
		f.setSender_name(u.getFullname());
		f.setRequest_status("Pending");
		
		f.setReceiver_id(friendperson.getUserId());
		f.setReceiver_name(friendperson.getFullname());
		
	
		userService.newFriendRequest(f);
		
		System.out.println("Request Sent ");
		return new ResponseEntity<Friendship>(f,HttpStatus.OK);
		
		}
		
		
		catch(Exception e)
		{
			System.out.println("could Not Send the request");
			e.printStackTrace();
			
		
			return new ResponseEntity<Friendship>(f,HttpStatus.CONFLICT);
			
		}
		
	}
	
	
	@RequestMapping(value="friendlist/{userid}",method=RequestMethod.GET)
	public ResponseEntity<List<Friendship>> getLoggedInUserFriends(@PathVariable("userid") Integer userid)
	{
		System.out.println("getFriendsList() method in controller reached ---- ");
		
		
		try
		{
			
		
		
		List<Friendship> friendshipList=userService.friendList(userid);
		
		System.out.println("Obtained Friends List");
		
		return new ResponseEntity<List<Friendship>>(friendshipList,HttpStatus.OK);
	
		}
		
		catch(Exception e)
		{
			System.out.println("could not obtaine friends list");
			List<Friendship> friendshipList=null;
			
			return new ResponseEntity<List<Friendship>>(friendshipList,HttpStatus.CONFLICT);
			
		}
		
		
		
	}
	
	
	
	@RequestMapping(value="/acceptRequest",method=RequestMethod.POST)
	public ResponseEntity<Friendship> acceptFriendRequest(@RequestBody Friendship friend)
	{
		System.out.println("acceptFriendRequest() method in controller reached ---- ");
			
			try
			
			{
			userService.updateRequest(friend);
			System.out.println("Friend Request Accepted. ");
			
			User u=new User();
			User f=new User();
			
			u=userService.getUserById(friend.getReceiver_id());
			f=userService.getUserById(friend.getSender_id());
			u.setFriendCount(u.getFriendCount()+1);
			f.setFriendCount(f.getFriendCount()+1);
			
			userService.updateUser(u);
			userService.updateUser(f);
			
			System.out.println("Friend Count updated ");
			
		
			return new ResponseEntity<Friendship>(friend,HttpStatus.OK);
			}
			
			catch(Exception e)
			{
				System.out.println("Friend Request could not be updated.");
				friend=null;
				return new ResponseEntity<Friendship>(friend,HttpStatus.OK);
				
			}
		
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
