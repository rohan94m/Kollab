package com.collaboration.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.collaboration.model.Blog;
import com.collaboration.model.Comment;
import com.collaboration.model.ErrorDetails;
import com.collaboration.service.ForumService;

@RestController
public class ForumController {

	
	@Autowired
	private ForumService forumService;
	
	
	@RequestMapping(value="/blog/{id}", method = RequestMethod.GET )
	public ResponseEntity<Blog> getBlof(@PathVariable("id") String blogid) 
	{	
		int id=Integer.parseInt(blogid);
		System.out.println("Get blog  by id called for blog"+id);
		Blog blog = forumService.getBlog(id);
		blog.getComments();
		System.out.println(blog.getComments().isEmpty());
		
		
		return new ResponseEntity<Blog>(blog, HttpStatus.OK);
	}
	
	@RequestMapping(value="/blog", method=RequestMethod.POST)
	public ResponseEntity<ErrorDetails> saveNewBlog(@RequestBody Blog blog)
	{
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		String valnow = dateFormat.format(new Date());
		System.out.println("Date is "+valnow);
		blog.setDate_created(valnow);
		blog.setComments(null);
		blog.setUser_id(1);
		try
		{
			forumService.saveBlog(blog);
			ErrorDetails e=new ErrorDetails();
			e.setErrorcode("200");
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
	
	@RequestMapping(value="/blog/{id}", method = RequestMethod.DELETE )
	public ResponseEntity<Void> deleteBlog(@PathVariable("id") Integer id) 
	{
		forumService.deleteBlog(id);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
		
	}
	
	@RequestMapping(value= "/blog", method = RequestMethod.GET)
	public ResponseEntity<List<Blog>> list() 
	{	
		System.out.println("Get blogs List Reached");
		
		try
		{
		List<Blog> list = forumService.getAllBlogs();
		return new ResponseEntity<List<Blog>>(list, HttpStatus.OK);
		
		}
		catch(Exception e)
		{
			List<Blog> list = null;
			return new ResponseEntity<List<Blog>>(list, HttpStatus.NOT_FOUND);
		}
	}
	
	@RequestMapping(value="/comment/{blogid}",method=RequestMethod.POST)
	public ResponseEntity<Void> addComment(@RequestBody Comment c, @PathVariable("blogid") Integer blogid)
	{
		System.out.println(blogid);
		Blog b=new Blog();
		b.setBlog_id(blogid);
		c.setBlog(b);
		
		
		System.out.println("COmment is"+c.getComment_content()+"by user "+c.getUser_id()+" "+c.getUsername());
		try
		{
			forumService.addComment(c);
			return new ResponseEntity<Void>(HttpStatus.CREATED);
		}
		
		catch(Exception e)
		{
			e.printStackTrace();
			return new ResponseEntity<Void>(HttpStatus.CONFLICT);
			
		}
		
		
		
		
	}
	
	
	
	
	@RequestMapping(value= "/latestblogs", method = RequestMethod.GET)
	public ResponseEntity<List<Blog>> latestBlogList() 
	{	
		System.out.println("Get latest 3 blogs List Reached");
		
		try
		{
		List<Blog> list = forumService.getAllBlogs();
		List<Blog> latestblogs=new ArrayList<Blog>();
		
		if(list.size()>=3)
		{
			latestblogs.add(list.get(list.size()-1));
			latestblogs.add(list.get(list.size()-2));
			latestblogs.add(list.get(list.size()-3));
		}
		else if(list.size()==2)
		{
			latestblogs.add(list.get(list.size()-1));
			latestblogs.add(list.get(list.size()-2));			
		}
		else if(list.size()==1)
		{
			latestblogs.add(list.get(0));
		}
		else
		{
			latestblogs=null;
		}
		
		
		return new ResponseEntity<List<Blog>>(latestblogs, HttpStatus.OK);
		
		}
		catch(Exception e)
		{
			List<Blog> list = null;
			return new ResponseEntity<List<Blog>>(list, HttpStatus.NOT_FOUND);
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
}
