/**
 * 
 */


function submitFile() {


   const file = document.getElementById("fileInput").files[0];
   if (!file) {
      alert("Please select a file to upload.");
      return;
   }


   const chunkSize = 4 * 1024 * 1024;
   let start = 0;

   const uploadButton = document.getElementById("submitButton");
   const spinner = document.getElementById("spinner");
   const uploadText = document.getElementById("uploadText");

   const uploadPercentage = document.getElementById("uploadPercentage");


   uploadText.style.display = "none";
   spinner.style.display = "inline-block";
   uploadButton.disabled = true;
   uploadPercentage.style.display = "inline";


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


            const percentage = Math.round((start / file.size) * 100);
            uploadPercentage.textContent = `${percentage}%`;


            if (start < file.size) {
               sendChunk();
            } else {
               console.log("File upload complete!");

               spinner.style.display = "none";
               uploadButton.disabled = false;
               uploadText.style.display = "inline";
               uploadPercentage.style.display = "none";


               uploadFile();
            }
         })
         .catch(error => {
            console.error('Error uploading chunk:', error);
            spinner.style.display = "none";
            uploadButton.disabled = false;
            uploadText.style.display = "inline";
            uploadPercentage.style.display = "none";

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
         console.log("value of data =  ", data);

         const form = document.getElementById("formId");

         form.remove();

         const h4 = document.createElement("h4");
         const h3 = document.createElement("h3");
         const backbutton = document.createElement("a");


         h4.textContent = data;
         h4.style.backgroundColor = 'lightgray';
         h4.style.padding = "5px";
         h4.style.margin = "10px";


         h3.textContent = "Copy Link";
         h3.style.padding = "5px";
         h3.style.margin = "10px";


         backbutton.textContent = "Back";
         backbutton.style.display = "block";
         backbutton.href = "indexpage";
         backbutton.style.padding = "5px 20px";
         backbutton.style.marginTop = "60px";
         backbutton.style.borderRadius = "5px";
         backbutton.style.backgroundColor = "#4CAF50";
         backbutton.style.color = "#fff";
         backbutton.style.textDecoration = "none";
         backbutton.style.border = "none";
         backbutton.style.cursor = "pointer";


         const div = document.getElementById("uniqueid");

         div.append(h3);
         div.append(h4);
         div.appendChild(backbutton);

         // remove the download button fron top 
         const downloadbutton = document.getElementById("downloadbutton");

         downloadbutton.remove();

      })
      .catch(error => {
         console.log("Error in uploading file:", error);
      });
}


function downloadFile() {
   console.log("download  function is called ");


   const labelid = document.getElementById("labelId");

   labelid.textContent = "Enter Liink";

   const fileinput = document.getElementById("fileInput");

   fileinput.setAttribute("type", "text");
   fileinput.id = "linkId";
   fileinput.name = "link";
   fileinput.style.width = "100%";
   fileinput.style.padding = "8px";
   fileinput.style.marginTop = "2px";
   fileinput.style.marginBottom = "1px";
   fileinput.style.border = "2px solid #ccc";
   fileinput.style.borderRadius = "5px";
   fileinput.style.fontSize = "14px";
   fileinput.style.boxSizing = "border-box";


   // create back buton
   const backbutton = document.createElement("a");

   backbutton.textContent = "Back";
   backbutton.style.display = "block";
   backbutton.href = "indexpage";
   backbutton.style.padding = "3px 14px";
   backbutton.style.marginTop = "8px";
   backbutton.style.borderRadius = "3px";
   backbutton.style.backgroundColor = "#4CAF50";
   backbutton.style.color = "#fff";
   backbutton.style.textDecoration = "none";
   backbutton.style.border = "none";
   backbutton.style.cursor = "pointer";

   const div = document.getElementById("formId");


   div.appendChild(backbutton);

   const button = document.getElementById("submitButton");
   button.onclick = null;
   button.textContent = "Download";
   button.addEventListener("click", function () {
      downloadChunk();
   });


   // remove the download button from top 
   const downloadbutton = document.getElementById("downloadbutton");
   downloadbutton.remove();


}


