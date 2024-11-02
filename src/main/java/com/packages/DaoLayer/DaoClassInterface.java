package com.packages.DaoLayer;

import com.packages.Models.FileDataTable;

public interface DaoClassInterface {

	  public void saveFileData(FileDataTable file);

	 public Object[] getPathAndName(String uniqueid);

	public boolean deleteFileData(String uniqueid);

	
}
