(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

console.log("linked");

// <script>
var ctx = document.getElementById("ctx").getContext("2d");
ctx.font = '30px Arial';
var height = 500;
var width = 500;

//returns time in milliseconds
var timeWhenGameStarted = Date.now();
// var message = 'Bouncing';

var player = {
    x: 50,
    spdX: 30,
    y: 40,
    spdY: 5,
    name: "P",
    hp: 10,
    width: 20,
    height: 20,
    color: "green"
};
//enemyList stores all the enemies in an object
var enemyList = {};

//Distance Formula and Pythagorean Theorem
var getDistanceBetweenEntities = function getDistanceBetweenEntities(entity1, entity2) {
    //return distance(number)
    var vx = entity1.x - entity2.x;
    var vy = entity1.y - entity2.y;
    return Math.sqrt(vx * vx + vy * vy);
};

var testCollision = function testCollision(entity1, entity2) {
    //return if colliding (true/false)
    var rect1 = {
        x: entity1.x - entity1.width / 2,
        y: entity1.y - entity1.height / 2,
        width: entity1.width,
        height: entity1.height
    };
    var rect2 = {
        x: entity2.x - entity2.width / 2,
        y: entity2.y - entity2.height / 2,
        width: entity2.width,
        height: entity2.height
    };

    return testCollisionRectRect(rect1, rect2);
};

//function that creates a new enemy and adds to enemyList
var enemy = function enemy(id, x, y, spdX, spdY, width, height) {
    var enemy1 = {
        x: x,
        spdX: spdX,
        y: y,
        spdY: spdY,
        name: "E",
        id: id,
        width: width,
        height: height,
        color: "red"
    };
    //create the item in enemyList
    enemyList[id] = enemy1;
};

//moves player (x and y) with mouse
document.onmousemove = function (mouse) {
    var mouseX = mouse.clientX;
    var mouseY = mouse.clientY;

    player.x = mouseX;
    player.y = mouseY;
};

var updateEntity = function updateEntity(entity) {
    updateEntityPosition(entity);
    drawEntity(entity);
};

var updateEntityPosition = function updateEntityPosition(entity) {
    //entity movement
    entity.x += entity.spdX;
    entity.y += entity.spdY;
    // console.log(`${entity} moving`, x);
    //collision detection to change the direction of entity when it hits the boundaries
    if (entity.x < 0 || entity.x > width) {
        // console.log('Out of Bounds');
        entity.spdX = -entity.spdX;
    }
    if (entity.y < 0 || entity.y > height) {
        entity.spdY = -entity.spdY;
    }
};

var testCollisionRectRect = function testCollisionRectRect(rect1, rect2) {
    return rect1.x <= rect2.x + rect2.width && rect2.x <= rect1.x + rect1.width && rect1.y <= rect2.y + rect2.height && rect2.y <= rect1.y + rect1.height;
};

//draws entities as rectangles
var drawEntity = function drawEntity(entity) {
    ctx.save(); //saves the styles
    ctx.fillStyle = entity.color;
    ctx.fillRect(entity.x - entity.width / 2, entity.y - entity.height / 2, entity.width, entity.height);
    ctx.restore();
};

var update = function update() {
    // clears rectangle in canvas so the fillText doesn't just repeat
    ctx.clearRect(0, 0, width, height);

    //loop through enemyList to update enemies
    for (var key in enemyList) {
        updateEntity(enemyList[key]);

        var collision = testCollision(player, enemyList[key]);
        if (collision) {
            console.log("collision!");
            player.hp -= 1;
            if (player.hp <= 0) {
                var timeSurvived = Date.now() - timeWhenGameStarted;
                console.log("You lost! You survived for " + timeSurvived + " ms.");
                timeWhenGameStarted = Date.now();
                player.hp = 10;
            }
        }
    }

    drawEntity(player);
    ctx.fillText(player.hp + "HP", 0, 30);
};

enemy("E1", 150, 200, 7, 9, 30, 30);
enemy("E2", 300, 120, 5, -7, 20, 20);
enemy("E3", 425, 320, 10, 20, 40, 10);

setInterval(update, 40);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLFFBQVEsR0FBUixDQUFZLFFBQVo7O0FBRUE7QUFDQSxJQUFNLE1BQU0sU0FBUyxjQUFULENBQXdCLEtBQXhCLEVBQStCLFVBQS9CLENBQTBDLElBQTFDLENBQVo7QUFDQSxJQUFJLElBQUosR0FBVyxZQUFYO0FBQ0EsSUFBTSxTQUFTLEdBQWY7QUFDQSxJQUFNLFFBQVEsR0FBZDs7QUFFQTtBQUNBLElBQUksc0JBQXNCLEtBQUssR0FBTCxFQUExQjtBQUNBOztBQUVBLElBQU0sU0FBUztBQUNYLE9BQUksRUFETztBQUVYLFVBQU8sRUFGSTtBQUdYLE9BQUksRUFITztBQUlYLFVBQU8sQ0FKSTtBQUtYLFVBQU8sR0FMSTtBQU1YLFFBQUksRUFOTztBQU9YLFdBQU8sRUFQSTtBQVFYLFlBQVEsRUFSRztBQVNYLFdBQU07QUFUSyxDQUFmO0FBV0E7QUFDQSxJQUFJLFlBQVksRUFBaEI7O0FBR0E7QUFDQSxJQUFNLDZCQUE2QixTQUE3QiwwQkFBNkIsQ0FBUyxPQUFULEVBQWtCLE9BQWxCLEVBQTJCO0FBQzFEO0FBQ0EsUUFBSSxLQUFLLFFBQVEsQ0FBUixHQUFZLFFBQVEsQ0FBN0I7QUFDQSxRQUFJLEtBQUssUUFBUSxDQUFSLEdBQVksUUFBUSxDQUE3QjtBQUNBLFdBQU8sS0FBSyxJQUFMLENBQVUsS0FBRyxFQUFILEdBQVEsS0FBRyxFQUFyQixDQUFQO0FBQ0gsQ0FMRDs7QUFPQSxJQUFNLGdCQUFnQixTQUFoQixhQUFnQixDQUFTLE9BQVQsRUFBa0IsT0FBbEIsRUFBMkI7QUFDN0M7QUFDQSxRQUFNLFFBQVE7QUFDVixXQUFHLFFBQVEsQ0FBUixHQUFZLFFBQVEsS0FBUixHQUFjLENBRG5CO0FBRVYsV0FBRyxRQUFRLENBQVIsR0FBWSxRQUFRLE1BQVIsR0FBZSxDQUZwQjtBQUdWLGVB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VCxJQUFnQixTQUFoQixFQUEyQjtBQUN2QixxQkFBYSxVQUFVLEdBQVYsQ0FBYjs7QUFFQSxZQUFNLFlBQVksY0FBYyxNQUFkLEVBQXNCLFVBQVUsR0FBVixDQUF0QixDQUFsQjtBQUNBLFlBQUcsU0FBSCxFQUFjO0FBQ1Ysb0JBQVEsR0FBUixDQUFZLFlBQVo7QUFDQSxtQkFBTyxFQUFQLElBQWEsQ0FBYjtBQUNBLGdCQUFHLE9BQU8sRUFBUCxJQUFhLENBQWhCLEVBQW1CO0FBQ2Ysb0JBQUksZUFBZSxLQUFLLEdBQUwsS0FBYSxtQkFBaEM7QUFDQSx3QkFBUSxHQUFSLENBQVksZ0NBQStCLFlBQS9CLEdBQThDLE1BQTFEO0FBQ0Esc0NBQXNCLEtBQUssR0FBTCxFQUF0QjtBQUNBLHVCQUFPLEVBQVAsR0FBWSxFQUFaO0FBR0g7QUFFSjtBQUNKOztBQUVELGVBQVcsTUFBWDtBQUNBLFFBQUksUUFBSixDQUFhLE9BQU8sRUFBUCxHQUFZLElBQXpCLEVBQStCLENBQS9CLEVBQWtDLEVBQWxDO0FBR0gsQ0E3QkQ7O0FBZ0NBLE1BQU0sSUFBTixFQUFZLEdBQVosRUFBaUIsR0FBakIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsRUFBNUIsRUFBZ0MsRUFBaEM7QUFDQSxNQUFNLElBQU4sRUFBWSxHQUFaLEVBQWlCLEdBQWpCLEVBQXNCLENBQXRCLEVBQXlCLENBQUMsQ0FBMUIsRUFBNkIsRUFBN0IsRUFBaUMsRUFBakM7QUFDQSxNQUFNLElBQU4sRUFBWSxHQUFaLEVBQWlCLEdBQWpCLEVBQXNCLEVBQXRCLEVBQTBCLEVBQTFCLEVBQThCLEVBQTlCLEVBQWtDLEVBQWxDOztBQUVBLFlBQVksTUFBWixFQUFvQixFQUFwQjs7QUFPSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JKIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc29sZS5sb2coXCJsaW5rZWRcIik7XHJcblxyXG4vLyA8c2NyaXB0PlxyXG5jb25zdCBjdHggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN0eFwiKS5nZXRDb250ZXh0KFwiMmRcIik7XHJcbmN0eC5mb250ID0gJzMwcHggQXJpYWwnO1xyXG5jb25zdCBoZWlnaHQgPSA1MDA7XHJcbmNvbnN0IHdpZHRoID0gNTAwO1xyXG5cclxuLy9yZXR1cm5zIHRpbWUgaW4gbWlsbGlzZWNvbmRzXHJcbmxldCB0aW1lV2hlbkdhbWVTdGFydGVkID0gRGF0ZS5ub3coKTtcclxuLy8gdmFyIG1lc3NhZ2UgPSAnQm91bmNpbmcnO1xyXG5cclxuY29uc3QgcGxheWVyID0ge1xyXG4gICAgeCA6IDUwLFxyXG4gICAgc3BkWCA6IDMwLFxyXG4gICAgeSA6IDQwLFxyXG4gICAgc3BkWSA6IDUsXHJcbiAgICBuYW1lIDogXCJQXCIsXHJcbiAgICBocDogMTAsXHJcbiAgICB3aWR0aDogMjAsXHJcbiAgICBoZWlnaHQ6IDIwLFxyXG4gICAgY29sb3I6XCJncmVlblwiXHJcbn07XHJcbi8vZW5lbXlMaXN0IHN0b3JlcyBhbGwgdGhlIGVuZW1pZXMgaW4gYW4gb2JqZWN0XHJcbmxldCBlbmVteUxpc3QgPSB7fTtcclxuXHJcblxyXG4vL0Rpc3RhbmNlIEZvcm11bGEgYW5kIFB5dGhhZ29yZWFuIFRoZW9yZW1cclxuY29uc3QgZ2V0RGlzdGFuY2VCZXR3ZWVuRW50aXRpZXMgPSBmdW5jdGlvbihlbnRpdHkxLCBlbnRpdHkyKSB7XHJcbiAgICAvL3JldHVybiBkaXN0YW5jZShudW1iZXIpXHJcbiAgICBsZXQgdnggPSBlbnRpdHkxLnggLSBlbnRpdHkyLng7XHJcbiAgICBsZXQgdnkgPSBlbnRpdHkxLnkgLSBlbnRpdHkyLnk7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHZ4KnZ4ICsgdnkqdnkpO1xyXG59XHJcblxyXG5jb25zdCB0ZXN0Q29sbGlzaW9uID0gZnVuY3Rpb24oZW50aXR5MSwgZW50aXR5Mikge1xyXG4gICAgLy9yZXR1cm4gaWYgY29sbGlkaW5nICh0cnVlL2ZhbHNlKVxyXG4gICAgY29uc3QgcmVjdDEgPSB7XHJcbiAgICAgICAgeDogZW50aXR5MS54IC0gZW50aXR5MS53aWR0aC8yLFxyXG4gICAgICAgIHk6IGVudGl0eTEueSAtIGVudGl0eTEuaGVpZ2h0LzIsXHJcbiAgICAgICAgd2lkdGg6IGVudGl0eTEud2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0OiBlbnRpdHkxLmhlaWdodFxyXG4gICAgfVxyXG4gICAgY29uc3QgcmVjdDIgPSB7XHJcbiAgICAgICAgeDogZW50aXR5Mi54IC0gZW50aXR5Mi53aWR0aC8yLFxyXG4gICAgICAgIHk6IGVudGl0eTIueSAtIGVudGl0eTIuaGVpZ2h0LzIsXHJcbiAgICAgICAgd2lkdGg6IGVudGl0eTIud2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0OiBlbnRpdHkyLmhlaWdodFxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0ZXN0Q29sbGlzaW9uUmVjdFJlY3QocmVjdDEsIHJlY3QyKTtcclxuXHJcbn1cclxuXHJcblxyXG4vL2Z1bmN0aW9uIHRoYXQgY3JlYXRlcyBhIG5ldyBlbmVteSBhbmQgYWRkcyB0byBlbmVteUxpc3RcclxuY29uc3QgZW5lbXkgPSBmdW5jdGlvbihpZCwgeCwgeSwgc3BkWCwgc3BkWSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgbGV0IGVuZW15MSA9IHtcclxuICAgICAgICB4OngsXHJcbiAgICAgICAgc3BkWDogc3BkWCxcclxuICAgICAgICB5OnksXHJcbiAgICAgICAgc3BkWTpzcGRZLFxyXG4gICAgICAgIG5hbWU6IFwiRVwiLFxyXG4gICAgICAgIGlkOmlkLFxyXG4gICAgICAgIHdpZHRoOiB3aWR0aCxcclxuICAgICAgICBoZWlnaHQ6IGhlaWdodCxcclxuICAgICAgICBjb2xvcjogXCJyZWRcIlxyXG4gICAgfTtcclxuICAgIC8vY3JlYXRlIHRoZSBpdGVtIGluIGVuZW15TGlzdFxyXG4gICAgZW5lbXlMaXN0W2lkXSA9IGVuZW15MTtcclxufVxyXG5cclxuLy9tb3ZlcyBwbGF5ZXIgKHggYW5kIHkpIHdpdGggbW91c2VcclxuZG9jdW1lbnQub25tb3VzZW1vdmUgPSBmdW5jdGlvbihtb3VzZSkge1xyXG4gICAgbGV0IG1vdXNlWCA9IG1vdXNlLmNsaWVudFg7XHJcbiAgICBsZXQgbW91c2VZID0gbW91c2UuY2xpZW50WTtcclxuXHJcbiAgICBwbGF5ZXIueCA9IG1vdXNlWDtcclxuICAgIHBsYXllci55ID0gbW91c2VZO1xyXG59XHJcblxyXG5cclxuY29uc3QgdXBkYXRlRW50aXR5ID0gZnVuY3Rpb24oZW50aXR5KSB7XHJcbiAgICB1cGRhdGVFbnRpdHlQb3NpdGlvbihlbnRpdHkpO1xyXG4gICAgZHJhd0VudGl0eShlbnRpdHkpO1xyXG59XHJcblxyXG5cclxuY29uc3QgdXBkYXRlRW50aXR5UG9zaXRpb24gPSBmdW5jdGlvbihlbnRpdHkpIHtcclxuLy9lbnRpdHkgbW92ZW1lbnRcclxuICAgIGVudGl0eS54ICs9IGVudGl0eS5zcGRYO1xyXG4gICAgZW50aXR5LnkgKz0gZW50aXR5LnNwZFk7XHJcbi8vIGNvbnNvbGUubG9nKGAke2VudGl0eX0gbW92aW5nYCwgeCk7XHJcbi8vY29sbGlzaW9uIGRldGVjdGlvbiB0byBjaGFuZ2UgdGhlIGRpcmVjdGlvbiBvZiBlbnRpdHkgd2hlbiBpdCBoaXRzIHRoZSBib3VuZGFyaWVzXHJcbiAgICBpZihlbnRpdHkueCA8IDAgfHwgZW50aXR5LnggPiB3aWR0aCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdPdXQgb2YgQm91bmRzJyk7XHJcbiAgICAgICAgZW50aXR5LnNwZFggPSAtZW50aXR5LnNwZFg7XHJcbiAgICB9XHJcbiAgICBpZihlbnRpdHkueSA8IDAgfHwgZW50aXR5LnkgPiBoZWlnaHQpIHtcclxuICAgICAgICBlbnRpdHkuc3BkWSA9IC1lbnRpdHkuc3BkWTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgdGVzdENvbGxpc2lvblJlY3RSZWN0ID0gZnVuY3Rpb24ocmVjdDEsIHJlY3QyKSB7XHJcbiAgICByZXR1cm4gcmVjdDEueCA8PSByZWN0Mi54ICsgcmVjdDIud2lkdGhcclxuICAgICAgICAmJiByZWN0Mi54IDw9IHJlY3QxLnggKyByZWN0MS53aWR0aFxyXG4gICAgICAgICYmIHJlY3QxLnkgPD0gcmVjdDIueSArIHJlY3QyLmhlaWdodFxyXG4gICAgICAgICYmIHJlY3QyLnkgPD0gcmVjdDEueSArIHJlY3QxLmhlaWdodDtcclxufSBcclxuXHJcbi8vZHJhd3MgZW50aXRpZXMgYXMgcmVjdGFuZ2xlc1xyXG5jb25zdCBkcmF3RW50aXR5ID0gZnVuY3Rpb24oZW50aXR5KSB7XHJcbiAgICBjdHguc2F2ZSgpOy8vc2F2ZXMgdGhlIHN0eWxlc1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9IGVudGl0eS5jb2xvcjtcclxuICAgIGN0eC5maWxsUmVjdChlbnRpdHkueCAtIGVudGl0eS53aWR0aC8yLCBlbnRpdHkueSAtIGVudGl0eS5oZWlnaHQvMiwgZW50aXR5LndpZHRoLCBlbnRpdHkuaGVpZ2h0KTtcclxuICAgIGN0eC5yZXN0b3JlKCk7XHJcbn1cclxuXHJcbmNvbnN0IHVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xyXG4vLyBjbGVhcnMgcmVjdGFuZ2xlIGluIGNhbnZhcyBzbyB0aGUgZmlsbFRleHQgZG9lc24ndCBqdXN0IHJlcGVhdFxyXG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuXHJcblxyXG4gICAgLy9sb29wIHRocm91Z2ggZW5lbXlMaXN0IHRvIHVwZGF0ZSBlbmVtaWVzXHJcbiAgICBmb3IgKGxldCBrZXkgaW4gZW5lbXlMaXN0KSB7XHJcbiAgICAgICAgdXBkYXRlRW50aXR5KGVuZW15TGlzdFtrZXldKTtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBjb2xsaXNpb24gPSB0ZXN0Q29sbGlzaW9uKHBsYXllciwgZW5lbXlMaXN0W2tleV0pO1xyXG4gICAgICAgIGlmKGNvbGxpc2lvbikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvbGxpc2lvbiFcIik7XHJcbiAgICAgICAgICAgIHBsYXllci5ocCAtPSAxO1xyXG4gICAgICAgICAgICBpZihwbGF5ZXIuaHAgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRpbWVTdXJ2aXZlZCA9IERhdGUubm93KCkgLSB0aW1lV2hlbkdhbWVTdGFydGVkO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJZb3UgbG9zdCEgWW91IHN1cnZpdmVkIGZvciBcIisgdGltZVN1cnZpdmVkICsgXCIgbXMuXCIpO1xyXG4gICAgICAgICAgICAgICAgdGltZVdoZW5HYW1lU3RhcnRlZCA9IERhdGUubm93KCk7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuaHAgPSAxMDtcclxuICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd0VudGl0eShwbGF5ZXIpO1xyXG4gICAgY3R4LmZpbGxUZXh0KHBsYXllci5ocCArIFwiSFBcIiwgMCwgMzApO1xyXG5cclxuXHJcbn1cclxuXHJcblxyXG5lbmVteShcIkUxXCIsIDE1MCwgMjAwLCA3LCA5LCAzMCwgMzApO1xyXG5lbmVteShcIkUyXCIsIDMwMCwgMTIwLCA1LCAtNywgMjAsIDIwKTtcclxuZW5lbXkoXCJFM1wiLCA0MjUsIDMyMCwgMTAsIDIwLCA0MCwgMTApO1xyXG5cclxuc2V0SW50ZXJ2YWwodXBkYXRlLCA0MCk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAvKlx0Q29tbWVudCBTZWN0aW9uXHJcbiAgICBcclxuICAgIC8vMS4gTW9kaWZ5IFNldHRpbmdzID1cclxuICAgIGN0eC5mb250ID0gJzMwcHggQXJpYWwnO1x0Ly9Gb250IHVzZWRcclxuICAgIGN0eC5maWxsU3R5bGUgPSAncmVkJztcdFx0Ly9Db2xvciBvZiB0aGUgdGV4dCBhbmQgZm9ybXNcclxuICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuNTtcdFx0Ly9UcmFuc3BhcmVuY3kgMCA9IGludmlzYmxlLCAxID0gdmlzaWJsZVxyXG4gICAgXHJcbiAgICAvLzIuIERyYXcgc29tZXRoaW5nICgpXHJcbiAgICBjdHguZmlsbFRleHQoJ0hlbGxvJyw1MCw1MCk7XHQvL1dyaXRlIHRleHQgLi4uIGN0eC5maWxsVGV4dCgndGV4dCcseCx5KTtcclxuICAgIGN0eC5maWxsUmVjdCg1MCw1MCwxMDAsMTAwKTtcdFx0Ly9EcmF3IHJlY3RhbmdsZSAuLi4gY3R4LmZpbGxSZWN0KHN0YXJ0WCxzdGFydFksd2lkdGgsaGVpZ2h0KTtcclxuICAgIGN0eC5jbGVhclJlY3QoNzUsNzUsMTAwLDEwMCk7XHRcdC8vQ2xlYXIgQ2FudmFzIC4uLiBjdHguZmlsbFJlY3Qoc3RhcnRYLHN0YXJ0WSx3aWR0aCxoZWlnaHQpO1xyXG4gICAgXHJcbiAgICB4ICs9IHNwZFg7IFx0c2FtZSB0aGFuXHR4ID0geCArc3BkWFxyXG4gICAgXHJcbiAgICBEZWJ1Z2dlcjpcclxuICAgIEYxMlxyXG4gICAgQnJlYWtwb2ludCA9IENvZGUgc3RvcHMgd2hlbiByZWFjaGVzIHRoaXMgbGluZSBpZiBjb25zb2xlIGlzIG9wZW5lZFxyXG4gICAgQ29uc29sZSA9IEdldCB0aGUgdmFsdWUgb2YgdmFyaWFibGUgKyBNZXNzYWdlIHdpdGggY29uc29sZS5sb2coJ3RleHQnKTtcclxuICAgIFxyXG4gICAgRW5kIG9mIENvbW1lbnQgU2VjdGlvbiAqL1xyXG4gICAgXHJcbiAgICBcclxuLy8gPC9zY3JpcHQ+Il19
