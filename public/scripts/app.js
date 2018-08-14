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

//every time game is updated, framecount is updated by 1
var frameCount = 0;

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

//moves player (x and y) with mouse and makes sure it can't move out of bounds
document.onmousemove = function (mouse) {
    var mouseX = mouse.clientX - document.getElementById("ctx").getBoundingClientRect().left;
    var mouseY = mouse.clientY - document.getElementById("ctx").getBoundingClientRect().top;

    if (mouseX < player.width / 2) mouseX = player.width / 2;
    if (mouseX > width - player.width / 2) mouseX = width - player.width / 2;
    if (mouseY < player.height / 2) mouseY = player.height / 2;
    if (mouseY > height - player.height / 2) mouseY = height - player.height / 2;

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
    frameCount++;

    if (frameCount % 100 === 0) //updates every 4sec
        randomlyGenerateEnemy();

    //loop through enemyList to update enemies
    for (var key in enemyList) {
        updateEntity(enemyList[key]);

        var collision = testCollision(player, enemyList[key]);
        if (collision) {
            console.log("collision!");
            player.hp -= 1;
        }
    }

    if (player.hp <= 0) {
        var timeSurvived = Date.now() - timeWhenGameStarted;
        console.log("You lost! You survived for " + timeSurvived + " ms.");
        timeWhenGameStarted = Date.now();
        startNewGame();
    }

    drawEntity(player);
    ctx.fillText(player.hp + "HP", 0, 30);
};

var startNewGame = function startNewGame() {
    player.hp = 10;
    timeWhenGameStarted = Date.now();
    frameCount = 0;
    enemyList = {};
    randomlyGenerateEnemy();
    randomlyGenerateEnemy();
    randomlyGenerateEnemy();
};

var randomlyGenerateEnemy = function randomlyGenerateEnemy() {
    var x = Math.random() * width;
    var y = Math.random() * height;
    var spdX = 5 + Math.random() * 5;
    var spdY = 5 + Math.random() * 5;
    var enemyHeight = 10 + Math.random() * 30;
    var enemyWidth = 10 + Math.random() * 30;
    var id = Math.random();
    enemy(id, x, y, spdX, spdY, enemyWidth, enemyHeight);
};

