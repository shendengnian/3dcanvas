    window.requestAnimFrame = (function(){
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
      function(callback){
        window.setTimeout(callback, 1000 / 60);
    };
})();

(function app() {
    var canvas = document.getElementsByTagName("canvas")[0];

    if (canvas.getContext) {
    var ctx = canvas.getContext("2d"),
      baseDim = 1500,
        cubes = 13,
    speed = 1,
      newDim = baseDim;

  function drawScreen() {
      var w = window.innerWidth,
          h = window.innerHeight,
          s = 2;

  // adjust canvas to be retina-friendly
      canvas.width = w * s;
      canvas.height = h * s;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.scale(s,s);

  // slightly increase cube dimensions
      newDim *= 1 + (speed * 0.01);
      if (newDim >= baseDim * 4) {
      newDim = baseDim;
      }

      ctx.clearRect(0,0,w,h);

      var cube = function(x,y,d,flipped) {
        var f = flipped == true ? -1 : 1,
          color = ["#fff", "#aaa", "#d5d5d5"],
          dHalved = d/2,
          triH = Math.sqrt(3)/2,

          side = function(color, pts) {
           this.color = color;
            // ensure pts is an array
            if (Array.isArray(pts)) {
              this.pt = [];

              for (var p = 0; p < pts.length; ++p) {
                this.pt[p] = pts[p];
              }
            } else {
              // if not, use pts as is
              this.pt = pts;
            }
          },
          sides = [
            // top
            new side(
              color[0],
              [
                [x,y],
                [x-(d*triH),y-(f*(dHalved))],
                [x,y-(f*(d))],
                [x+(d*triH),y-(f*(dHalved))]
              ]
            ),
            // left
            new side(
              (flipped == true ? color[1] : color[2]),
              [
                [x,y],
                [x-(d*triH),y-(f*(dHalved))],
                [x-(d*triH),y+(f*(dHalved))],
                [x,y+(f*d)]
              ]
            ),
            // right
            new side(
              (flipped == true ? color[2] : color[1]),
              [
                [x,y],
                [x+(d*triH),y-(f*(dHalved))],
                [x+(d*triH),y+(f*(dHalved))],
                [x,y+(f*d)]
              ]
            )
          ],
          // this will do nothing rather than produce errors if improper arguments are used
          drawSide = function(side) {
            if (typeof side === "object") {
              var invalid = false;

              // validate set of points and move point
              if (Array.isArray(side.pt) && Array.isArray(side.pt[0])) {
                  ctx.fillStyle = side.color;
                  ctx.beginPath();
                  ctx.moveTo(side.pt[0][0], side.pt[0][1]);

                  // validate rest of points
                  for (var p = 1; p < side.pt.length; ++p) {
                    if (Array.isArray(side.pt[p])) {
                      ctx.lineTo(side.pt[p][0],side.pt[p][1]);

                      // back to move point
                      if (p == side.pt.length - 1) {
                        ctx.lineTo(side.pt[0][0], side.pt[0][1]);
                      }
                    } else {
                      // close path and stop loop immediately if loop encounters invalid point
                      invalid = true;
                      ctx.closePath();
                      break;
                    }
                  }

              } else {
                invalid = true;
              }

              if (invalid == false) {
                ctx.fill();
                ctx.closePath();
              }
            }
          };

      // render sides
      for (var s = 0; s < sides.length; ++s) {
        drawSide(sides[s]);
      }
  };

  // render cubes
  for (var i = 0; i < cubes; ++i) {
      cube(w/2,h/2,(newDim / Math.pow(2,i)),(i % 2 == 0 ? true : false));
  }
}

drawScreen();

(function animLoop(){
  requestAnimFrame(animLoop);
  drawScreen();
 })();
}
})();
