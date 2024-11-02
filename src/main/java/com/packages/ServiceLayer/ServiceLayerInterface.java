package com.packages.ServiceLayer;

import com.packages.Models.FileDataTable;

public interface ServiceLayerInterface {

	
	 void saveFileData(FileDataTable file);

	Object[] getPathAndName(String uniqueid);

	boolean deleteFileData(String uniqueid);

    

	
}
