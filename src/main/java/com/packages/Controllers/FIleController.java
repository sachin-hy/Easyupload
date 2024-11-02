package com.packages.Controllers;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.RandomAccessFile;
import java.util.UUID;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import com.packages.Models.FileDataTable;

import com.packages.ServiceLayer.ServiceLayerInterface;

@RestController
public class FIleController {

	
	@Autowired
	ServiceLayerInterface serviceClass;


	@PostMapping("/uploadchunk")
	public ResponseEntity<String> uploadchunk(@RequestParam("fileChunk") MultipartFile fileChunk, 
            @RequestParam("fileName") String fileName,
            @RequestParam("chunkStart") long chunkStart,
            HttpSession session) throws IOException
	{
		
		
		String path=session.getServletContext().getRealPath("/")+"WEB-INF"+File.separator+"resources"+File.separator+"storedfiles"+File.separator;  //+file.getOriginalFilename();   
	
		session.setAttribute("filePath", path);
		session.setAttribute("fileName", fileName);
	
		File destFile=new File(path+fileName);
	
		 try(RandomAccessFile raf=new RandomAccessFile(destFile, "rw"))
		 {
			 raf.seek(chunkStart);
			 raf.write(fileChunk.getBytes());
		 }catch(IOException e)
		 {
			 return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error while uploading chunk: " + e.getMessage());
		 }
		 
		 return ResponseEntity.ok("Chunk uploaded successfully");
	}
	
	
	
	
	
	
	
	
	
	
	@PostMapping("/uploadfile")
	public ResponseEntity<String> uploadfile( HttpSession session)                        
	{
		
		
		
		String path=(String) session.getAttribute("filePath");
		String filename=(String) session.getAttribute("fileName");
		
		session.removeAttribute("filePath");
		session.removeAttribute("fileName");
		
		
		FileDataTable filedata=new FileDataTable();
		
		
		String UniqueID = generateUniqueCode();
		
		filedata.setFilename(filename);
		filedata.setFilepath(path);
		filedata.setUniqueid(UniqueID);
		
		System.out.println("file name = " + filedata.getFilename());
		System.out.println("file path = "+ filedata.getFilepath());
		System.out.println("file unique id = " + filedata.getUniqueid());
		
		
		serviceClass.saveFileData(filedata);
		
		return ResponseEntity.ok(UniqueID);    
	}
	
	
	
	
	
	@PostMapping("/downloadChunk")
	public ResponseEntity<String> downloadChunk(@RequestParam("link") String uniqueid,HttpSession session)
	{
		
		String fullpath=getPath(uniqueid);
		
		if(fullpath == null)
		{
			System.out.println("no such file apth exist");
			 return ResponseEntity.status(HttpStatus.NOT_FOUND)
                     .body("Enter Valid Link");
		}
		
		session.setAttribute("path", fullpath);
		
		return ResponseEntity.ok().body("Valid Link");
		
	}
	
	
	
	
	@PostMapping("/downloadChunk1")
	public ResponseEntity<StreamingResponseBody>  downlaodChunk(
			                  HttpSession session)
	{
		
		
		
		String fullpath=(String) session.getAttribute("path");
		
		session.removeAttribute("path");
		
		System.out.println("path of file = "+ fullpath);
		
		
		
			System.out.println("value of path  in send chunk function = "+ fullpath);
			
			File file=new File(fullpath);
			
			
			StreamingResponseBody stream = out -> { 
	            try (FileInputStream in = new FileInputStream(file)) {
	                byte[] buffer = new byte[1024]; 
	                int bytesRead;
	                while ((bytesRead = in.read(buffer)) != -1) {
	                    out.write(buffer, 0, bytesRead); 
	                }
	            } catch (IOException e) {
	                e.printStackTrace(); 
	            }
	        };
			
	        HttpHeaders headers = new HttpHeaders();
	        headers.setContentDispositionFormData("attachment", file.getName());
	        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM); 
	        headers.setContentLength(file.length());
	        headers.add("fileName", file.getName()); 
	  
	         
	        return ResponseEntity.ok()
	                .headers(headers)
	                .body(stream); 
		
		
		
		
	}
	
	
	
	
	
	
	
	@PostMapping("/deletefile")
	public ResponseEntity<String> deletefile(@RequestParam("uniqueid") String uniqueid) {
	  
		String path = getPath(uniqueid);
	    System.out.println("path of file = "+ path);
	    
	    
	    if (path == null || path.isEmpty()) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid file path for given unique ID.");
	    }
	    
	    boolean dbResult = serviceClass.deleteFileData(uniqueid);
	    
	    if (dbResult) {
	        File file = new File(path);
	        
	        if (file.exists()) {
	            if (file.delete()) {
	                return ResponseEntity.ok("File and database entry deleted successfully.");
	            } else {
	                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                                     .body("Database entry deleted, but unable to delete file from server.");
	            }
	        } else {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                                 .body("Database entry deleted, but file not found on server.");
	        }
	    } else {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                             .body("Error deleting file entry from database.");
	    }
	}

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	public String generateUniqueCode()
	{
		
		String uniqueID = UUID.randomUUID().toString();
		
		
		return uniqueID;
		
	}
	
	
	
	public String getPath(String uniqueid)
	{
       System.out.println("value of unique id = "+ uniqueid);
		
		Object[] result = serviceClass.getPathAndName(uniqueid);
		
		if(result!=null)
		{
			String path=(String) result[0];
			String name=(String) result[1];
			
			String fullpath=path+name;
			
			return fullpath;
		}
		
	  return null;
		
		
		
	}
}
