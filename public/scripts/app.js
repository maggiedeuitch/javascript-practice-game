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

var enemy = {
    x: 150,
    spdX: 10,
    y: 350,
    spdY: 15,
    name: "E"
};

var enemy2 = {
    x: 250,
    spdX: 10,
    y: 450,
    spdY: 15,
    name: "E"
};

setInterval(update, 40);

function updateEntity(entity) {
    //entity movement
    entity.x += entity.spdX;
    entity.y += entity.spdY;
    ctx.fillText(entity.name, entity.x, entity.y);
    // console.log(`${entity} moving`, x);
    //collision detection to change the direction of entity when it hits the boundaries
    if (entity.x < 0 || entity.x > width) {
        console.log('Out of Bounds');
        entity.spdX = -entity.spdX;
    }
    if (entity.y < 0 || entity.y > height) {
        entity.spdY = -entity.spdY;
    }
}

function update() {
    updateEntity(player);
    updateEntity(enemy);
    updateEntity(enemy2);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLFFBQVEsR0FBUixDQUFZLFFBQVo7O0FBRUk7QUFDSSxJQUFNLE1BQU0sU0FBUyxjQUFULENBQXdCLEtBQXhCLEVBQStCLFVBQS9CLENBQTBDLElBQTFDLENBQVo7QUFDQSxJQUFJLElBQUosR0FBVyxZQUFYO0FBQ0EsSUFBTSxTQUFTLEdBQWY7QUFDQSxJQUFNLFFBQVEsR0FBZDtBQUNBOztBQUVBLElBQUksU0FBUztBQUNULE9BQUksRUFESztBQUVULFVBQU8sRUFGRTtBQUdULE9BQUksRUFISztBQUlULFVBQU8sQ0FKRTtBQUtULFVBQU87QUFMRSxDQUFiOztBQVFBLElBQUksUUFBUTtBQUNSLE9BQUksR0FESTtBQUVSLFVBQU8sRUFGQztBQUdSLE9BQUksR0FISTtBQUlSLFVBQU8sRUFKQztBQUtSLFVBQU87QUFMQyxDQUFaOztBQVFBLElBQUksU0FBUztBQUNULE9BQUksR0FESztBQUVULFVBQU8sRUFGRTtBQUdULE9BQUksR0FISztBQUlULFVBQU8sRUFKRTtBQUtULFVBQU87QUFMRSxDQUFiOztBQVFBLFlBQVksTUFBWixFQUFvQixFQUFwQjs7QUFFQSxTQUFTLFlBQVQsQ0FBdUIsTUFBdkIsRUFBK0I7QUFDL0I7QUFDSSxXQUFPLENBQVAsSUFBWSxPQUFPLElBQW5CO0FBQ0EsV0FBTyxDQUFQLElBQVksT0FBTyxJQUFuQjtBQUNBLFFBQUksUUFBSixDQUFhLE9BQU8sSUFBcEIsRUFBMEIsT0FBTyxDQUFqQyxFQUFvQyxPQUFPLENBQTNDO0FBQ0E7QUFDSjtBQUNJLFFBQUcsT0FBTyxDQUFQLEdBQVcsQ0FBWCxJQUFnQixPQUFPLENBQVAsR0FBVyxLQUE5QixFQUFxQztBQUNqQyxnQkFBUSxHQUFSLENBQVksZUFBWjtBQUNBLGVBQU8sSUFBUCxHQUFjLENBQUMsT0FBTyxJQUF0QjtBQUNIO0FBQ0QsUUFBRyxPQUFPLENBQVAsR0FBVyxDQUFYLElBQWdCLE9BQU8sQ0FBUCxHQUFXLE1BQTlCLEVBQXNDO0FBQ2xDLGVBQU8sSUFBUCxHQUFjLENBQUMsT0FBTyxJQUF0QjtBQUNIO0FBQ0o7O0FBRUwsU0FBUyxNQUFULEdBQWtCO0FBQ2QsaUJBQWEsTUFBYjtBQUNBLGlCQUFhLEtBQWI7QUFDQSxpQkFBYSxNQUFiO0FBRUg7O0FBSUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCSiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnNvbGUubG9nKFwibGlua2VkXCIpO1xyXG5cclxuICAgIC8vIDxzY3JpcHQ+XHJcbiAgICAgICAgY29uc3QgY3R4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjdHhcIikuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIGN0eC5mb250ID0gJzMwcHggQXJpYWwnO1xyXG4gICAgICAgIGNvbnN0IGhlaWdodCA9IDUwMDtcclxuICAgICAgICBjb25zdCB3aWR0aCA9IDUwMDtcclxuICAgICAgICAvLyB2YXIgbWVzc2FnZSA9ICdCb3VuY2luZyc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHBsYXllciA9IHtcclxuICAgICAgICAgICAgeCA6IDUwLFxyXG4gICAgICAgICAgICBzcGRYIDogMzAsXHJcbiAgICAgICAgICAgIHkgOiA0MCxcclxuICAgICAgICAgICAgc3BkWSA6IDUsXHJcbiAgICAgICAgICAgIG5hbWUgOiBcIlBcIixcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgZW5lbXkgPSB7XHJcbiAgICAgICAgICAgIHggOiAxNTAsXHJcbiAgICAgICAgICAgIHNwZFggOiAxMCxcclxuICAgICAgICAgICAgeSA6IDM1MCxcclxuICAgICAgICAgICAgc3BkWSA6IDE1LFxyXG4gICAgICAgICAgICBuYW1lIDogXCJFXCJcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgZW5lbXkyID0ge1xyXG4gICAgICAgICAgICB4IDogMjUwLFxyXG4gICAgICAgICAgICBzcGRYIDogMTAsXHJcbiAgICAgICAgICAgIHkgOiA0NTAsXHJcbiAgICAgICAgICAgIHNwZFkgOiAxNSxcclxuICAgICAgICAgICAgbmFtZSA6IFwiRVwiXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgc2V0SW50ZXJ2YWwodXBkYXRlLCA0MCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlRW50aXR5IChlbnRpdHkpIHtcclxuICAgICAgICAvL2VudGl0eSBtb3ZlbWVudFxyXG4gICAgICAgICAgICBlbnRpdHkueCArPSBlbnRpdHkuc3BkWDtcclxuICAgICAgICAgICAgZW50aXR5LnkgKz0gZW50aXR5LnNwZFk7XHJcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChlbnRpdHkubmFtZSwgZW50aXR5LngsIGVudGl0eS55KTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYCR7ZW50aXR5fSBtb3ZpbmdgLCB4KTtcclxuICAgICAgICAvL2NvbGxpc2lvbiBkZXRlY3Rpb24gdG8gY2hhbmdlIHRoZSBkaXJlY3Rpb24gb2YgZW50aXR5IHdoZW4gaXQgaGl0cyB0aGUgYm91bmRhcmllc1xyXG4gICAgICAgICAgICBpZihlbnRpdHkueCA8IDAgfHwgZW50aXR5LnggPiB3aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ091dCBvZiBCb3VuZHMnKTtcclxuICAgICAgICAgICAgICAgIGVudGl0eS5zcGRYID0gLWVudGl0eS5zcGRYO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGVudGl0eS55IDwgMCB8fCBlbnRpdHkueSA+IGhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgZW50aXR5LnNwZFkgPSAtZW50aXR5LnNwZFk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlKCkge1xyXG4gICAgICAgIHVwZGF0ZUVudGl0eShwbGF5ZXIpO1xyXG4gICAgICAgIHVwZGF0ZUVudGl0eShlbmVteSk7XHJcbiAgICAgICAgdXBkYXRlRW50aXR5KGVuZW15Mik7XHJcblxyXG4gICAgfTtcclxuXHJcblxyXG5cclxuICAgIC8qXHRDb21tZW50IFNlY3Rpb25cclxuICAgIFxyXG4gICAgLy8xLiBNb2RpZnkgU2V0dGluZ3MgPVxyXG4gICAgY3R4LmZvbnQgPSAnMzBweCBBcmlhbCc7XHQvL0ZvbnQgdXNlZFxyXG4gICAgY3R4LmZpbGxTdHlsZSA9ICdyZWQnO1x0XHQvL0NvbG9yIG9mIHRoZSB0ZXh0IGFuZCBmb3Jtc1xyXG4gICAgY3R4Lmdsb2JhbEFscGhhID0gMC41O1x0XHQvL1RyYW5zcGFyZW5jeSAwID0gaW52aXNibGUsIDEgPSB2aXNpYmxlXHJcbiAgICBcclxuICAgIC8vMi4gRHJhdyBzb21ldGhpbmcgKClcclxuICAgIGN0eC5maWxsVGV4dCgnSGVsbG8nLDUwLDUwKTtcdC8vV3JpdGUgdGV4dCAuLi4gY3R4LmZpbGxUZXh0KCd0ZXh0Jyx4LHkpO1xyXG4gICAgY3R4LmZpbGxSZWN0KDUwLDUwLDEwMCwxMDApO1x0XHQvL0RyYXcgcmVjdGFuZ2xlIC4uLiBjdHguZmlsbFJlY3Qoc3RhcnRYLHN0YXJ0WSx3aWR0aCxoZWlnaHQpO1xyXG4gICAgY3R4LmNsZWFyUmVjdCg3NSw3NSwxMDAsMTAwKTtcdFx0Ly9DbGVhciBDYW52YXMgLi4uIGN0eC5maWxsUmVjdChzdGFydFgsc3RhcnRZLHdpZHRoLGhlaWdodCk7XHJcbiAgICBcclxuICAgIHggKz0gc3BkWDsgXHRzYW1lIHRoYW5cdHggPSB4ICtzcGRYXHJcbiAgICBcclxuICAgIERlYnVnZ2VyOlxyXG4gICAgRjEyXHJcbiAgICBCcmVha3BvaW50ID0gQ29kZSBzdG9wcyB3aGVuIHJlYWNoZXMgdGhpcyBsaW5lIGlmIGNvbnNvbGUgaXMgb3BlbmVkXHJcbiAgICBDb25zb2xlID0gR2V0IHRoZSB2YWx1ZSBvZiB2YXJpYWJsZSArIE1lc3NhZ2Ugd2l0aCBjb25zb2xlLmxvZygndGV4dCcpO1xyXG4gICAgXHJcbiAgICBFbmQgb2YgQ29tbWVudCBTZWN0aW9uICovXHJcbiAgICBcclxuICAgIFxyXG4vLyA8L3NjcmlwdD4iXX0=
