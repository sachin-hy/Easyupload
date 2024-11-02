package com.packages.DaoLayer;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.hibernate.query.Query;
import com.packages.Models.FileDataTable;


@Service
public class DaoClass implements DaoClassInterface{

	
	@Autowired
	private SessionFactory sessionFactory;
	
	
	
	
	
	
	
	@Override
	public void saveFileData(FileDataTable filedata) {
		
		Session session=sessionFactory.getCurrentSession();
		
		try
		{
			
			session.save(filedata);
			
		}catch(Exception e)
		{
			System.out.println("Error in save file data = " + e.getMessage());
			
		}
	}
	
	
	
	
	

	@Override
	public Object[] getPathAndName(String uniqueid) {
	    Session session = sessionFactory.getCurrentSession();
 
	    Object[] result=null;
	    
	    try {
	        String hql = "SELECT f.filepath, f.filename FROM FileDataTable f WHERE f.uniqueid = :uid";
	        Query<Object[]> query = session.createQuery(hql, Object[].class);
	        query.setParameter("uid", uniqueid);

	        result = (Object[]) query.uniqueResult();
	        
	        if (result == null) {
	            System.out.println("No file found for unique ID: " + uniqueid);
	            
	        }
	       
	    } catch (Exception e) {
	        System.out.println("Error in fetching file name and path: " + e.getMessage());
	        
	    }
	    
	    return result;
	}






	@Override
	public boolean deleteFileData(String uniqueid) {
		
		Session session=sessionFactory.getCurrentSession();
		
		try {
			
			String hql="delete from FileDataTable where uniqueid = :uid";
			
			Query query=session.createQuery(hql);
			
			query.setParameter("uid", uniqueid);
			
			int result = query.executeUpdate();
	        
	        // If one or more rows were affected, return true
	        return result > 0;
	        
		}catch(Exception e)
		{
			System.out.println("Error in deleting the file data from database = " + e.getMessage());
			
			return false;
		}
		
	}






}
