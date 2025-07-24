window.onload = init;

document.getElementById('test').innerHTML = 'Hello JavaScript!';

// let map;

// async function initMap() {
//   const { Map } = await google.maps.importLibrary('maps');

//   map = new Map(document.getElementById('map'), {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 8,
//   });
// }

//initMap();

// homemade render library //
var render = {
  // draw an ellipse
  ellipse: function (x, y, r, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();
  },

  // find mouse position, refer to render.mousePos{x,y} for coordinates
  findMousePos: function () {
    var main = main || window.event;

    if (main == null) {
      return;
    }

    //pulled this from google (well partially)
    //https://plainjs.com/javascript/events/getting-the-current-mouse-position-16/
    var x = main.pageX;
    var y = main.pageY;

    var canvasDat = canvas.getBoundingClientRect();

    x = main.clientX - canvasDat.left;
    y = main.clientY - canvasDat.top;

    render.mousePos = {
      x: x,
      y: y,
    };
  },

  // draw an image; please note that genImage must first be used to generate a usable image format for JS!!
  // image already existing in elements are good, do not need to use render.genImage
  drawImage: function (input, x, y, width, height) {
    if (width != null && height != null) {
      ctx.drawImage(input, x, y, width, height);
    } else {
      ctx.drawImage(input, x, y);
    }
  },

  // generate an image for use with render.drawImage
  genImage: function (inputImg) {
    var img = new Image();
    img.src = inputImg;
    //console.log(img)
    return img;
  },
};
// homemade render library //

// homemade key library //
var ekl_keys = {};
window.onkeyup = function (e) {
  ekl_keys[e.keyCode] = false;
};
window.onkeydown = function (e) {
  ekl_keys[e.keyCode] = true;
};

var keyLib = {
  queryKey: function (input) {
    if (typeof input !== 'string') {
      return ekl_keys[input];
    } else if (typeof input === 'string') {
      if (input === 'E') {
        return ekl_keys[69];
      }
      if (input === 'Q') {
        return ekl_keys[81];
      }
      if (input === 'W') {
        return ekl_keys[87];
      }
      if (input === 'A') {
        return ekl_keys[65];
      }
      if (input === 'S') {
        return ekl_keys[83];
      }
      if (input === 'D') {
        return ekl_keys[68];
      }
      if (input === '1') {
        return ekl_keys[49];
      }
      if (input === '2') {
        return ekl_keys[50];
      }
      if (input === '3') {
        return ekl_keys[51];
      }
      if (input === '4') {
        return ekl_keys[52];
      }
      if (input === '5') {
        return ekl_keys[53];
      }
      if (input === '6') {
        return ekl_keys[54];
      }
      if (input === '7') {
        return ekl_keys[55];
      }
      if (input === '8') {
        return ekl_keys[56];
      }
      if (input === '9') {
        return ekl_keys[57];
      }
      if (input === '0') {
        return ekl_keys[48];
      }
    }
  },
};
// to use: keyLib.queryKey("Q")), etc
// doesn't scale all that well, but oh well. this can be rewritten later.
// key library //

//1 = mouse1, 2 = middleMouse, 3= mouse2
var mouseDown = 0;
window.addEventListener('mousedown', (e) => {
  mouseDown = e.button + 1;
});
window.addEventListener('mouseup', (e) => {
  mouseDown = 0;
});

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var bg;
function init() {
  bg = render.genImage('purdue_map.png');
  

  loop();
}

// wheel actions
canvas.onmousewheel = function (event){
    var wheel = event.wheelDelta/120;//n or -n
    var zoom = 0;
    if(wheel < 0)
    {
        console.log("work");
		scale *= 0.9
    }
    else
    {
       console.log("work");
	   scale *= 1.1
    }
	
	// prevent scrolling
	return false;
}

document.onmousemove = render.findMousePos;

var frameCount = 0;
var lastRender = 0;
function loop(timestamp) {
  frameCount++;
  var progress = timestamp - lastRender;

  if (frameCount % 3 === 0) {
    //refresh every 3 ticks, limits to 20fps
    draw();
  }
  lastRender = timestamp;
  window.requestAnimationFrame(loop);
}

var offsetX = 0;
var offsetY = 0;
var originalMousePos = { x: 0, y: 0 }; // hold values of where the mouse *was* when initially holding down m1, for panning
var originalOffset = [0, 0]; // same as above, just for offset
var m1Held = false;
var lockMouse = false; // if set to true, stop registering mouse inputs until mouse is back on top of canvas

