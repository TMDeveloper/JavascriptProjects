self.onmessage = function (e) {
  var effect = e.data.cmd;
  var imageData = e.data.data;
  var index = e.data.index;
  var segmentLength = e.data.length;
  var pixel, r, g, b, a;

       try {
         for (var i = 0; i < segmentLength; i += 4) {
            r = imageData.data[i];
            g = imageData.data[i + 1];
            b = imageData.data[i + 2];
            a = imageData.data[i + 3];
            
        switch (effect) {
        case 'invert':
            pixel = makePixelInverted(r, g, b, a);
            break;
                
        case 'sepia':
            pixel = makePixelSepia(r, g, b, a);
            break;
                
        case 'greyscale':
            pixel = makePixelGreyScale(r, g, b, a);
            break;
                
        case 'vibrant':
            pixel = makePixelVibrant(r, g, b, a);
            break;
                        
        case 'chroma':
            pixel = makePixelChroma(r, g, b, a);
            break;
        }
            imageData.data[i + 0] = pixel[0];
            imageData.data[i + 1] = pixel[1];
            imageData.data[i + 2] = pixel[2];
            imageData.data[i + 3] = pixel[3];
        }
           
        self.postMessage({result: imageData, index: index});
        self.close();
       } catch (e) {
        function ManipulationException(message) {
            this.name = "ManipulationException";
            this.message = message;
        };
        throw new ManipulationException('Image manipulation error');
        postMessage(undefined);
        }
        
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
    } else {
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
};

    