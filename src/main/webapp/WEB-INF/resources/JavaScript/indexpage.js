/**
 * 
 */

 
function submitFile() {
	
	
	
    const file = document.getElementById("fileInput").files[0];
    if (!file) {
        alert("Please select a file to upload.");
        return;
    }

     
    const chunkSize = 4*1024 * 1024; 
    let start = 0;

    function sendChunk() {
        const end = Math.min(start + chunkSize, file.size);
        
        
        const chunk = file.slice(start, end);
        
        const formData = new FormData();
        
        formData.append("fileChunk", chunk);
        formData.append("fileName", file.name);
        formData.append("chunkStart", start);

        fetch("uploadchunk", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to upload chunk");
            }
            return response.text();
        })
        .then(data => {
            console.log(data);
            start = end; 
            if (start < file.size) {
                sendChunk(); 
            } else {
                console.log("File upload complete!");
         
                uploadFile(); 
            }
        })
        .catch(error =>
                    {
                    	console.error('Error uploading chunk:', error);
                    	
                    });
    }

    sendChunk(); 
}

    
    
    
    
    
    
    
    
    
    
    
    
    function uploadFile() {
    	
    	console.log("upload file is called");
    
        
        

       
        fetch("uploadfile", {
            method: "POST",
         })
        .then(response => {
            if (response.ok) {
                console.log("Form submitted successfully!");
                return response.text();
            }
            
        })
        .then(data => {
            console.log("value of data =  " , data);
            
           const form=document.getElementById("formId");
           
           form.remove();
           
           const h4=document.createElement("h4");
           const h3=document.createElement("h3");
           const backbutton=document.createElement("a");
         
           
           
           
           h4.textContent=data;
           h4.style.backgroundColor ='lightgray';
           h4.style.padding="5px";
           h4.style.margin="10px";
           
           
           h3.textContent="Copy Link";
           h3.style.padding="5px";
           h3.style.margin="10px";
           
           
           backbutton.textContent="Back";
           backbutton.href="indexpage";
           backbutton.style.padding="5px";
           backbutton.style.margin="10px";
           
           
           const div=document.getElementById("uniqueid");
           
           div.append(h3);
           div.append(h4);
           div.appendChild(backbutton);
           
           // remove the download button fron top 
           const downloadbutton=document.getElementById("downloadbutton");
      
           downloadbutton.remove();
         
        })
        .catch(error => {
            console.log("Error in uploading file:", error);
        });
    }












  function downloadFile()
  {
	  console.log("download  function is called ");
	  
	   
	   
	  const labelid=document.getElementById("labelId");
	  
	  labelid.textContent="Enter Link";
	  
	  const fileinput = document.getElementById("fileInput");
      fileinput.remove();
      
      const input = document.createElement("input");
      const backbutton=document.createElement("a");
      
      
      
      input.setAttribute("type", "text");  
      input.inputMode = "text";  
      input.id = "linkId";  
      input.name = "link"; 
      input.style.width = "100%";               
      input.style.padding = "10px";      
      input.style.marginBottom = "10px";            
      input.style.border = "2px solid #ccc";       
      input.style.borderRadius = "5px";    
      input.style.fontSize = "16px";       
      input.style.boxSizing = "border-box"; 
    
    
      
      backbutton.textContent="Back";
      backbutton.href="indexpage";
      backbutton.style.padding="5px";
      backbutton.style.margin="10px";
           
           
     
    
      const div = document.getElementById("formId");
      const button=document.getElementById("submitButton");
     // const div2=document.getElementById("uniqueid");
           
          
      
      div.insertBefore(input,button); 
      div.appendChild(backbutton);
      
      button.onclick=null;
      button.textContent="Download";
      
     
      
      // remove the download button fron top 
      const downloadbutton=document.getElementById("downloadbutton");
      
      downloadbutton.remove();
      
      button.addEventListener("click",function()
      {
		  downloadChunk();
	  });
	  
  }
  
  
  
  
  
  
  
  
  
  
  function downloadChunk() {
	  
    const formid = document.getElementById("formId");
    const formData = new FormData(formid);
    const uniqueid=document.getElementById("linkId").value;
    
    
    if(uniqueid == null || uniqueid =="")
    {
		console.log("unique id is null");
		alert("Please Enter a Link");
        return;
	}
    console.log(uniqueid);
    
    
    
    
    fetch("downloadChunk",
    {
		method:"POST",
		body:formData
	})
	
	
	.then(response => {
		
		
		if(!response.ok)
		{
			alert("Please Enter a Vlid Link");
			throw new Error();
		}
		
		return fetch("downloadChunk1", {
                      method: "POST"
                    });
	})
	
	
	.then(response =>
	 {	
		if (!response.ok) { 
		   alert("Not A Valid Link! Try Again ");

            throw new Error();
        }
        
        
        const reader = response.body.getReader();
        const contentLength = +response.headers.get('Content-Length');  
        const fileName = response.headers.get('fileName') || "downloadedFile";  
        
        let receivedLength = 0;
        const chunks = [];

        
        function processStream() {
            return reader.read().then(({done, value}) => {
                if (done) {
                    return; 
                }

                chunks.push(value);  
                receivedLength += value.byteLength;  

                console.log(`Received ${receivedLength} of ${contentLength}`);

                return processStream();  
            });
        }

        return processStream().then(() => {
            const blob = new Blob(chunks);  
            const url = window.URL.createObjectURL(blob);

          
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName; 
            document.body.appendChild(a);  
            a.click();  
            a.remove();  
            window.URL.revokeObjectURL(url); //free up the browser memory used by the url
            
            deleteFileFromServer(uniqueid);
            
            window.location.href = "indexpage";
            
            
        });

    }).catch(error => {
         console.error("Downloading Failed:", error);  
    });
    
}





    function  deleteFileFromServer(uniqueid)
    {
		 const formData=new FormData();
		 formData.append("uniqueid",uniqueid);
		 
		 fetch("deletefile",
		        {
					method:"POST",
					body:formData
				})
				.then(response => response.text())
			    .then(data => {
					console.log("server response after dete file is printed ");
					console.log(data);
				})
				.catch(error =>
				{
					console.log("error while deleting the file , message on the js file" , error);
				})
	}
