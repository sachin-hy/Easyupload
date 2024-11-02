package com.packages.ServiceLayer;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.packages.DaoLayer.DaoClassInterface;
import com.packages.Models.FileDataTable;




@Service
public class ServiceLayerClass implements ServiceLayerInterface{

	@Autowired
	DaoClassInterface daoClass;
	
	@Override
	@Transactional
	public void saveFileData(FileDataTable filedata) {
	
		daoClass.saveFileData(filedata);
	}

	
	@Override
	@Transactional
	public Object[] getPathAndName(String uniqueid) {
		// TODO Auto-generated method stub
		Object[] result=daoClass.getPathAndName(uniqueid);
		
		return result;
	}


	@Override
	@Transactional
	public boolean deleteFileData(String uniqueid) {
		// TODO Auto-generated method stub
		return daoClass.deleteFileData(uniqueid);
	}


	

}
