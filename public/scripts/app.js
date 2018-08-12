(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

console.log("linked");

// <script>
var ctx = document.getElementById("ctx").getContext("2d");
ctx.font = '30px Arial';
var height = 500;
var width = 500;
// var message = 'Bouncing';

// player 
var x = 50;
var spdX = 30;
var y = 40;
var spdY = 5;
var name = 'P';

var enemy_x = 150;
var enemy_spdX = 10;
var enemy_y = 350;
var enemy_spdY = 15;
var enemy_name = 'E';

setInterval(update, 80);

function update() {
    //player movement
    x += spdX;
    y += spdY;
    ctx.fillText(name, x, y);
    console.log("player moving", x);
    //collision detection to change the direction of player when it hits the boundaries
    if (x < 0 || x > width) {
        console.log('Out of Bounds');
        spdX = -spdX;
    }
    if (y < 0 || y > height) {
        spdY = -spdY;
    }

    //enemy movement
    enemy_x += enemy_spdX;
    enemy_y += enemy_spdY;
    ctx.fillText(enemy_name, enemy_x, enemy_y);
    console.log("enemy moving", enemy_x);

    //enemy collision to change direction when it hits the boundaries
    if (enemy_x < 0 || enemy_x > width) {
        enemy_spdX = -enemy_spdX;
    }
    if (enemy_y < 0 || enemy_y > height) {
        enemy_spdY = -enemy_spdY;
    }
};

/*	Comment Section

//1. Modify Settings =
ctx.font = '30px Arial';	//Font used
ctx.fillStyle = 'red';		//Color of the text and forms
ctx.globalAlpha = 0.5;		//Transparency 0 = invisble, 1 = visible

//2. Draw something ()
ctx.fillText('Hello',50,50);	//Write text ... ctx.fillText('text',x,y);
ctx.fillRect(50,50,100,100);		//Draw rectangle ... ctx.fillRect(startX,startY,width,height);
ctx.clearRect(75,75,100,100);		//Clear Canvas ... ctx.fillRect(startX,startY,width,height);

x += spdX; 	same than	x = x +spdX

Debugger:
F12
Breakpoint = Code stops when reaches this line if console is opened
Console = Get the value of variable + Message with console.log('text');

End of Comment Section */

// </script>

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLFFBQVEsR0FBUixDQUFZLFFBQVo7O0FBRUk7QUFDSSxJQUFNLE1BQU0sU0FBUyxjQUFULENBQXdCLEtBQXhCLEVBQStCLFVBQS9CLENBQTBDLElBQTFDLENBQVo7QUFDQSxJQUFJLElBQUosR0FBVyxZQUFYO0FBQ0EsSUFBTSxTQUFTLEdBQWY7QUFDQSxJQUFNLFFBQVEsR0FBZDtBQUNBOztBQUVBO0FBQ0EsSUFBSSxJQUFJLEVBQVI7QUFDQSxJQUFJLE9BQU8sRUFBWDtBQUNBLElBQUksSUFBSSxFQUFSO0FBQ0EsSUFBSSxPQUFPLENBQVg7QUFDQSxJQUFNLE9BQU8sR0FBYjs7QUFHQSxJQUFJLFVBQVUsR0FBZDtBQUNBLElBQUksYUFBYSxFQUFqQjtBQUNBLElBQUksVUFBVSxHQUFkO0FBQ0EsSUFBSSxhQUFhLEVBQWpCO0FBQ0EsSUFBSSxhQUFhLEdBQWpCOztBQUVBLFlBQVksTUFBWixFQUFvQixFQUFwQjs7QUFFSixTQUFTLE1BQVQsR0FBa0I7QUFDbEI7QUFDSSxTQUFLLElBQUw7QUFDQSxTQUFLLElBQUw7QUFDQSxRQUFJLFFBQUosQ0FBYSxJQUFiLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCO0FBQ0EsWUFBUSxHQUFSLENBQVksZUFBWixFQUE2QixDQUE3QjtBQUNKO0FBQ0ksUUFBRyxJQUFJLENBQUosSUFBUyxJQUFJLEtBQWhCLEVBQXVCO0FBQ25CLGdCQUFRLEdBQVIsQ0FBWSxlQUFaO0FBQ0EsZUFBTyxDQUFDLElBQVI7QUFDSDtBQUNELFFBQUcsSUFBSSxDQUFKLElBQVMsSUFBSSxNQUFoQixFQUF3QjtBQUNwQixlQUFPLENBQUMsSUFBUjtBQUNIOztBQUVMO0FBQ0ksZUFBVyxVQUFYO0FBQ0EsZUFBVyxVQUFYO0FBQ0EsUUFBSSxRQUFKLENBQWEsVUFBYixFQUF5QixPQUF6QixFQUFrQyxPQUFsQztBQUNBLFlBQVEsR0FBUixDQUFZLGNBQVosRUFBNEIsT0FBNUI7O0FBRUo7QUFDSSxRQUFHLFVBQVUsQ0FBVixJQUFlLFVBQVUsS0FBNUIsRUFBbUM7QUFDL0IscUJBQWEsQ0FBQyxVQUFkO0FBQ0g7QUFDRCxRQUFHLFVBQVUsQ0FBVixJQUFlLFVBQVUsTUFBNUIsRUFBb0M7QUFDaEMscUJBQWEsQ0FBQyxVQUFkO0FBQ0g7QUFFSjs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JKIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc29sZS5sb2coXCJsaW5rZWRcIik7XHJcblxyXG4gICAgLy8gPHNjcmlwdD5cclxuICAgICAgICBjb25zdCBjdHggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN0eFwiKS5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgY3R4LmZvbnQgPSAnMzBweCBBcmlhbCc7XHJcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gNTAwO1xyXG4gICAgICAgIGNvbnN0IHdpZHRoID0gNTAwO1xyXG4gICAgICAgIC8vIHZhciBtZXNzYWdlID0gJ0JvdW5jaW5nJztcclxuICAgICAgICBcclxuICAgICAgICAvLyBwbGF5ZXIgXHJcbiAgICAgICAgbGV0IHggPSA1MDtcclxuICAgICAgICBsZXQgc3BkWCA9IDMwO1xyXG4gICAgICAgIGxldCB5ID0gNDA7XHJcbiAgICAgICAgbGV0IHNwZFkgPSA1O1xyXG4gICAgICAgIGNvbnN0IG5hbWUgPSAnUCc7XHJcblxyXG5cclxuICAgICAgICBsZXQgZW5lbXlfeCA9IDE1MDtcclxuICAgICAgICBsZXQgZW5lbXlfc3BkWCA9IDEwO1xyXG4gICAgICAgIGxldCBlbmVteV95ID0gMzUwO1xyXG4gICAgICAgIGxldCBlbmVteV9zcGRZID0gMTU7XHJcbiAgICAgICAgbGV0IGVuZW15X25hbWUgPSAnRSc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc2V0SW50ZXJ2YWwodXBkYXRlLCA4MCk7XHJcbiAgICAgICAgXHJcbiAgICBmdW5jdGlvbiB1cGRhdGUoKSB7XHJcbiAgICAvL3BsYXllciBtb3ZlbWVudFxyXG4gICAgICAgIHggKz0gc3BkWDtcclxuICAgICAgICB5ICs9IHNwZFk7XHJcbiAgICAgICAgY3R4LmZpbGxUZXh0KG5hbWUsIHgsIHkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIG1vdmluZ1wiLCB4KTtcclxuICAgIC8vY29sbGlzaW9uIGRldGVjdGlvbiB0byBjaGFuZ2UgdGhlIGRpcmVjdGlvbiBvZiBwbGF5ZXIgd2hlbiBpdCBoaXRzIHRoZSBib3VuZGFyaWVzXHJcbiAgICAgICAgaWYoeCA8IDAgfHwgeCA+IHdpZHRoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdPdXQgb2YgQm91bmRzJyk7XHJcbiAgICAgICAgICAgIHNwZFggPSAtc3BkWDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoeSA8IDAgfHwgeSA+IGhlaWdodCkge1xyXG4gICAgICAgICAgICBzcGRZID0gLXNwZFk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAvL2VuZW15IG1vdmVtZW50XHJcbiAgICAgICAgZW5lbXlfeCArPSBlbmVteV9zcGRYO1xyXG4gICAgICAgIGVuZW15X3kgKz0gZW5lbXlfc3BkWTtcclxuICAgICAgICBjdHguZmlsbFRleHQoZW5lbXlfbmFtZSwgZW5lbXlfeCwgZW5lbXlfeSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJlbmVteSBtb3ZpbmdcIiwgZW5lbXlfeCk7XHJcblxyXG4gICAgLy9lbmVteSBjb2xsaXNpb24gdG8gY2hhbmdlIGRpcmVjdGlvbiB3aGVuIGl0IGhpdHMgdGhlIGJvdW5kYXJpZXNcclxuICAgICAgICBpZihlbmVteV94IDwgMCB8fCBlbmVteV94ID4gd2lkdGgpIHtcclxuICAgICAgICAgICAgZW5lbXlfc3BkWCA9IC1lbmVteV9zcGRYO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihlbmVteV95IDwgMCB8fCBlbmVteV95ID4gaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIGVuZW15X3NwZFkgPSAtZW5lbXlfc3BkWTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICAvKlx0Q29tbWVudCBTZWN0aW9uXHJcbiAgICBcclxuICAgIC8vMS4gTW9kaWZ5IFNldHRpbmdzID1cclxuICAgIGN0eC5mb250ID0gJzMwcHggQXJpYWwnO1x0Ly9Gb250IHVzZWRcclxuICAgIGN0eC5maWxsU3R5bGUgPSAncmVkJztcdFx0Ly9Db2xvciBvZiB0aGUgdGV4dCBhbmQgZm9ybXNcclxuICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuNTtcdFx0Ly9UcmFuc3BhcmVuY3kgMCA9IGludmlzYmxlLCAxID0gdmlzaWJsZVxyXG4gICAgXHJcbiAgICAvLzIuIERyYXcgc29tZXRoaW5nICgpXHJcbiAgICBjdHguZmlsbFRleHQoJ0hlbGxvJyw1MCw1MCk7XHQvL1dyaXRlIHRleHQgLi4uIGN0eC5maWxsVGV4dCgndGV4dCcseCx5KTtcclxuICAgIGN0eC5maWxsUmVjdCg1MCw1MCwxMDAsMTAwKTtcdFx0Ly9EcmF3IHJlY3RhbmdsZSAuLi4gY3R4LmZpbGxSZWN0KHN0YXJ0WCxzdGFydFksd2lkdGgsaGVpZ2h0KTtcclxuICAgIGN0eC5jbGVhclJlY3QoNzUsNzUsMTAwLDEwMCk7XHRcdC8vQ2xlYXIgQ2FudmFzIC4uLiBjdHguZmlsbFJlY3Qoc3RhcnRYLHN0YXJ0WSx3aWR0aCxoZWlnaHQpO1xyXG4gICAgXHJcbiAgICB4ICs9IHNwZFg7IFx0c2FtZSB0aGFuXHR4ID0geCArc3BkWFxyXG4gICAgXHJcbiAgICBEZWJ1Z2dlcjpcclxuICAgIEYxMlxyXG4gICAgQnJlYWtwb2ludCA9IENvZGUgc3RvcHMgd2hlbiByZWFjaGVzIHRoaXMgbGluZSBpZiBjb25zb2xlIGlzIG9wZW5lZFxyXG4gICAgQ29uc29sZSA9IEdldCB0aGUgdmFsdWUgb2YgdmFyaWFibGUgKyBNZXNzYWdlIHdpdGggY29uc29sZS5sb2coJ3RleHQnKTtcclxuICAgIFxyXG4gICAgRW5kIG9mIENvbW1lbnQgU2VjdGlvbiAqL1xyXG4gICAgXHJcbiAgICBcclxuLy8gPC9zY3JpcHQ+Il19
