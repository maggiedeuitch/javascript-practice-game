(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

console.log("linked");

// <script>
var ctx = document.getElementById("ctx").getContext("2d");
ctx.font = '30px Arial';
var height = 500;
var width = 500;
// var message = 'Bouncing';

var player = {
    x: 50,
    spdX: 30,
    y: 40,
    spdY: 5,
    name: "P"
};
//enemyList stores all the enemies in an object
var enemyList = {};

var enemy = {
    x: 150,
    spdX: 10,
    y: 350,
    spdY: 15,
    name: "E",
    id: "E1"
};
//create the first item in enemyList
enemyList["E1"] = enemy;

var enemy2 = {
    x: 250,
    spdX: 10,
    y: 450,
    spdY: 15,
    name: "E",
    id: "E2"
};

enemyList["E2"] = enemy2;
console.log(enemyList);

var enemy3 = {
    x: 230,
    spdX: 5,
    y: 70,
    spdY: -8,
    name: "E",
    id: "E3"
};

enemyList["E3"] = enemy3;
console.log(enemyList);

setInterval(update, 40);

function updateEntity(entity) {
    //entity movement
    entity.x += entity.spdX;
    entity.y += entity.spdY;
    ctx.fillText(entity.name, entity.x, entity.y);
    // console.log(`${entity} moving`, x);
    //collision detection to change the direction of entity when it hits the boundaries
    if (entity.x < 0 || entity.x > width) {
        // console.log('Out of Bounds');
        entity.spdX = -entity.spdX;
    }
    if (entity.y < 0 || entity.y > height) {
        entity.spdY = -entity.spdY;
    }
}

function update() {
    // clears rectangle in canvas so the fillText doesn't just repeat
    ctx.clearRect(0, 0, width, height);

    updateEntity(player);

    //loop through enemyList to update enemies
    for (var key in enemyList) {
        updateEntity(enemyList[key]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLFFBQVEsR0FBUixDQUFZLFFBQVo7O0FBRUE7QUFDQSxJQUFNLE1BQU0sU0FBUyxjQUFULENBQXdCLEtBQXhCLEVBQStCLFVBQS9CLENBQTBDLElBQTFDLENBQVo7QUFDQSxJQUFJLElBQUosR0FBVyxZQUFYO0FBQ0EsSUFBTSxTQUFTLEdBQWY7QUFDQSxJQUFNLFFBQVEsR0FBZDtBQUNBOztBQUVBLElBQU0sU0FBUztBQUNYLE9BQUksRUFETztBQUVYLFVBQU8sRUFGSTtBQUdYLE9BQUksRUFITztBQUlYLFVBQU8sQ0FKSTtBQUtYLFVBQU87QUFMSSxDQUFmO0FBT0E7QUFDQSxJQUFJLFlBQVksRUFBaEI7O0FBRUEsSUFBTSxRQUFRO0FBQ1YsT0FBSSxHQURNO0FBRVYsVUFBTyxFQUZHO0FBR1YsT0FBSSxHQUhNO0FBSVYsVUFBTyxFQUpHO0FBS1YsVUFBTyxHQUxHO0FBTVYsUUFBSTtBQU5NLENBQWQ7QUFRQTtBQUNBLFVBQVUsSUFBVixJQUFrQixLQUFsQjs7QUFFQSxJQUFNLFNBQVM7QUFDWCxPQUFJLEdBRE87QUFFWCxVQUFPLEVBRkk7QUFHWCxPQUFJLEdBSE87QUFJWCxVQUFPLEVBSkk7QUFLWCxVQUFPLEdBTEk7QUFNWCxRQUFJO0FBTk8sQ0FBZjs7QUFTQSxVQUFVLElBQVYsSUFBa0IsTUFBbEI7QUFDQSxRQUFRLEdBQVIsQ0FBWSxTQUFaOztBQUVBLElBQU0sU0FBUztBQUNYLE9BQUksR0FETztBQUVYLFVBQU8sQ0FGSTtBQUdYLE9BQUksRUFITztBQUlYLFVBQU8sQ0FBQyxDQUpHO0FBS1gsVUFBTyxHQUxJO0FBTVgsUUFBSTtBQU5PLENBQWY7O0FBU0EsVUFBVSxJQUFWLElBQWtCLE1BQWxCO0FBQ0EsUUFBUSxHQUFSLENBQVksU0FBWjs7QUFFQSxZQUFZLE1BQVosRUFBb0IsRUFBcEI7O0FBRUEsU0FBUyxZQUFULENBQXVCLE1BQXZCLEVBQStCO0FBQy9CO0FBQ0ksV0FBTyxDQUFQLElBQVksT0FBTyxJQUFuQjtBQUNBLFdBQU8sQ0FBUCxJQUFZLE9BQU8sSUFBbkI7QUFDQSxRQUFJLFFBQUosQ0FBYSxPQUFPLElBQXBCLEVBQTBCLE9BQU8sQ0FBakMsRUFBb0MsT0FBTyxDQUEzQztBQUNBO0FBQ0o7QUFDSSxRQUFHLE9BQU8sQ0FBUCxHQUFXLENBQVgsSUFBZ0IsT0FBTyxDQUFQLEdBQVcsS0FBOUIsRUFBcUM7QUFDakM7QUFDQSxlQUFPLElBQVAsR0FBYyxDQUFDLE9BQU8sSUFBdEI7QUFDSDtBQUNELFFBQUcsT0FBTyxDQUFQLEdBQVcsQ0FBWCxJQUFnQixPQUFPLENBQVAsR0FBVyxNQUE5QixFQUFzQztBQUNsQyxlQUFPLElBQVAsR0FBYyxDQUFDLE9BQU8sSUFBdEI7QUFDSDtBQUNKOztBQUVELFNBQVMsTUFBVCxHQUFrQjtBQUNsQjtBQUNJLFFBQUksU0FBSixDQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBb0IsS0FBcEIsRUFBMkIsTUFBM0I7O0FBRUEsaUJBQWEsTUFBYjs7QUFFQTtBQUNBLFNBQUssSUFBSSxHQUFULElBQWdCLFNBQWhCLEVBQTJCO0FBQ3ZCLHFCQUFhLFVBQVUsR0FBVixDQUFiO0FBQ0g7QUFFSjs7QUFJRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JKIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc29sZS5sb2coXCJsaW5rZWRcIik7XHJcblxyXG4vLyA8c2NyaXB0PlxyXG5jb25zdCBjdHggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN0eFwiKS5nZXRDb250ZXh0KFwiMmRcIik7XHJcbmN0eC5mb250ID0gJzMwcHggQXJpYWwnO1xyXG5jb25zdCBoZWlnaHQgPSA1MDA7XHJcbmNvbnN0IHdpZHRoID0gNTAwO1xyXG4vLyB2YXIgbWVzc2FnZSA9ICdCb3VuY2luZyc7XHJcblxyXG5jb25zdCBwbGF5ZXIgPSB7XHJcbiAgICB4IDogNTAsXHJcbiAgICBzcGRYIDogMzAsXHJcbiAgICB5IDogNDAsXHJcbiAgICBzcGRZIDogNSxcclxuICAgIG5hbWUgOiBcIlBcIlxyXG59O1xyXG4vL2VuZW15TGlzdCBzdG9yZXMgYWxsIHRoZSBlbmVtaWVzIGluIGFuIG9iamVjdFxyXG5sZXQgZW5lbXlMaXN0ID0ge307XHJcblxyXG5jb25zdCBlbmVteSA9IHtcclxuICAgIHggOiAxNTAsXHJcbiAgICBzcGRYIDogMTAsXHJcbiAgICB5IDogMzUwLFxyXG4gICAgc3BkWSA6IDE1LFxyXG4gICAgbmFtZSA6IFwiRVwiLFxyXG4gICAgaWQ6IFwiRTFcIlxyXG59O1xyXG4vL2NyZWF0ZSB0aGUgZmlyc3QgaXRlbSBpbiBlbmVteUxpc3RcclxuZW5lbXlMaXN0W1wiRTFcIl0gPSBlbmVteTtcclxuXHJcbmNvbnN0IGVuZW15MiA9IHtcclxuICAgIHggOiAyNTAsXHJcbiAgICBzcGRYIDogMTAsXHJcbiAgICB5IDogNDUwLFxyXG4gICAgc3BkWSA6IDE1LFxyXG4gICAgbmFtZSA6IFwiRVwiLFxyXG4gICAgaWQ6IFwiRTJcIlxyXG59O1xyXG5cclxuZW5lbXlMaXN0W1wiRTJcIl0gPSBlbmVteTI7XHJcbmNvbnNvbGUubG9nKGVuZW15TGlzdCk7XHJcblxyXG5jb25zdCBlbmVteTMgPSB7XHJcbiAgICB4IDogMjMwLFxyXG4gICAgc3BkWCA6IDUsXHJcbiAgICB5IDogNzAsXHJcbiAgICBzcGRZIDogLTgsXHJcbiAgICBuYW1lIDogXCJFXCIsXHJcbiAgICBpZDogXCJFM1wiXHJcbn07XHJcblxyXG5lbmVteUxpc3RbXCJFM1wiXSA9IGVuZW15MztcclxuY29uc29sZS5sb2coZW5lbXlMaXN0KTtcclxuXHJcbnNldEludGVydmFsKHVwZGF0ZSwgNDApO1xyXG5cclxuZnVuY3Rpb24gdXBkYXRlRW50aXR5IChlbnRpdHkpIHtcclxuLy9lbnRpdHkgbW92ZW1lbnRcclxuICAgIGVudGl0eS54ICs9IGVudGl0eS5zcGRYO1xyXG4gICAgZW50aXR5LnkgKz0gZW50aXR5LnNwZFk7XHJcbiAgICBjdHguZmlsbFRleHQoZW50aXR5Lm5hbWUsIGVudGl0eS54LCBlbnRpdHkueSk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhgJHtlbnRpdHl9IG1vdmluZ2AsIHgpO1xyXG4vL2NvbGxpc2lvbiBkZXRlY3Rpb24gdG8gY2hhbmdlIHRoZSBkaXJlY3Rpb24gb2YgZW50aXR5IHdoZW4gaXQgaGl0cyB0aGUgYm91bmRhcmllc1xyXG4gICAgaWYoZW50aXR5LnggPCAwIHx8IGVudGl0eS54ID4gd2lkdGgpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnT3V0IG9mIEJvdW5kcycpO1xyXG4gICAgICAgIGVudGl0eS5zcGRYID0gLWVudGl0eS5zcGRYO1xyXG4gICAgfVxyXG4gICAgaWYoZW50aXR5LnkgPCAwIHx8IGVudGl0eS55ID4gaGVpZ2h0KSB7XHJcbiAgICAgICAgZW50aXR5LnNwZFkgPSAtZW50aXR5LnNwZFk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZSgpIHtcclxuLy8gY2xlYXJzIHJlY3RhbmdsZSBpbiBjYW52YXMgc28gdGhlIGZpbGxUZXh0IGRvZXNuJ3QganVzdCByZXBlYXRcclxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgdXBkYXRlRW50aXR5KHBsYXllcik7XHJcblxyXG4gICAgLy9sb29wIHRocm91Z2ggZW5lbXlMaXN0IHRvIHVwZGF0ZSBlbmVtaWVzXHJcbiAgICBmb3IgKGxldCBrZXkgaW4gZW5lbXlMaXN0KSB7XHJcbiAgICAgICAgdXBkYXRlRW50aXR5KGVuZW15TGlzdFtrZXldKTtcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5cclxuXHJcbiAgICAvKlx0Q29tbWVudCBTZWN0aW9uXHJcbiAgICBcclxuICAgIC8vMS4gTW9kaWZ5IFNldHRpbmdzID1cclxuICAgIGN0eC5mb250ID0gJzMwcHggQXJpYWwnO1x0Ly9Gb250IHVzZWRcclxuICAgIGN0eC5maWxsU3R5bGUgPSAncmVkJztcdFx0Ly9Db2xvciBvZiB0aGUgdGV4dCBhbmQgZm9ybXNcclxuICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuNTtcdFx0Ly9UcmFuc3BhcmVuY3kgMCA9IGludmlzYmxlLCAxID0gdmlzaWJsZVxyXG4gICAgXHJcbiAgICAvLzIuIERyYXcgc29tZXRoaW5nICgpXHJcbiAgICBjdHguZmlsbFRleHQoJ0hlbGxvJyw1MCw1MCk7XHQvL1dyaXRlIHRleHQgLi4uIGN0eC5maWxsVGV4dCgndGV4dCcseCx5KTtcclxuICAgIGN0eC5maWxsUmVjdCg1MCw1MCwxMDAsMTAwKTtcdFx0Ly9EcmF3IHJlY3RhbmdsZSAuLi4gY3R4LmZpbGxSZWN0KHN0YXJ0WCxzdGFydFksd2lkdGgsaGVpZ2h0KTtcclxuICAgIGN0eC5jbGVhclJlY3QoNzUsNzUsMTAwLDEwMCk7XHRcdC8vQ2xlYXIgQ2FudmFzIC4uLiBjdHguZmlsbFJlY3Qoc3RhcnRYLHN0YXJ0WSx3aWR0aCxoZWlnaHQpO1xyXG4gICAgXHJcbiAgICB4ICs9IHNwZFg7IFx0c2FtZSB0aGFuXHR4ID0geCArc3BkWFxyXG4gICAgXHJcbiAgICBEZWJ1Z2dlcjpcclxuICAgIEYxMlxyXG4gICAgQnJlYWtwb2ludCA9IENvZGUgc3RvcHMgd2hlbiByZWFjaGVzIHRoaXMgbGluZSBpZiBjb25zb2xlIGlzIG9wZW5lZFxyXG4gICAgQ29uc29sZSA9IEdldCB0aGUgdmFsdWUgb2YgdmFyaWFibGUgKyBNZXNzYWdlIHdpdGggY29uc29sZS5sb2coJ3RleHQnKTtcclxuICAgIFxyXG4gICAgRW5kIG9mIENvbW1lbnQgU2VjdGlvbiAqL1xyXG4gICAgXHJcbiAgICBcclxuLy8gPC9zY3JpcHQ+Il19
