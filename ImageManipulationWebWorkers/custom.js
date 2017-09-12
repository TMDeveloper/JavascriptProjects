(function () {

  var original,
  imageLoader = document.querySelector(".imageLoader"),
  canvas = document.querySelector("#image"), 
  ctx = canvas.getContext("2d"), 
  timer =  document.querySelector("#timer"),
  downloadBtn = document.getElementById("downloadLink");
    
  if(self.navigator.hardwareConcurrency !== undefined){
        document.getElementById("coresNum").innerHTML = self.navigator.hardwareConcurrency;
  }

    
  function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function (event) {
      var img = new Image();
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        original = ctx.getImageData(0, 0, canvas.width, canvas.height);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  imageLoader.addEventListener("change", handleImage, false);

  function revertImage () {
        return ctx.putImageData(original, 0, 0);
  };
        
    downloadBtn.addEventListener("click", downloadImage, false);
    
    function downloadImage () {  
            downloadBtn.href = canvas.toDataURL("image/jpeg");
            downloadBtn.download = "newPic.jpeg";   
    };
    
  function manipulateImage(type){
        
        var start = new Date(), pixel, index, imageData, segmentLength, worker,
        finished = 0,
        workersNum = document.getElementById("workersNum"),
        workersCount = workersNum.options[workersNum.selectedIndex].value,
        blockSize = canvas.height / workersCount,
        length = canvas.width * canvas.height * 4,
        segmentLength = length / workersCount,
        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
      
        if (workersCount > 0) {
            
            var onWorkEnded = function (e) {
                // Data is retrieved using a memory clone operation
                imageData = e.data.result;
                index = e.data.index;
                // Copying back canvas data to canvas
                // If the first webworker  (index 0) returns data, apply it at pixel (0, 0) onwards
                // If the second webworker  (index 1) returns data, apply it at pixel (0, canvas.height/4) onwards, and so on
                ctx.putImageData(imageData, 0, blockSize * index);
                
                finished++; 
                if (finished == workersCount) {
                    var diff = new Date() - start;
                    timer.textContent = "Process done in " + diff + " ms";
                }
            };  
            
            // Launching every worker
            for (index = 0; index < workersCount; index++) {
                worker = new Worker("pictureProcessor.js");
                worker.onmessage = onWorkEnded;
                var canvasData = ctx.getImageData(0, blockSize * index, canvas.width, blockSize);
                //Sending imageData to worker
                worker.postMessage({ cmd: type, data: canvasData, index: index, length: segmentLength});
            }
        }
        else {   
          try { 
            for (var i = 0; i < length; i += 4) {
                var r = imageData.data[i];
                var g = imageData.data[i + 1];
                var b = imageData.data[i + 2];
                var a = imageData.data[i + 3];
            
              switch (type) {
                case "invert":
                    pixel = makePixelInverted(r, g, b, a);
                    break;
                
                case "sepia":
                    pixel = makePixelSepia(r, g, b, a);
                    break;
                
                case "greyscale":
                    pixel = makePixelGreyScale(r, g, b, a);
                    break;
                
                case "vibrant":
                    pixel = makePixelVibrant(r, g, b, a);
                    break;
                        
                case "chroma":
                    pixel = makePixelChroma(r, g, b, a);
                    break;
              }
                imageData.data[i + 0] = pixel[0];
                imageData.data[i + 1] = pixel[1];
                imageData.data[i + 2] = pixel[2];
                imageData.data[i + 3] = pixel[3];
            }
            
              //Update canvas with new imageData
              ctx.putImageData(imageData, 0 ,0);
              var diff = new Date() - start;
              timer.textContent = "Process done in " + diff + " ms";
              
          }//End of try
            catch (e) {
                throw new ManipulationException("Image manipulation error");
                postMessage("Image manipulation error");
            } 
        }//End of else   
    };
    
    document.querySelector("#invert").onclick = function () {
    manipulateImage("invert");
    };
    
    document.querySelector("#sepia").onclick = function () {
    manipulateImage("sepia");
    };
    
    document.querySelector("#chroma").onclick = function () {
    manipulateImage("chroma");
    };
    
    document.querySelector("#greyscale").onclick = function () {
    manipulateImage("greyscale");
    };
    
    document.querySelector("#vibrant").onclick = function () {
    manipulateImage("vibrant");
    };
    
    document.querySelector("#revert").onclick = function () {
    revertImage();
    };
    
    function makePixelInverted(r, g, b, a) {
                r = 255 - r;
                g = 255 - g;
                b = 255 - b;
                return [r, g, b, a];
    };

    function makePixelSepia(r, g, b, a) {
                r = (0.393 * r) + (0.769 * g) + (0.189 * b);
                g = (0.349 * r) + (0.686 * g) + (0.168 * b);
                b = (0.272 * r) + (0.534 * g) + (0.131 * b);
                if(r>255) {
                    r=255;
                }
                if(g>255) {
                    g=255;
                }
                if(b>255) {
                    b=255;
                }
                return [r, g, b, a];
    };

    function makePixelChroma(r, g, b, a) {
                var max;
                max = Math.max(r, Math.max(g, b));
                if (max === g) {
                    return [0, 0, 0, 0];
                } 
                else {
                    return [r, g, b, a];
                }
    };

    function makePixelGreyScale(r, g, b, a) {
                var y;
                y = (0.3 * r) + (0.59 * g) + (0.11 * b);
                r = y;
                g = y;
                b = y;
                return [r, g, b, a];
    };

    function makePixelVibrant(r, g, b, a) {
                var amt, avg, bs, gs, mx, rs;
                avg = (r + g + b) / 3.0;
                mx = Math.max(r, Math.max(g, b));
                amt = (mx / 255 * avg / 255) * (-0.4 * 3.0);
                rs = r + (amt * (mx - r));
                gs = g + (amt * (mx - g));
                bs = b + (amt * (mx - b));
                return [rs, gs, bs, a];
    };     
    
})();