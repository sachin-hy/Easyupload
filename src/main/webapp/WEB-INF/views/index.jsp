<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page isELIgnored="false" %> 

    
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>

 <script src='https://cdn.tailwindcss.com'></script>
 
 
 <style>
 
    #submitButton {
    
    padding: 10px 20px; 
    border: none; 
    background-color: #4CAF50; 
    color: white; 
    cursor: pointer; 
    display: flex; 
    justify-content: center;
    align-items: center; 
    position: relative;

}

.spinner {
 
    display: inline-block; 
    margin-left: 10px; 
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db; 
    border-radius: 50%;
    width: 20px; 
    height: 20px; 
    animation: spin 1s linear infinite; 
    

}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

 </style> 
</head>

<body>

<div class=" w-screen h-screen bg-gradient-to-t from-blue-500  to-blue-300">
    
  
  <div class="w-screen h-12 flex item-center">
          <img src="resources/images/EASYUPLOAD.png" alt="image" class="mx-2 h-16 w-24"/>
          
          <ul class="flex ml-auto  space-x-8 p-5">
             <li class="text-gray-700 hover:text-blue-500 cursor-pointer">
                <a href="#">About</a>
             </li>
             <li class="text-gray-700 hover:text-blue-500 cursor-pointer ">
                <button id="downloadbutton" onclick="downloadFile()">Download</button>
             </li>
          </ul>

          
          
  </div>
  
  
  
  <div class="flex flex-grow flex-col h-[calc(100vh-3rem)]">
  
  <div class="flex w-full h-full">  
  
    <!-- Right div  -->
      <div class="flex h-full w-3/5 items-center justify-center">
            
        <h1  style="font-family: 'Open Sans', sans-serif;" class="p-8 font-bold text-7xl md:text-8xl lg:text-8xl xl:text-8xl">Free File Upload On Easy Upload Up To 10 GB</h1>
      </div>
  
  
     <!-- Left Div -->
      <div   class=" h-full w-2/5">
       
            <div class="relative m-8 p-8 h-4/5 w-4/5 bg-slate-50 rounded-md flex flex-col justify-center items-center">
    
                 <img src="resources/images/download.png" alt="image" class="h-32 w-48 mb-4"/>

                <div id="uniqueid"></div>
                <form id="formId"  method="post" enctype="multipart/form-data"  class="bg-white shadow-lg p-6 rounded-md w-full max-w-md pt-10" >
                      <label id="labelId" class="block text-lg font-medium text-gray-700 mb-4">Select File</label>
                      
                      <input type="file" id="fileInput" name="fileInput" class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
        
                      <br><br>

                      <button type="button"  id="submitButton" class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 w-full" 
                          onclick="submitFile()">
                       <span id="uploadText">Upload</span>
                       <div id="spinner" style="display: none;" class="spinner"></div>
                       <span id="uploadPercentage" style="display: none; margin-left: 10px;"></span>
                      </button>
                      
               </form>
               
           </div>
      </div>
  
  
  </div> 
  
  
  </div>
  
  
  
  
</div>


<script src="resources/JavaScript/indexpage.js">  
    
</script>


</body>
</html>
