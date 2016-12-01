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

import com.collaboration.model.ErrorDetails;
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
		User user = userService.getUserById(id);
		
	
		
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}
	
	
	
	@RequestMapping(value="/userbyemail/{id}", method = RequestMethod.GET )
	public ResponseEntity<User> getByEmail(@PathVariable("id") String id) 
	{
		User user = userService.getUserByEmail(id);
		
	
		
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}
	
	@RequestMapping(value= "/user", method = RequestMethod.GET)
	public ResponseEntity<List<User>> list() 
	{	
		System.out.println("Get User List Reached");
		try
		{		
		List<User> list = userService.getAllUsers();		
		return new ResponseEntity<List<User>>(list, HttpStatus.OK);				
		}
		
		catch(Exception e)
		{
			List<User> list=null;
			return  new ResponseEntity<List<User>>(list,HttpStatus.NOT_FOUND);
		}
	}
	
	@RequestMapping(value= "/latestusers", method = RequestMethod.GET)
	public ResponseEntity<List<User>> latestUserList() 
	{	
		System.out.println("Get User List Reached");
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
		return new ResponseEntity<List<User>>(latestusers, HttpStatus.OK);				
		
		
		}
		
		catch(Exception e)
		{
			List<User> list=null;
			return  new ResponseEntity<List<User>>(list,HttpStatus.NOT_FOUND);
		}
		
		
	}
	
	
	
	
	
	@RequestMapping(value="/user", method=RequestMethod.POST,consumes="application/json", produces="application/json")
	public ResponseEntity<ErrorDetails> saveNewUser(@RequestBody User user)
	{
		user.setFriendCount(0);
		System.out.println("save User reached for user"+user.getFullname());
		
		try
		{
			userService.saveUser(user);
			ErrorDetails e=new ErrorDetails();
			e.setErrorcode("001");
			e.setErrordetails("Success");
			return new ResponseEntity<ErrorDetails>(e,HttpStatus.CREATED);
		}
		
		catch(Exception e)
		{
			e.printStackTrace();
			ErrorDetails errormg=new ErrorDetails();
			errormg.setErrorcode("002");
			errormg.setErrordetails("Could not Create");
			return new ResponseEntity<ErrorDetails>(errormg,HttpStatus.CONFLICT);
		}
				
	}
	
	
	@RequestMapping(value="/user/{id}", method = RequestMethod.DELETE )
	public ResponseEntity<Void> delete(@PathVariable("id") Integer id) {
		
		userService.deleteUser(id);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
	
	
	
	@RequestMapping(value="/login",method=RequestMethod.POST)
	public ResponseEntity<User> authenticate(@RequestBody User u )
	{
		try
		{
			User fetched= userService.authorizeUser(u);
			if(fetched!=null)
			{
			return new ResponseEntity<User>(fetched,HttpStatus.ACCEPTED);
			}
			
			else
			{
				return new ResponseEntity<User>(fetched,HttpStatus.CONFLICT);
				
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
			u=null;
			return new ResponseEntity<User>(u,HttpStatus.CONFLICT);
			
		}
		
	}
	
	
	
	
	
	
	
	
	
	//MUST BE LOGGED IN
	
	@RequestMapping(value="/sendrequest/{id}",method=RequestMethod.GET)
	public ResponseEntity<ErrorDetails> newRequest(@PathVariable("id") Integer friendid,HttpSession session)
	{
		try
		{
		
		User u=(User) session.getAttribute("loggedinUser");
		
		User friendperson=userService.getUserById(friendid);
		
		Friendship f=new Friendship();
		f.setRequest_status("Pending");
		f.setRequestSender(u);
		f.setRequestReceiver(friendperson);
	
		userService.newFriendRequest(f);
		
		ErrorDetails e=new ErrorDetails();
		e.setErrorcode("001");
		e.setErrordetails("Success");
		return new ResponseEntity<ErrorDetails>(e,HttpStatus.CREATED);
		
		}
		
		
		catch(Exception e)
		{
			e.printStackTrace();
			
			ErrorDetails errormg=new ErrorDetails();
			errormg.setErrorcode("002");
			errormg.setErrordetails("Could not Create");
			return new ResponseEntity<ErrorDetails>(errormg,HttpStatus.CONFLICT);
			
		}
		
	}
	
	
	@RequestMapping(value="friendlist",method=RequestMethod.GET)
	public ResponseEntity<List<User>> getLoggedInUserFriends(HttpSession session)
	{
		User u=(User) session.getAttribute("loggedinUser");
		
		try
		{
			
		
		
		List<User> friendshipList=userService.friendList(u.getUserId());
		
		return new ResponseEntity<List<User>>(friendshipList,HttpStatus.OK);
	
		}
		
		catch(Exception e)
		{
			List<User> friendshipList=null;
			
			return new ResponseEntity<List<User>>(friendshipList,HttpStatus.CONFLICT);
			
		}
		
		
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