startNewGame();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLFFBQVEsR0FBUixDQUFZLFFBQVo7O0FBRUE7QUFDQSxJQUFNLE1BQU0sU0FBUyxjQUFULENBQXdCLEtBQXhCLEVBQStCLFVBQS9CLENBQTBDLElBQTFDLENBQVo7QUFDQSxJQUFJLElBQUosR0FBVyxZQUFYO0FBQ0EsSUFBTSxTQUFTLEdBQWY7QUFDQSxJQUFNLFFBQVEsR0FBZDs7QUFFQTtBQUNBLElBQUksc0JBQXNCLEtBQUssR0FBTCxFQUExQjs7QUFFQTtBQUNBLElBQUksYUFBYSxDQUFqQjs7QUFFQSxJQUFNLFNBQVM7QUFDWCxPQUFJLEVBRE87QUFFWCxVQUFPLEVBRkk7QUFHWCxPQUFJLEVBSE87QUFJWCxVQUFPLENBSkk7QUFLWCxVQUFPLEdBTEk7QUFNWCxRQUFJLEVBTk87QUFPWCxXQUFPLEVBUEk7QUFRWCxZQUFRLEVBUkc7QUFTWCxXQUFNO0FBVEssQ0FBZjtBQVdBO0FBQ0EsSUFBSSxZQUFZLEVBQWhCOztBQUdBO0FBQ0EsSUFBTSw2QkFBNkIsU0FBN0IsMEJBQTZCLENBQVMsT0FBVCxFQUFrQixPQUFsQixFQUEyQjtBQUMxRDtBQUNBLFFBQUksS0FBSyxRQUFRLENBQVIsR0FBWSxRQUFRLENBQTdCO0FBQ0EsUUFBSSxLQUFLLFFBQVEsQ0FBUixHQUFZLFFBQVEsQ0FBN0I7QUFDQSxXQUFPLEtBQUssSUFBTCxDQUFVLEtBQUcsRUFBSCxHQUFRLEtBQUcsRUFBckIsQ0FBUDtBQUNILENBTEQ7O0FBT0EsSUFBTSxnQkFBZ0IsU0FBaEIsYUFBZ0IsQ0FBUyxPQUFULEVBQWtCLE9BQWxCLEVBQTJCO0FBQzdDO0FBQ0EsUUFBTSxRQUFRO0FBQ1YsV0FBRyxRQUFRLENBQVIsR0FBWSxRQUFRLEtBQVIsR0FBYyxDQURuQjtBQUVWLFdBQUcsUUFBUSxDQUFSLEdBQVksUUFBUSxNQUFSLEdBQWUsQ0FGcEI7QUFHVixlQUFPLFFBQVEsS0FITDtBQUlWLGdCQUFRLFFBQVE7QUFKTixLQUFkO0FBTUEsUUFBTSxRQUFRO0FBQ1YsV0FBRyxRQUFRLENBQVIsR0FBWSxRQUFRLEtBQVIsR0FBYyxDQURuQjtBQUVWLFdBQUcsUUFBUSxDQUFSLEdBQVksUUFBUSxNQUFSLEdBQWUsQ0FGcEI7QUFHVixlQUFPLFFBQVEsS0FITDtBQUlWLGdCQUFRLFFBQVE7QUFKTixLQUFkOztBQU9BLFdBQU8sc0JBQXNCLEtBQXRCLEVBQTZCLEtBQTdCLENBQVA7QUFFSCxDQWpCRDs7QUFvQkE7QUFDQSxJQUFNLFFBQVEsU0FBUixLQUFRLENBQVMsRUFBVCxFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsSUFBbkIsRUFBeUIsSUFBekIsRUFBK0IsS0FBL0IsRUFBc0MsTUFBdEMsRUFBOEM7QUFDeEQsUUFBSSxTQUFTO0FBQ1QsV0FBRSxDQURPO0FBRVQsY0FBTSxJQUZHO0FBR1QsV0FBRSxDQUhPO0FBSVQsY0FBSyxJQUpJO0FBS1QsY0FBTSxHQUxHO0FBTVQsWUFBRyxFQU5NO0FBT1QsZUFBTyxLQVBFO0FBUVQsZ0JBQVEsTUFSQztBQVNULGVBQU87QUFURSxLQUFiO0FBV0E7QUFDQSxjQUFVLEVBQVYsSUFBZ0IsTUFBaEI7QUFDSCxDQWREOztBQWdCQTtBQUNBLFNBQVMsV0FBVCxHQUF1QixVQUFTLEtBQVQsRUFBZ0I7QUFDbkMsUUFBSSxTQUFTLE1BQU0sT0FBTixHQUFnQixTQUFTLGNBQVQsQ0FBd0IsS0FBeEIsRUFBK0IscUJBQS9CLEdBQXVELElBQXBGO0FBQ0EsUUFBSSxTQUFTLE1BQU0sT0FBTixHQUFnQixTQUFTLGNBQVQsQ0FBd0IsS0FBeEIsRUFBK0IscUJBQS9CLEdBQXVELEdBQXBGOztBQUVBLFFBQUksU0FBUyxPQUFPLEtBQVAsR0FBYSxDQUExQixFQUNJLFNBQVMsT0FBTyxLQUFQLEdBQWEsQ0FBdEI7QUFDSixRQUFJLFNBQVMsUUFBUSxPQUFPLEtBQVAsR0FBYSxDQUFsQyxFQUNJLFNBQVMsUUFBUSxPQUFPLEtBQVAsR0FBYSxDQUE5QjtBQUNKLFFBQUksU0FBUyxPQUFPLE1BQVAsR0FBYyxDQUEzQixFQUNJLFNBQVMsT0FBTyxNQUFQLEdBQWMsQ0FBdkI7QUFDSixRQUFJLFNBQVMsU0FBUyxPQUFPLE1BQVAsR0FBYyxDQUFwQyxFQUNJLFNBQVMsU0FBUyxPQUFPLE1BQVAsR0FBYyxDQUFoQzs7QUFFSixXQUFPLENBQVAsR0FBVyxNQUFYO0FBQ0EsV0FBTyxDQUFQLEdBQVcsTUFBWDtBQUNILENBZkQ7O0FBa0JBLElBQU0sZUFBZSxTQUFmLFlBQWUsQ0FBUyxNQUFULEVBQWlCO0FBQ2xDLHlCQUFxQixNQUFyQjtBQUNBLGVBQVcsTUFBWDtBQUNILENBSEQ7O0FBTUEsSUFBTSx1QkFBdUIsU0FBdkIsb0JBQXVCLENBQVMsTUFBVCxFQUFpQjtBQUM5QztBQUNJLFdBQU8sQ0FBUCxJQUFZLE9BQU8sSUFBbkI7QUFDQSxXQUFPLENBQVAsSUFBWSxPQUFPLElBQW5CO0FBQ0o7QUFDQTtBQUNJLFFBQUcsT0FBTyxDQUFQLEdBQVcsQ0FBWCxJQUFnQixPQUFPLENBQVAsR0FBVyxLQUE5QixFQUFxQztBQUNqQztBQUNBLGVBQU8sSUFBUCxHQUFjLENBQUMsT0FBTyxJQUF0QjtBQUNIO0FBQ0QsUUFBRyxPQUFPLENBQVAsR0FBVyxDQUFYLElBQWdCLE9BQU8sQ0FBUCxHQUFXLE1BQTlCLEVBQXNDO0FBQ2xDLGVBQU8sSUFBUCxHQUFjLENBQUMsT0FBTyxJQUF0QjtBQUNIO0FBQ0osQ0FiRDs7QUFlQSxJQUFNLHdCQUF3QixTQUF4QixxQkFBd0IsQ0FBUyxLQUFULEVBQWdCLEtBQWhCLEVBQXVCO0FBQ2pELFdBQU8sTUFBTSxDQUFOLElBQVcsTUFBTSxDQUFOLEdBQVUsTUFBTSxLQUEzQixJQUNBLE1BQU0sQ0FBTixJQUFXLE1BQU0sQ0FBTixHQUFVLE1BQU0sS0FEM0IsSUFFQSxNQUFNLENBQU4sSUFBVyxNQUFNLENBQU4sR0FBVSxNQUFNLE1BRjNCLElBR0EsTUFBTSxDQUFOLElBQVcsTUFBTSxDQUFOLEdBQVUsTUFBTSxNQUhsQztBQUlILENBTEQ7O0FBT0E7QUFDQSxJQUFNLGFBQWEsU0FBYixVQUFhLENBQVMsTUFBVCxFQUFpQjtBQUNoQyxRQUFJLElBQUosR0FEZ0MsQ0FDckI7QUFDWCxRQUFJLFNBQUosR0FBZ0IsT0FBTyxLQUF2QjtBQUNBLFFBQUksUUFBSixDQUFhLE9BQU8sQ0FBUCxHQUFXLE9BQU8sS0FBUCxHQUFhLENBQXJDLEVBQXdDLE9BQU8sQ0FBUCxHQUFXLE9BQU8sTUFBUCxHQUFjLENBQWpFLEVBQW9FLE9BQU8sS0FBM0UsRUFBa0YsT0FBTyxNQUF6RjtBQUNBLFFBQUksT0FBSjtBQUNILENBTEQ7O0FBT0EsSUFBTSxTQUFTLFNBQVQsTUFBUyxHQUFXO0FBQzFCO0FBQ0ksUUFBSSxTQUFKLENBQWMsQ0FBZCxFQUFpQixDQUFqQixFQUFvQixLQUFwQixFQUEyQixNQUEzQjtBQUNBOztBQUVBLFFBQUcsYUFBYSxHQUFiLEtBQXFCLENBQXhCLEVBQTJCO0FBQ3ZCOztBQUdKO0FBQ0EsU0FBSyxJQUFJLEdBQVQsSUFBZ0IsU0FBaEIsRUFBMkI7QUFDdkIscUJBQWEsVUFBVSxHQUFWLENBQWI7O0FBRUEsWUFBTSxZQUFZLGNBQWMsTUFBZCxFQUFzQixVQUFVLEdBQVYsQ0FBdEIsQ0FBbEI7QUFDQSxZQUFHLFNBQUgsRUFBYztBQUNWLG9CQUFRLEdBQVIsQ0FBWSxZQUFaO0FBQ0EsbUJBQU8sRUFBUCxJQUFhLENBQWI7QUFDSDtBQUNKOztBQUVELFFBQUcsT0FBTyxFQUFQLElBQWEsQ0FBaEIsRUFBbUI7QUFDZixZQUFJLGVBQWUsS0FBSyxHQUFMLEtBQWEsbUJBQWhDO0FBQ0EsZ0JBQVEsR0FBUixDQUFZLGdDQUErQixZQUEvQixHQUE4QyxNQUExRDtBQUNBLDhCQUFzQixLQUFLLEdBQUwsRUFBdEI7QUFDQTtBQUNIOztBQUVELGVBQVcsTUFBWDtBQUNBLFFBQUksUUFBSixDQUFhLE9BQU8sRUFBUCxHQUFZLElBQXpCLEVBQStCLENBQS9CLEVBQWtDLEVBQWxDO0FBRUgsQ0E5QkQ7O0FBZ0NBLElBQU0sZUFBZSxTQUFmLFlBQWUsR0FBWTtBQUM3QixXQUFPLEVBQVAsR0FBWSxFQUFaO0FBQ0EsMEJBQXNCLEtBQUssR0FBTCxFQUF0QjtBQUNBLGlCQUFhLENBQWI7QUFDQSxnQkFBWSxFQUFaO0FBQ0E7QUFDQTtBQUNBO0FBQ0gsQ0FSRDs7QUFVQSxJQUFNLHdCQUF3QixTQUF4QixxQkFBd0IsR0FBVztBQUNyQyxRQUFJLElBQUksS0FBSyxNQUFMLEtBQWMsS0FBdEI7QUFDQSxRQUFJLElBQUksS0FBSyxNQUFMLEtBQWMsTUFBdEI7QUFDQSxRQUFJLE9BQU8sSUFBSSxLQUFLLE1BQUwsS0FBYyxDQUE3QjtBQUNBLFFBQUksT0FBTyxJQUFJLEtBQUssTUFBTCxLQUFjLENBQTdCO0FBQ0EsUUFBSSxjQUFjLEtBQUssS0FBSyxNQUFMLEtBQWMsRUFBckM7QUFDQSxRQUFJLGFBQWEsS0FBSyxLQUFLLE1BQUwsS0FBYyxFQUFwQztBQUNBLFFBQUksS0FBSyxLQUFLLE1BQUwsRUFBVDtBQUNBLFVBQU0sRUFBTixFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLElBQWhCLEVBQXNCLElBQXRCLEVBQTRCLFVBQTVCLEVBQXdDLFdBQXhDO0FBQ0gsQ0FURDs7QUFXQTs7QUFFQSxZQUFZLE1BQVosRUFBb0IsRUFBcEI7O0FBT0k7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCSiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnNvbGUubG9nKFwibGlua2VkXCIpO1xyXG5cclxuLy8gPHNjcmlwdD5cclxuY29uc3QgY3R4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjdHhcIikuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5jdHguZm9udCA9ICczMHB4IEFyaWFsJztcclxuY29uc3QgaGVpZ2h0ID0gNTAwO1xyXG5jb25zdCB3aWR0aCA9IDUwMDtcclxuXHJcbi8vcmV0dXJucyB0aW1lIGluIG1pbGxpc2Vjb25kc1xyXG5sZXQgdGltZVdoZW5HYW1lU3RhcnRlZCA9IERhdGUubm93KCk7XHJcblxyXG4vL2V2ZXJ5IHRpbWUgZ2FtZSBpcyB1cGRhdGVkLCBmcmFtZWNvdW50IGlzIHVwZGF0ZWQgYnkgMVxyXG5sZXQgZnJhbWVDb3VudCA9IDA7XHJcblxyXG5jb25zdCBwbGF5ZXIgPSB7XHJcbiAgICB4IDogNTAsXHJcbiAgICBzcGRYIDogMzAsXHJcbiAgICB5IDogNDAsXHJcbiAgICBzcGRZIDogNSxcclxuICAgIG5hbWUgOiBcIlBcIixcclxuICAgIGhwOiAxMCxcclxuICAgIHdpZHRoOiAyMCxcclxuICAgIGhlaWdodDogMjAsXHJcbiAgICBjb2xvcjpcImdyZWVuXCJcclxufTtcclxuLy9lbmVteUxpc3Qgc3RvcmVzIGFsbCB0aGUgZW5lbWllcyBpbiBhbiBvYmplY3RcclxubGV0IGVuZW15TGlzdCA9IHt9O1xyXG5cclxuXHJcbi8vRGlzdGFuY2UgRm9ybXVsYSBhbmQgUHl0aGFnb3JlYW4gVGhlb3JlbVxyXG5jb25zdCBnZXREaXN0YW5jZUJldHdlZW5FbnRpdGllcyA9IGZ1bmN0aW9uKGVudGl0eTEsIGVudGl0eTIpIHtcclxuICAgIC8vcmV0dXJuIGRpc3RhbmNlKG51bWJlcilcclxuICAgIGxldCB2eCA9IGVudGl0eTEueCAtIGVudGl0eTIueDtcclxuICAgIGxldCB2eSA9IGVudGl0eTEueSAtIGVudGl0eTIueTtcclxuICAgIHJldHVybiBNYXRoLnNxcnQodngqdnggKyB2eSp2eSk7XHJcbn1cclxuXHJcbmNvbnN0IHRlc3RDb2xsaXNpb24gPSBmdW5jdGlvbihlbnRpdHkxLCBlbnRpdHkyKSB7XHJcbiAgICAvL3JldHVybiBpZiBjb2xsaWRpbmcgKHRydWUvZmFsc2UpXHJcbiAgICBjb25zdCByZWN0MSA9IHtcclxuICAgICAgICB4OiBlbnRpdHkxLnggLSBlbnRpdHkxLndpZHRoLzIsXHJcbiAgICAgICAgeTogZW50aXR5MS55IC0gZW50aXR5MS5oZWlnaHQvMixcclxuICAgICAgICB3aWR0aDogZW50aXR5MS53aWR0aCxcclxuICAgICAgICBoZWlnaHQ6IGVudGl0eTEuaGVpZ2h0XHJcbiAgICB9XHJcbiAgICBjb25zdCByZWN0MiA9IHtcclxuICAgICAgICB4OiBlbnRpdHkyLnggLSBlbnRpdHkyLndpZHRoLzIsXHJcbiAgICAgICAgeTogZW50aXR5Mi55IC0gZW50aXR5Mi5oZWlnaHQvMixcclxuICAgICAgICB3aWR0aDogZW50aXR5Mi53aWR0aCxcclxuICAgICAgICBoZWlnaHQ6IGVudGl0eTIuaGVpZ2h0XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRlc3RDb2xsaXNpb25SZWN0UmVjdChyZWN0MSwgcmVjdDIpO1xyXG5cclxufVxyXG5cclxuXHJcbi8vZnVuY3Rpb24gdGhhdCBjcmVhdGVzIGEgbmV3IGVuZW15IGFuZCBhZGRzIHRvIGVuZW15TGlzdFxyXG5jb25zdCBlbmVteSA9IGZ1bmN0aW9uKGlkLCB4LCB5LCBzcGRYLCBzcGRZLCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICBsZXQgZW5lbXkxID0ge1xyXG4gICAgICAgIHg6eCxcclxuICAgICAgICBzcGRYOiBzcGRYLFxyXG4gICAgICAgIHk6eSxcclxuICAgICAgICBzcGRZOnNwZFksXHJcbiAgICAgICAgbmFtZTogXCJFXCIsXHJcbiAgICAgICAgaWQ6aWQsXHJcbiAgICAgICAgd2lkdGg6IHdpZHRoLFxyXG4gICAgICAgIGhlaWdodDogaGVpZ2h0LFxyXG4gICAgICAgIGNvbG9yOiBcInJlZFwiXHJcbiAgICB9O1xyXG4gICAgLy9jcmVhdGUgdGhlIGl0ZW0gaW4gZW5lbXlMaXN0XHJcbiAgICBlbmVteUxpc3RbaWRdID0gZW5lbXkxO1xyXG59XHJcblxyXG4vL21vdmVzIHBsYXllciAoeCBhbmQgeSkgd2l0aCBtb3VzZSBhbmQgbWFrZXMgc3VyZSBpdCBjYW4ndCBtb3ZlIG91dCBvZiBib3VuZHNcclxuZG9jdW1lbnQub25tb3VzZW1vdmUgPSBmdW5jdGlvbihtb3VzZSkge1xyXG4gICAgbGV0IG1vdXNlWCA9IG1vdXNlLmNsaWVudFggLSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN0eFwiKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xyXG4gICAgbGV0IG1vdXNlWSA9IG1vdXNlLmNsaWVudFkgLSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN0eFwiKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XHJcblxyXG4gICAgaWYgKG1vdXNlWCA8IHBsYXllci53aWR0aC8yKVxyXG4gICAgICAgIG1vdXNlWCA9IHBsYXllci53aWR0aC8yO1xyXG4gICAgaWYgKG1vdXNlWCA+IHdpZHRoIC0gcGxheWVyLndpZHRoLzIpXHJcbiAgICAgICAgbW91c2VYID0gd2lkdGggLSBwbGF5ZXIud2lkdGgvMjtcclxuICAgIGlmIChtb3VzZVkgPCBwbGF5ZXIuaGVpZ2h0LzIpXHJcbiAgICAgICAgbW91c2VZID0gcGxheWVyLmhlaWdodC8yO1xyXG4gICAgaWYgKG1vdXNlWSA+IGhlaWdodCAtIHBsYXllci5oZWlnaHQvMilcclxuICAgICAgICBtb3VzZVkgPSBoZWlnaHQgLSBwbGF5ZXIuaGVpZ2h0LzI7XHJcblxyXG4gICAgcGxheWVyLnggPSBtb3VzZVg7XHJcbiAgICBwbGF5ZXIueSA9IG1vdXNlWTtcclxufVxyXG5cclxuXHJcbmNvbnN0IHVwZGF0ZUVudGl0eSA9IGZ1bmN0aW9uKGVudGl0eSkge1xyXG4gICAgdXBkYXRlRW50aXR5UG9zaXRpb24oZW50aXR5KTtcclxuICAgIGRyYXdFbnRpdHkoZW50aXR5KTtcclxufVxyXG5cclxuXHJcbmNvbnN0IHVwZGF0ZUVudGl0eVBvc2l0aW9uID0gZnVuY3Rpb24oZW50aXR5KSB7XHJcbi8vZW50aXR5IG1vdmVtZW50XHJcbiAgICBlbnRpdHkueCArPSBlbnRpdHkuc3BkWDtcclxuICAgIGVudGl0eS55ICs9IGVudGl0eS5zcGRZO1xyXG4vLyBjb25zb2xlLmxvZyhgJHtlbnRpdHl9IG1vdmluZ2AsIHgpO1xyXG4vL2NvbGxpc2lvbiBkZXRlY3Rpb24gdG8gY2hhbmdlIHRoZSBkaXJlY3Rpb24gb2YgZW50aXR5IHdoZW4gaXQgaGl0cyB0aGUgYm91bmRhcmllc1xyXG4gICAgaWYoZW50aXR5LnggPCAwIHx8IGVudGl0eS54ID4gd2lkdGgpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnT3V0IG9mIEJvdW5kcycpO1xyXG4gICAgICAgIGVudGl0eS5zcGRYID0gLWVudGl0eS5zcGRYO1xyXG4gICAgfVxyXG4gICAgaWYoZW50aXR5LnkgPCAwIHx8IGVudGl0eS55ID4gaGVpZ2h0KSB7XHJcbiAgICAgICAgZW50aXR5LnNwZFkgPSAtZW50aXR5LnNwZFk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IHRlc3RDb2xsaXNpb25SZWN0UmVjdCA9IGZ1bmN0aW9uKHJlY3QxLCByZWN0Mikge1xyXG4gICAgcmV0dXJuIHJlY3QxLnggPD0gcmVjdDIueCArIHJlY3QyLndpZHRoXHJcbiAgICAgICAgJiYgcmVjdDIueCA8PSByZWN0MS54ICsgcmVjdDEud2lkdGhcclxuICAgICAgICAmJiByZWN0MS55IDw9IHJlY3QyLnkgKyByZWN0Mi5oZWlnaHRcclxuICAgICAgICAmJiByZWN0Mi55IDw9IHJlY3QxLnkgKyByZWN0MS5oZWlnaHQ7XHJcbn0gXHJcblxyXG4vL2RyYXdzIGVudGl0aWVzIGFzIHJlY3RhbmdsZXNcclxuY29uc3QgZHJhd0VudGl0eSA9IGZ1bmN0aW9uKGVudGl0eSkge1xyXG4gICAgY3R4LnNhdmUoKTsvL3NhdmVzIHRoZSBzdHlsZXNcclxuICAgIGN0eC5maWxsU3R5bGUgPSBlbnRpdHkuY29sb3I7XHJcbiAgICBjdHguZmlsbFJlY3QoZW50aXR5LnggLSBlbnRpdHkud2lkdGgvMiwgZW50aXR5LnkgLSBlbnRpdHkuaGVpZ2h0LzIsIGVudGl0eS53aWR0aCwgZW50aXR5LmhlaWdodCk7XHJcbiAgICBjdHgucmVzdG9yZSgpO1xyXG59XHJcblxyXG5jb25zdCB1cGRhdGUgPSBmdW5jdGlvbigpIHtcclxuLy8gY2xlYXJzIHJlY3RhbmdsZSBpbiBjYW52YXMgc28gdGhlIGZpbGxUZXh0IGRvZXNuJ3QganVzdCByZXBlYXRcclxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICBmcmFtZUNvdW50Kys7XHJcblxyXG4gICAgaWYoZnJhbWVDb3VudCAlIDEwMCA9PT0gMCkgLy91cGRhdGVzIGV2ZXJ5IDRzZWNcclxuICAgICAgICByYW5kb21seUdlbmVyYXRlRW5lbXkoKTtcclxuXHJcblxyXG4gICAgLy9sb29wIHRocm91Z2ggZW5lbXlMaXN0IHRvIHVwZGF0ZSBlbmVtaWVzXHJcbiAgICBmb3IgKGxldCBrZXkgaW4gZW5lbXlMaXN0KSB7XHJcbiAgICAgICAgdXBkYXRlRW50aXR5KGVuZW15TGlzdFtrZXldKTtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBjb2xsaXNpb24gPSB0ZXN0Q29sbGlzaW9uKHBsYXllciwgZW5lbXlMaXN0W2tleV0pO1xyXG4gICAgICAgIGlmKGNvbGxpc2lvbikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvbGxpc2lvbiFcIik7XHJcbiAgICAgICAgICAgIHBsYXllci5ocCAtPSAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZihwbGF5ZXIuaHAgPD0gMCkge1xyXG4gICAgICAgIGxldCB0aW1lU3Vydml2ZWQgPSBEYXRlLm5vdygpIC0gdGltZVdoZW5HYW1lU3RhcnRlZDtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIllvdSBsb3N0ISBZb3Ugc3Vydml2ZWQgZm9yIFwiKyB0aW1lU3Vydml2ZWQgKyBcIiBtcy5cIik7XHJcbiAgICAgICAgdGltZVdoZW5HYW1lU3RhcnRlZCA9IERhdGUubm93KCk7XHJcbiAgICAgICAgc3RhcnROZXdHYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd0VudGl0eShwbGF5ZXIpO1xyXG4gICAgY3R4LmZpbGxUZXh0KHBsYXllci5ocCArIFwiSFBcIiwgMCwgMzApO1xyXG5cclxufVxyXG5cclxuY29uc3Qgc3RhcnROZXdHYW1lID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcGxheWVyLmhwID0gMTA7XHJcbiAgICB0aW1lV2hlbkdhbWVTdGFydGVkID0gRGF0ZS5ub3coKTtcclxuICAgIGZyYW1lQ291bnQgPSAwO1xyXG4gICAgZW5lbXlMaXN0ID0ge307XHJcbiAgICByYW5kb21seUdlbmVyYXRlRW5lbXkoKTtcclxuICAgIHJhbmRvbWx5R2VuZXJhdGVFbmVteSgpO1xyXG4gICAgcmFuZG9tbHlHZW5lcmF0ZUVuZW15KCk7XHJcbn1cclxuXHJcbmNvbnN0IHJhbmRvbWx5R2VuZXJhdGVFbmVteSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHggPSBNYXRoLnJhbmRvbSgpKndpZHRoO1xyXG4gICAgbGV0IHkgPSBNYXRoLnJhbmRvbSgpKmhlaWdodDtcclxuICAgIGxldCBzcGRYID0gNSArIE1hdGgucmFuZG9tKCkqNTtcclxuICAgIGxldCBzcGRZID0gNSArIE1hdGgucmFuZG9tKCkqNTtcclxuICAgIGxldCBlbmVteUhlaWdodCA9IDEwICsgTWF0aC5yYW5kb20oKSozMDtcclxuICAgIGxldCBlbmVteVdpZHRoID0gMTAgKyBNYXRoLnJhbmRvbSgpKjMwO1xyXG4gICAgbGV0IGlkID0gTWF0aC5yYW5kb20oKTtcclxuICAgIGVuZW15KGlkLCB4LCB5LCBzcGRYLCBzcGRZLCBlbmVteVdpZHRoLCBlbmVteUhlaWdodCk7XHJcbn1cclxuXHJcbnN0YXJ0TmV3R2FtZSgpO1xyXG5cclxuc2V0SW50ZXJ2YWwodXBkYXRlLCA0MCk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAvKlx0Q29tbWVudCBTZWN0aW9uXHJcbiAgICBcclxuICAgIC8vMS4gTW9kaWZ5IFNldHRpbmdzID1cclxuICAgIGN0eC5mb250ID0gJzMwcHggQXJpYWwnO1x0Ly9Gb250IHVzZWRcclxuICAgIGN0eC5maWxsU3R5bGUgPSAncmVkJztcdFx0Ly9Db2xvciBvZiB0aGUgdGV4dCBhbmQgZm9ybXNcclxuICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuNTtcdFx0Ly9UcmFuc3BhcmVuY3kgMCA9IGludmlzYmxlLCAxID0gdmlzaWJsZVxyXG4gICAgXHJcbiAgICAvLzIuIERyYXcgc29tZXRoaW5nICgpXHJcbiAgICBjdHguZmlsbFRleHQoJ0hlbGxvJyw1MCw1MCk7XHQvL1dyaXRlIHRleHQgLi4uIGN0eC5maWxsVGV4dCgndGV4dCcseCx5KTtcclxuICAgIGN0eC5maWxsUmVjdCg1MCw1MCwxMDAsMTAwKTtcdFx0Ly9EcmF3IHJlY3RhbmdsZSAuLi4gY3R4LmZpbGxSZWN0KHN0YXJ0WCxzdGFydFksd2lkdGgsaGVpZ2h0KTtcclxuICAgIGN0eC5jbGVhclJlY3QoNzUsNzUsMTAwLDEwMCk7XHRcdC8vQ2xlYXIgQ2FudmFzIC4uLiBjdHguZmlsbFJlY3Qoc3RhcnRYLHN0YXJ0WSx3aWR0aCxoZWlnaHQpO1xyXG4gICAgXHJcbiAgICB4ICs9IHNwZFg7IFx0c2FtZSB0aGFuXHR4ID0geCArc3BkWFxyXG4gICAgXHJcbiAgICBEZWJ1Z2dlcjpcclxuICAgIEYxMlxyXG4gICAgQnJlYWtwb2ludCA9IENvZGUgc3RvcHMgd2hlbiByZWFjaGVzIHRoaXMgbGluZSBpZiBjb25zb2xlIGlzIG9wZW5lZFxyXG4gICAgQ29uc29sZSA9IEdldCB0aGUgdmFsdWUgb2YgdmFyaWFibGUgKyBNZXNzYWdlIHdpdGggY29uc29sZS5sb2coJ3RleHQnKTtcclxuICAgIFxyXG4gICAgRW5kIG9mIENvbW1lbnQgU2VjdGlvbiAqL1xyXG4gICAgXHJcbiAgICBcclxuLy8gPC9zY3JpcHQ+Il19