var demoObjects = []; // an array of objects to be drawn; drawn below whenever user clicks on canvas, exists primarily to demo scaling/offsets

var scale = 1.0;
function draw() {
  //resets frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //render.findMousePos();


  //render.drawImage(bg,offsetX,offsetY);

  //1700x2200 is native resolution for the image
  render.drawImage(bg, offsetX * scale, offsetY * scale, 1700 * scale, 2200 * scale);
  sketchDemo(demoObjects, offsetX * scale, offsetY * scale);
  
  

  // rendering at the mouse position doesn't work unless canvas has detected mouse's position, which can only be determined
  // if the user moves their mouse at some point.
  if (render.mousePos) {
    render.ellipse(render.mousePos.x, render.mousePos.y, 10, 'red');

    var buffer = 20; // pixels, buffer zone where if on edge, map will pan

    if (mouseDown == 0 && !lockMouse) {
      //pan left/right
      if (render.mousePos.x <= buffer) {
        offsetX += (5 * (buffer - render.mousePos.x)) / buffer;
      } else if (render.mousePos.x >= canvas.width - buffer) {
        offsetX -=
          (5 * (canvas.width - Math.min(render.mousePos.x, canvas.width))) /
          buffer;
      }
      offsetX = Math.max(Math.min(offsetX, 0), -1300);

      //pan up/down
      if (render.mousePos.y <= buffer) {
        offsetY += 5;
      } else if (render.mousePos.y >= canvas.height - buffer) {
        offsetY -= 5;
      }
      offsetY = Math.max(Math.min(offsetY, 0), -1700);
    }
	
	
	var buffer = 150; // pixels, buffer zone where if on edge, map will pan
	var speed = 10;
	
	
	if (mouseDown == 0 && !lockMouse) {
		//pan left/right
		if (render.mousePos.x <= buffer) {
			offsetX += speed * (buffer - Math.max(render.mousePos.x,0))/buffer;
		} else if (render.mousePos.x >= canvas.width - buffer) {
			offsetX -= speed * (buffer - canvas.width + Math.min(render.mousePos.x,canvas.width))/(buffer);
		}
		offsetX = Math.max(Math.min(offsetX,0), -1300)
		
		//pan up/down
		if (render.mousePos.y <= buffer) {
			offsetY += speed * (buffer - Math.max(render.mousePos.y,0))/buffer;
		} else if (render.mousePos.y >= canvas.height - buffer) {
			offsetY -= speed * (buffer - canvas.width + Math.min(render.mousePos.y,canvas.height))/(buffer);
		}
		offsetY = Math.max(Math.min(offsetY,0), -1700)
	}
  }
  
  

  // note: panning via mouse is a bit weird right now, but this'll be important to have decently functional for touchscreens.
  if (lockMouse) {
    mouseDown = 0;

    var mouseOnCanvasX =
      render.mousePos.x > 0 && render.mousePos.x < canvas.width;
    var mouseOnCanvasY =
      render.mousePos.y > 0 && render.mousePos.y < canvas.height;

    if (mouseOnCanvasX && mouseOnCanvasY) {
      lockMouse = false;
    }
  }
  if (mouseDown == 1 && render.mousePos) {
    if (!m1Held) {
      originalMousePos = { x: render.mousePos.x, y: render.mousePos.y };
      originalOffset = [offsetX, offsetY];
	  
	  demoObjects[demoObjects.length] = {x:render.mousePos.x - offsetX,y:render.mousePos.y -	 offsetY,r:5}
    }
    m1Held = true;

    offsetX = originalOffset[0] + render.mousePos.x - originalMousePos.x;
    offsetY = originalOffset[1] + render.mousePos.y - originalMousePos.y;

    if (
      render.mousePos.y <= 0 ||
      render.mousePos.x <= 0 ||
      render.mousePos.x >= canvas.width ||
      render.mousePos.y >= canvas.height
    ) {
      lockMouse = true;
    }
  } else if (m1Held) {
    m1Held = false;
  }
  
  

  //ctx.drawImage(,0,0);

  //console.log("wow")
}


function sketchDemo(input, offsetX, offsetY) {
	for (i = 0; i < input.length; i++) {
		//console.log(input[i]);
		render.ellipse(input[i].x + offsetX, input[i].y + offsetY, input[i].r * scale, 'red');
	}
}