function downloadChunk() {

   const formid = document.getElementById("formId");
   const formData = new FormData(formid);
   const uniqueid = document.getElementById("linkId").value;
   const downloadButton = document.getElementById("submitButton");


   //create the spinner and percantage div tags
   const uploadTextdiv = document.createElement("span");
   uploadTextdiv.id = "uploadText";
   //uploadText.textContent = "Download";


   const spinnerdiv = document.createElement("div");
   spinnerdiv.id = "spinner";
   spinnerdiv.style.display = "none";
   spinnerdiv.className = "spinner";


   const uploadPercentagediv = document.createElement("span");
   uploadPercentagediv.id = "uploadPercentage";
   uploadPercentagediv.style.display = "none";
   uploadPercentagediv.style.marginLeft = "10px";

   downloadButton.textContent = "Download";
   downloadButton.appendChild(uploadTextdiv);
   downloadButton.appendChild(spinnerdiv);
   downloadButton.appendChild(uploadPercentagediv);


   const spinner = document.getElementById("spinner");
   const uploadText = document.getElementById("uploadText");
   const uploadPercentage = document.getElementById("uploadPercentage");


   if (uploadText) uploadText.style.display = "none";
   if (spinner) spinner.style.display = "inline-block";
   if (downloadButton) downloadButton.disabled = true;
   if (uploadPercentage) uploadPercentage.style.display = "inline";

   if (uniqueid == null || uniqueid == "") {
      console.log("unique id is null");
      alert("Please Enter a Link");
      return;
   }
   console.log(uniqueid);

   fetch("downloadChunk", {
         method: "POST",
         body: formData
      })
      .then(response => {

         if (!response.ok) {
            alert("Please Enter a Vlid Link");
            throw new Error();
         } else {
            downloadChunkFromServer(uniqueid);
            
         

         }


      })
      .catch(error => {
            console.error("Downloading Failed:", error);
            if (spinner) spinner.style.display = "none";
            if (downloadButton) downloadButton.disabled = false;
            downloadButton.textContent = "Network ERROR ";
            if (uploadText) uploadText.style.display = "inline";
            if (uploadPercentage) uploadPercentage.style.display = "none"
         }

      );

}


function downloadChunkFromServer(uniqueid) {
   console.log("download chunk from server is called");
   fetch("downloadChunk1", {
         method: "POST"
      })
      .then(async response => {
         if (!response.ok) {
            alert("Not A Valid Link! Try Again ");
            throw new Error();
         }

         const reader = response.body.getReader();
         const contentLength = +response.headers.get('Content-Length');
         const fileName = response.headers.get('fileName') || "downloadedFile";

         let receivedLength = 0;
         const chunks = [];

         while (true) {
            let {
               done,
               value
            } = await reader.read();
            if (done) break;

            chunks.push(value);
            receivedLength += value.byteLength;
            const percentage = Math.round((receivedLength / contentLength) * 100);
            if (uploadPercentage) uploadPercentage.textContent = `${percentage}%`;
            console.log(`Received ${receivedLength} of ${contentLength}`);
         }


         const blob = new Blob(chunks); // combine all the chunks
         const url = window.URL.createObjectURL(blob);


         const a = document.createElement('a');
         a.href = url;
         a.download = fileName;
         document.body.appendChild(a);
         a.click();
         a.remove();
         window.URL.revokeObjectURL(url); //free up the browser memory used by the url

         deleteFileFromServer(uniqueid);
         
         

      })
      .catch(error => {
         console.log(error);
      })
}


function deleteFileFromServer(uniqueid) {
   const formData = new FormData();
   formData.append("uniqueid", uniqueid);

   fetch("deletefile", {
         method: "POST",
         body: formData
      })
      .then(response => 
      {
		  response.text();
		  if(response.ok)
		  {
			  console.log("delete file is called");
              window.location.href = "indexpage";
		  }
	  })
      .then(data => {
         console.log("server response after dete file is printed ");
         console.log(data);
         
      })
      .catch(error => {
         console.log("error while deleting the file , message on the js file", error);
      })
}