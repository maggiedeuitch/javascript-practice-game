(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

console.log("linked");

//creates canvas in DOM
var ctx = document.getElementById("ctx").getContext("2d");
ctx.font = '30px Arial';
var height = 500;
var width = 500;

//returns time in milliseconds
var timeWhenGameStarted = Date.now();

//every time game is updated, framecount is updated by 1
var frameCount = 0;

var score = 0;

var player = {
    x: 50,
    spdX: 30,
    y: 40,
    spdY: 5,
    name: "P",
    hp: 10,
    width: 20,
    height: 20,
    color: "green",
    attackSpeed: 1,
    attackCounter: 0,

    //user keyboard interaction
    pressingDown: false,
    pressingUp: false,
    pressingLeft: false,
    pressingRight: false

};
//enemyList stores all the enemies in an object
var enemyList = {};
var upgradeList = {};
var bulletList = {};

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

//UPGRADE ENTITIES
var upgrade = function upgrade(id, x, y, spdX, spdY, width, height, category, color) {
    var upgrade1 = {
        x: x,
        spdX: spdX,
        y: y,
        spdY: spdY,
        name: "U",
        id: id,
        width: width,
        height: height,
        color: color,
        category: category

    };
    //create the item in upgradeList
    upgradeList[id] = upgrade1;
};

var randomlyGenerateUpgrade = function randomlyGenerateUpgrade() {
    var x = Math.random() * width;
    var y = Math.random() * height;
    var spdX = 0;
    var spdY = 0;
    var upgradeHeight = 10;
    var upgradeWidth = 10;
    var id = Math.random();

    var category = void 0;
    var color = void 0;

    if (Math.random() < 0.5) {
        category = "score";
        color = "orange";
    } else {
        category = "attackSpeed";
        color = "purple";
    }
    //randomly creates either a score upgrade or attackSpeed upgrade
    upgrade(id, x, y, spdX, spdY, upgradeWidth, upgradeHeight, category, color);
};

//BULLET ENTITIES
var bullet = function bullet(id, x, y, spdX, spdY, width, height) {
    var bullet1 = {
        x: x,
        spdX: spdX,
        y: y,
        spdY: spdY,
        name: "B",
        id: id,
        width: width,
        height: height,
        color: "black",
        //timer to count when the bullet disappears
        timer: 0
    };
    //create the item in upgradeList
    bulletList[id] = bullet1;
};

var randomlyGenerateBullet = function randomlyGenerateBullet() {
    var x = player.x;
    var y = player.y;
    var bulletHeight = 10;
    var bulletWidth = 10;
    var id = Math.random();

    var angle = Math.random() * 360;
    //converts degrees into radians
    var spdX = Math.cos(angle / 180 * Math.PI) * 5;
    var spdY = Math.sin(angle / 180 * Math.PI) * 5;
    bullet(id, x, y, spdX, spdY, bulletWidth, bulletHeight);
};

//moves player (x and y) with mouse and makes sure it can't move out of bounds
// document.onmousemove = function(mouse) {
//     let mouseX = mouse.clientX - document.getElementById("ctx").getBoundingClientRect().left;
//     let mouseY = mouse.clientY - document.getElementById("ctx").getBoundingClientRect().top;

//     if (mouseX < player.width/2)
//         mouseX = player.width/2;
//     if (mouseX > width - player.width/2)
//         mouseX = width - player.width/2;
//     if (mouseY < player.height/2)
//         mouseY = player.height/2;
//     if (mouseY > height - player.height/2)
//         mouseY = height - player.height/2;

//     player.x = mouseX;
//     player.y = mouseY;
// }


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

//user shoots bullets on mouse click
document.onclick = function (mouse) {
    if (player.attackCounter > 25) {
        randomlyGenerateBullet();
        player.attackCounter = 0;
    }
};

//user movement with keyboard
document.onkeydown = function (event) {
    if (event.keyCode === 68) //d
        player.pressingRight = true;
    if (event.keyCode === 83) //s
        player.pressingDown = true;
    if (event.keyCode === 65) //a
        player.pressingLeft = true;
    if (event.keyCode === 87) //w
        player.pressingUp = true;
};

document.onkeyup = function (event) {
    if (event.keyCode === 68) //d
        player.pressingRight = false;
    if (event.keyCode === 83) //s
        player.pressingDown = false;
    if (event.keyCode === 65) //a
        player.pressingLeft = false;
    if (event.keyCode === 87) //w
        player.pressingUp = false;
};

var updatePlayerPosition = function updatePlayerPosition() {
    if (player.pressingRight) player.x += 10;
    if (player.pressingLeft) player.x += -10;
    if (player.pressingDown) player.y += 10;
    if (player.pressingUp) player.y += -10;

    //out of bounds for player
    if (player.x < player.width / 2) player.x = player.width / 2;
    if (player.x > width - player.width / 2) player.x = width - player.width / 2;
    if (player.y < player.height / 2) player.y = player.height / 2;
    if (player.y > height - player.height / 2) player.y = height - player.height / 2;
};

var update = function update() {
    // clears rectangle in canvas so the fillText doesn't just repeat
    ctx.clearRect(0, 0, width, height);
    frameCount++;
    score++;

    if (frameCount % 100 === 0) //updates every 4sec
        randomlyGenerateEnemy();
    if (frameCount % 75 === 0) //updates every 3sec
        randomlyGenerateUpgrade();

    player.attackCounter += player.attackSpeed;

    for (var key in bulletList) {
        updateEntity(bulletList[key]);

        var toRemove = false;
        bulletList[key].timer++;
        if (bulletList[key].timer > 75) {
            toRemove = true;
        }

        for (var key2 in enemyList) {
            var collision = testCollision(bulletList[key], enemyList[key2]);
            if (collision) {
                toRemove = true;
                delete enemyList[key2];
                break;
            }
        }
        if (toRemove) {
            delete bulletList[key];
        }
    }

    for (var _key in upgradeList) {
        updateEntity(upgradeList[_key]);
        var _collision = testCollision(player, upgradeList[_key]);
        if (_collision) {
            if (upgradeList[_key].category === "score") score += 1000;
            if (upgradeList[_key].category === "attackSpeed") player.attackSpeed += 3;
            delete upgradeList[_key]; //removes upgrade from DOM
        }
    }

    //loop through enemyList to update enemies
    for (var _key2 in enemyList) {
        updateEntity(enemyList[_key2]);

        var _collision2 = testCollision(player, enemyList[_key2]);
        if (_collision2) {
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
    updatePlayerPosition();
    drawEntity(player);
    ctx.fillText(player.hp + "HP", 0, 30);
    ctx.fillText("Score: " + score, 200, 30);
};

var startNewGame = function startNewGame() {
    player.hp = 10;
    timeWhenGameStarted = Date.now();
    frameCount = 0;
    score = 0;
    enemyList = {};
    upgradeList = {};
    bulletList = {};
    randomlyGenerateEnemy();
    randomlyGenerateEnemy();
    randomlyGenerateEnemy();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLFFBQVEsR0FBUixDQUFZLFFBQVo7O0FBRUE7QUFDQSxJQUFNLE1BQU0sU0FBUyxjQUFULENBQXdCLEtBQXhCLEVBQStCLFVBQS9CLENBQTBDLElBQTFDLENBQVo7QUFDQSxJQUFJLElBQUosR0FBVyxZQUFYO0FBQ0EsSUFBTSxTQUFTLEdBQWY7QUFDQSxJQUFNLFFBQVEsR0FBZDs7QUFFQTtBQUNBLElBQUksc0JBQXNCLEtBQUssR0FBTCxFQUExQjs7QUFFQTtBQUNBLElBQUksYUFBYSxDQUFqQjs7QUFFQSxJQUFJLFFBQVEsQ0FBWjs7QUFFQSxJQUFNLFNBQVM7QUFDWCxPQUFJLEVBRE87QUFFWCxVQUFPLEVBRkk7QUFHWCxPQUFJLEVBSE87QUFJWCxVQUFPLENBSkk7QUFLWCxVQUFPLEdBTEk7QUFNWCxRQUFJLEVBTk87QUFPWCxXQUFPLEVBUEk7QUFRWCxZQUFRLEVBUkc7QUFTWCxXQUFNLE9BVEs7QUFVWCxpQkFBYSxDQVZGO0FBV1gsbUJBQWUsQ0FYSjs7QUFhWDtBQUNBLGtCQUFjLEtBZEg7QUFlWCxnQkFBWSxLQWZEO0FBZ0JYLGtCQUFjLEtBaEJIO0FBaUJYLG1CQUFlOztBQWpCSixDQUFmO0FBb0JBO0FBQ0EsSUFBSSxZQUFZLEVBQWhCO0FBQ0EsSUFBSSxjQUFjLEVBQWxCO0FBQ0EsSUFBSSxhQUFhLEVBQWpCOztBQUlBO0FBQ0EsSUFBTSw2QkFBNkIsU0FBN0IsMEJBQTZCLENBQVMsT0FBVCxFQUFrQixPQUFsQixFQUEyQjtBQUMxRDtBQUNBLFFBQUksS0FBSyxRQUFRLENBQVIsR0FBWSxRQUFRLENBQTdCO0FBQ0EsUUFBSSxLQUFLLFFBQVEsQ0FBUixHQUFZLFFBQVEsQ0FBN0I7QUFDQSxXQUFPLEtBQUssSUFBTCxDQUFVLEtBQUcsRUFBSCxHQUFRLEtBQUcsRUFBckIs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QUFDQSxZQUFHLFdBQUgsRUFBYztBQUNWLG9CQUFRLEdBQVIsQ0FBWSxZQUFaO0FBQ0EsbUJBQU8sRUFBUCxJQUFhLENBQWI7QUFDSDtBQUNKOztBQUVELFFBQUcsT0FBTyxFQUFQLElBQWEsQ0FBaEIsRUFBbUI7QUFDZixZQUFJLGVBQWUsS0FBSyxHQUFMLEtBQWEsbUJBQWhDO0FBQ0EsZ0JBQVEsR0FBUixDQUFZLGdDQUErQixZQUEvQixHQUE4QyxNQUExRDtBQUNBLDhCQUFzQixLQUFLLEdBQUwsRUFBdEI7QUFDQTtBQUNIO0FBQ0Q7QUFDQSxlQUFXLE1BQVg7QUFDQSxRQUFJLFFBQUosQ0FBYSxPQUFPLEVBQVAsR0FBWSxJQUF6QixFQUErQixDQUEvQixFQUFrQyxFQUFsQztBQUNBLFFBQUksUUFBSixDQUFhLFlBQVksS0FBekIsRUFBZ0MsR0FBaEMsRUFBcUMsRUFBckM7QUFFSCxDQXRFRDs7QUF3RUEsSUFBTSxlQUFlLFNBQWYsWUFBZSxHQUFZO0FBQzdCLFdBQU8sRUFBUCxHQUFZLEVBQVo7QUFDQSwwQkFBc0IsS0FBSyxHQUFMLEVBQXRCO0FBQ0EsaUJBQWEsQ0FBYjtBQUNBLFlBQVEsQ0FBUjtBQUNBLGdCQUFZLEVBQVo7QUFDQSxrQkFBYyxFQUFkO0FBQ0EsaUJBQWEsRUFBYjtBQUNBO0FBQ0E7QUFDQTtBQUNILENBWEQ7O0FBZUE7O0FBRUEsWUFBWSxNQUFaLEVBQW9CLEVBQXBCOztBQU9JOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkoiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zb2xlLmxvZyhcImxpbmtlZFwiKTtcclxuXHJcbi8vY3JlYXRlcyBjYW52YXMgaW4gRE9NXHJcbmNvbnN0IGN0eCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3R4XCIpLmdldENvbnRleHQoXCIyZFwiKTtcclxuY3R4LmZvbnQgPSAnMzBweCBBcmlhbCc7XHJcbmNvbnN0IGhlaWdodCA9IDUwMDtcclxuY29uc3Qgd2lkdGggPSA1MDA7XHJcblxyXG4vL3JldHVybnMgdGltZSBpbiBtaWxsaXNlY29uZHNcclxubGV0IHRpbWVXaGVuR2FtZVN0YXJ0ZWQgPSBEYXRlLm5vdygpO1xyXG5cclxuLy9ldmVyeSB0aW1lIGdhbWUgaXMgdXBkYXRlZCwgZnJhbWVjb3VudCBpcyB1cGRhdGVkIGJ5IDFcclxubGV0IGZyYW1lQ291bnQgPSAwO1xyXG5cclxubGV0IHNjb3JlID0gMDtcclxuXHJcbmNvbnN0IHBsYXllciA9IHtcclxuICAgIHggOiA1MCxcclxuICAgIHNwZFggOiAzMCxcclxuICAgIHkgOiA0MCxcclxuICAgIHNwZFkgOiA1LFxyXG4gICAgbmFtZSA6IFwiUFwiLFxyXG4gICAgaHA6IDEwLFxyXG4gICAgd2lkdGg6IDIwLFxyXG4gICAgaGVpZ2h0OiAyMCxcclxuICAgIGNvbG9yOlwiZ3JlZW5cIixcclxuICAgIGF0dGFja1NwZWVkOiAxLFxyXG4gICAgYXR0YWNrQ291bnRlcjogMCxcclxuXHJcbiAgICAvL3VzZXIga2V5Ym9hcmQgaW50ZXJhY3Rpb25cclxuICAgIHByZXNzaW5nRG93bjogZmFsc2UsXHJcbiAgICBwcmVzc2luZ1VwOiBmYWxzZSxcclxuICAgIHByZXNzaW5nTGVmdDogZmFsc2UsXHJcbiAgICBwcmVzc2luZ1JpZ2h0OiBmYWxzZVxyXG5cclxufTtcclxuLy9lbmVteUxpc3Qgc3RvcmVzIGFsbCB0aGUgZW5lbWllcyBpbiBhbiBvYmplY3RcclxubGV0IGVuZW15TGlzdCA9IHt9O1xyXG5sZXQgdXBncmFkZUxpc3QgPSB7fTtcclxubGV0IGJ1bGxldExpc3QgPSB7fTtcclxuXHJcblxyXG5cclxuLy9EaXN0YW5jZSBGb3JtdWxhIGFuZCBQeXRoYWdvcmVhbiBUaGVvcmVtXHJcbmNvbnN0IGdldERpc3RhbmNlQmV0d2VlbkVudGl0aWVzID0gZnVuY3Rpb24oZW50aXR5MSwgZW50aXR5Mikge1xyXG4gICAgLy9yZXR1cm4gZGlzdGFuY2UobnVtYmVyKVxyXG4gICAgbGV0IHZ4ID0gZW50aXR5MS54IC0gZW50aXR5Mi54O1xyXG4gICAgbGV0IHZ5ID0gZW50aXR5MS55IC0gZW50aXR5Mi55O1xyXG4gICAgcmV0dXJuIE1hdGguc3FydCh2eCp2eCArIHZ5KnZ5KTtcclxufVxyXG5cclxuY29uc3QgdGVzdENvbGxpc2lvbiA9IGZ1bmN0aW9uKGVudGl0eTEsIGVudGl0eTIpIHtcclxuICAgIC8vcmV0dXJuIGlmIGNvbGxpZGluZyAodHJ1ZS9mYWxzZSlcclxuICAgIGNvbnN0IHJlY3QxID0ge1xyXG4gICAgICAgIHg6IGVudGl0eTEueCAtIGVudGl0eTEud2lkdGgvMixcclxuICAgICAgICB5OiBlbnRpdHkxLnkgLSBlbnRpdHkxLmhlaWdodC8yLFxyXG4gICAgICAgIHdpZHRoOiBlbnRpdHkxLndpZHRoLFxyXG4gICAgICAgIGhlaWdodDogZW50aXR5MS5oZWlnaHRcclxuICAgIH1cclxuICAgIGNvbnN0IHJlY3QyID0ge1xyXG4gICAgICAgIHg6IGVudGl0eTIueCAtIGVudGl0eTIud2lkdGgvMixcclxuICAgICAgICB5OiBlbnRpdHkyLnkgLSBlbnRpdHkyLmhlaWdodC8yLFxyXG4gICAgICAgIHdpZHRoOiBlbnRpdHkyLndpZHRoLFxyXG4gICAgICAgIGhlaWdodDogZW50aXR5Mi5oZWlnaHRcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGVzdENvbGxpc2lvblJlY3RSZWN0KHJlY3QxLCByZWN0Mik7XHJcblxyXG59XHJcblxyXG5cclxuLy9mdW5jdGlvbiB0aGF0IGNyZWF0ZXMgYSBuZXcgZW5lbXkgYW5kIGFkZHMgdG8gZW5lbXlMaXN0XHJcbmNvbnN0IGVuZW15ID0gZnVuY3Rpb24oaWQsIHgsIHksIHNwZFgsIHNwZFksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIGxldCBlbmVteTEgPSB7XHJcbiAgICAgICAgeDp4LFxyXG4gICAgICAgIHNwZFg6IHNwZFgsXHJcbiAgICAgICAgeTp5LFxyXG4gICAgICAgIHNwZFk6c3BkWSxcclxuICAgICAgICBuYW1lOiBcIkVcIixcclxuICAgICAgICBpZDppZCxcclxuICAgICAgICB3aWR0aDogd2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXHJcbiAgICAgICAgY29sb3I6IFwicmVkXCJcclxuICAgIH07XHJcbiAgICAvL2NyZWF0ZSB0aGUgaXRlbSBpbiBlbmVteUxpc3RcclxuICAgIGVuZW15TGlzdFtpZF0gPSBlbmVteTE7XHJcbn1cclxuXHJcbmNvbnN0IHJhbmRvbWx5R2VuZXJhdGVFbmVteSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCB4ID0gTWF0aC5yYW5kb20oKSAqIHdpZHRoO1xyXG4gICAgbGV0IHkgPSBNYXRoLnJhbmRvbSgpICogaGVpZ2h0O1xyXG4gICAgbGV0IHNwZFggPSA1ICsgTWF0aC5yYW5kb20oKSAqIDU7XHJcbiAgICBsZXQgc3BkWSA9IDUgKyBNYXRoLnJhbmRvbSgpICogNTtcclxuICAgIGxldCBlbmVteUhlaWdodCA9IDEwICsgTWF0aC5yYW5kb20oKSAqIDMwO1xyXG4gICAgbGV0IGVuZW15V2lkdGggPSAxMCArIE1hdGgucmFuZG9tKCkgKiAzMDtcclxuICAgIGxldCBpZCA9IE1hdGgucmFuZG9tKCk7XHJcbiAgICBlbmVteShpZCwgeCwgeSwgc3BkWCwgc3BkWSwgZW5lbXlXaWR0aCwgZW5lbXlIZWlnaHQpO1xyXG59XHJcblxyXG4vL1VQR1JBREUgRU5USVRJRVNcclxuY29uc3QgdXBncmFkZSA9IGZ1bmN0aW9uIChpZCwgeCwgeSwgc3BkWCwgc3BkWSwgd2lkdGgsIGhlaWdodCwgY2F0ZWdvcnksIGNvbG9yKSB7XHJcbiAgICBsZXQgdXBncmFkZTEgPSB7XHJcbiAgICAgICAgeDogeCxcclxuICAgICAgICBzcGRYOiBzcGRYLFxyXG4gICAgICAgIHk6IHksXHJcbiAgICAgICAgc3BkWTogc3BkWSxcclxuICAgICAgICBuYW1lOiBcIlVcIixcclxuICAgICAgICBpZDogaWQsXHJcbiAgICAgICAgd2lkdGg6IHdpZHRoLFxyXG4gICAgICAgIGhlaWdodDogaGVpZ2h0LFxyXG4gICAgICAgIGNvbG9yOiBjb2xvcixcclxuICAgICAgICBjYXRlZ29yeTogY2F0ZWdvcnlcclxuXHJcblxyXG4gICAgfTtcclxuICAgIC8vY3JlYXRlIHRoZSBpdGVtIGluIHVwZ3JhZGVMaXN0XHJcbiAgICB1cGdyYWRlTGlzdFtpZF0gPSB1cGdyYWRlMTtcclxufVxyXG5cclxuY29uc3QgcmFuZG9tbHlHZW5lcmF0ZVVwZ3JhZGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgeCA9IE1hdGgucmFuZG9tKCkgKiB3aWR0aDtcclxuICAgIGxldCB5ID0gTWF0aC5yYW5kb20oKSAqIGhlaWdodDtcclxuICAgIGxldCBzcGRYID0gMDtcclxuICAgIGxldCBzcGRZID0gMDtcclxuICAgIGxldCB1cGdyYWRlSGVpZ2h0ID0gMTA7XHJcbiAgICBsZXQgdXBncmFkZVdpZHRoID0gMTA7XHJcbiAgICBsZXQgaWQgPSBNYXRoLnJhbmRvbSgpO1xyXG5cclxuICAgIGxldCBjYXRlZ29yeTtcclxuICAgIGxldCBjb2xvcjsgXHJcblxyXG4gICAgaWYoTWF0aC5yYW5kb20oKSA8IDAuNSkge1xyXG4gICAgICAgIGNhdGVnb3J5ID0gXCJzY29yZVwiO1xyXG4gICAgICAgIGNvbG9yID0gXCJvcmFuZ2VcIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2F0ZWdvcnkgPSBcImF0dGFja1NwZWVkXCI7XHJcbiAgICAgICAgY29sb3IgPSBcInB1cnBsZVwiO1xyXG4gICAgfVxyXG4gICAgLy9yYW5kb21seSBjcmVhdGVzIGVpdGhlciBhIHNjb3JlIHVwZ3JhZGUgb3IgYXR0YWNrU3BlZWQgdXBncmFkZVxyXG4gICAgdXBncmFkZShpZCwgeCwgeSwgc3BkWCwgc3BkWSwgdXBncmFkZVdpZHRoLCB1cGdyYWRlSGVpZ2h0LCBjYXRlZ29yeSwgY29sb3IpO1xyXG59XHJcblxyXG4vL0JVTExFVCBFTlRJVElFU1xyXG5jb25zdCBidWxsZXQgPSBmdW5jdGlvbiAoaWQsIHgsIHksIHNwZFgsIHNwZFksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIGxldCBidWxsZXQxID0ge1xyXG4gICAgICAgIHg6IHgsXHJcbiAgICAgICAgc3BkWDogc3BkWCxcclxuICAgICAgICB5OiB5LFxyXG4gICAgICAgIHNwZFk6IHNwZFksXHJcbiAgICAgICAgbmFtZTogXCJCXCIsXHJcbiAgICAgICAgaWQ6IGlkLFxyXG4gICAgICAgIHdpZHRoOiB3aWR0aCxcclxuICAgICAgICBoZWlnaHQ6IGhlaWdodCxcclxuICAgICAgICBjb2xvcjogXCJibGFja1wiLFxyXG4gICAgICAgIC8vdGltZXIgdG8gY291bnQgd2hlbiB0aGUgYnVsbGV0IGRpc2FwcGVhcnNcclxuICAgICAgICB0aW1lcjowXHJcbiAgICB9O1xyXG4gICAgLy9jcmVhdGUgdGhlIGl0ZW0gaW4gdXBncmFkZUxpc3RcclxuICAgIGJ1bGxldExpc3RbaWRdID0gYnVsbGV0MTtcclxufVxyXG5cclxuY29uc3QgcmFuZG9tbHlHZW5lcmF0ZUJ1bGxldCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCB4ID1wbGF5ZXIueDtcclxuICAgIGxldCB5ID0gcGxheWVyLnk7XHJcbiAgICBsZXQgYnVsbGV0SGVpZ2h0ID0gMTA7XHJcbiAgICBsZXQgYnVsbGV0V2lkdGggPSAxMDtcclxuICAgIGxldCBpZCA9IE1hdGgucmFuZG9tKCk7XHJcblxyXG4gICAgbGV0IGFuZ2xlID0gTWF0aC5yYW5kb20oKSozNjA7XHJcbiAgICAvL2NvbnZlcnRzIGRlZ3JlZXMgaW50byByYWRpYW5zXHJcbiAgICBsZXQgc3BkWCA9IE1hdGguY29zKGFuZ2xlLzE4MCpNYXRoLlBJKSo1O1xyXG4gICAgbGV0IHNwZFkgPSBNYXRoLnNpbihhbmdsZS8xODAqTWF0aC5QSSkqNTtcclxuICAgIGJ1bGxldChpZCwgeCwgeSwgc3BkWCwgc3BkWSwgYnVsbGV0V2lkdGgsIGJ1bGxldEhlaWdodCk7XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG4vL21vdmVzIHBsYXllciAoeCBhbmQgeSkgd2l0aCBtb3VzZSBhbmQgbWFrZXMgc3VyZSBpdCBjYW4ndCBtb3ZlIG91dCBvZiBib3VuZHNcclxuLy8gZG9jdW1lbnQub25tb3VzZW1vdmUgPSBmdW5jdGlvbihtb3VzZSkge1xyXG4vLyAgICAgbGV0IG1vdXNlWCA9IG1vdXNlLmNsaWVudFggLSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN0eFwiKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xyXG4vLyAgICAgbGV0IG1vdXNlWSA9IG1vdXNlLmNsaWVudFkgLSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN0eFwiKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XHJcblxyXG4vLyAgICAgaWYgKG1vdXNlWCA8IHBsYXllci53aWR0aC8yKVxyXG4vLyAgICAgICAgIG1vdXNlWCA9IHBsYXllci53aWR0aC8yO1xyXG4vLyAgICAgaWYgKG1vdXNlWCA+IHdpZHRoIC0gcGxheWVyLndpZHRoLzIpXHJcbi8vICAgICAgICAgbW91c2VYID0gd2lkdGggLSBwbGF5ZXIud2lkdGgvMjtcclxuLy8gICAgIGlmIChtb3VzZVkgPCBwbGF5ZXIuaGVpZ2h0LzIpXHJcbi8vICAgICAgICAgbW91c2VZID0gcGxheWVyLmhlaWdodC8yO1xyXG4vLyAgICAgaWYgKG1vdXNlWSA+IGhlaWdodCAtIHBsYXllci5oZWlnaHQvMilcclxuLy8gICAgICAgICBtb3VzZVkgPSBoZWlnaHQgLSBwbGF5ZXIuaGVpZ2h0LzI7XHJcblxyXG4vLyAgICAgcGxheWVyLnggPSBtb3VzZVg7XHJcbi8vICAgICBwbGF5ZXIueSA9IG1vdXNlWTtcclxuLy8gfVxyXG5cclxuXHJcbmNvbnN0IHVwZGF0ZUVudGl0eSA9IGZ1bmN0aW9uKGVudGl0eSkge1xyXG4gICAgdXBkYXRlRW50aXR5UG9zaXRpb24oZW50aXR5KTtcclxuICAgIGRyYXdFbnRpdHkoZW50aXR5KTtcclxufVxyXG5cclxuXHJcbmNvbnN0IHVwZGF0ZUVudGl0eVBvc2l0aW9uID0gZnVuY3Rpb24oZW50aXR5KSB7XHJcbi8vZW50aXR5IG1vdmVtZW50XHJcbiAgICBlbnRpdHkueCArPSBlbnRpdHkuc3BkWDtcclxuICAgIGVudGl0eS55ICs9IGVudGl0eS5zcGRZO1xyXG4vLyBjb25zb2xlLmxvZyhgJHtlbnRpdHl9IG1vdmluZ2AsIHgpO1xyXG4vL2NvbGxpc2lvbiBkZXRlY3Rpb24gdG8gY2hhbmdlIHRoZSBkaXJlY3Rpb24gb2YgZW50aXR5IHdoZW4gaXQgaGl0cyB0aGUgYm91bmRhcmllc1xyXG4gICAgaWYoZW50aXR5LnggPCAwIHx8IGVudGl0eS54ID4gd2lkdGgpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnT3V0IG9mIEJvdW5kcycpO1xyXG4gICAgICAgIGVudGl0eS5zcGRYID0gLWVudGl0eS5zcGRYO1xyXG4gICAgfVxyXG4gICAgaWYoZW50aXR5LnkgPCAwIHx8IGVudGl0eS55ID4gaGVpZ2h0KSB7XHJcbiAgICAgICAgZW50aXR5LnNwZFkgPSAtZW50aXR5LnNwZFk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IHRlc3RDb2xsaXNpb25SZWN0UmVjdCA9IGZ1bmN0aW9uKHJlY3QxLCByZWN0Mikge1xyXG4gICAgcmV0dXJuIHJlY3QxLnggPD0gcmVjdDIueCArIHJlY3QyLndpZHRoXHJcbiAgICAgICAgJiYgcmVjdDIueCA8PSByZWN0MS54ICsgcmVjdDEud2lkdGhcclxuICAgICAgICAmJiByZWN0MS55IDw9IHJlY3QyLnkgKyByZWN0Mi5oZWlnaHRcclxuICAgICAgICAmJiByZWN0Mi55IDw9IHJlY3QxLnkgKyByZWN0MS5oZWlnaHQ7XHJcbn0gXHJcblxyXG4vL2RyYXdzIGVudGl0aWVzIGFzIHJlY3RhbmdsZXNcclxuY29uc3QgZHJhd0VudGl0eSA9IGZ1bmN0aW9uKGVudGl0eSkge1xyXG4gICAgY3R4LnNhdmUoKTsvL3NhdmVzIHRoZSBzdHlsZXNcclxuICAgIGN0eC5maWxsU3R5bGUgPSBlbnRpdHkuY29sb3I7XHJcbiAgICBjdHguZmlsbFJlY3QoZW50aXR5LnggLSBlbnRpdHkud2lkdGgvMiwgZW50aXR5LnkgLSBlbnRpdHkuaGVpZ2h0LzIsIGVudGl0eS53aWR0aCwgZW50aXR5LmhlaWdodCk7XHJcbiAgICBjdHgucmVzdG9yZSgpO1xyXG59XHJcblxyXG4vL3VzZXIgc2hvb3RzIGJ1bGxldHMgb24gbW91c2UgY2xpY2tcclxuZG9jdW1lbnQub25jbGljayA9IGZ1bmN0aW9uKG1vdXNlKXtcclxuICAgIGlmKHBsYXllci5hdHRhY2tDb3VudGVyID4gMjUpIHtcclxuICAgICAgICByYW5kb21seUdlbmVyYXRlQnVsbGV0KCk7XHJcbiAgICAgICAgcGxheWVyLmF0dGFja0NvdW50ZXIgPSAwO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL3VzZXIgbW92ZW1lbnQgd2l0aCBrZXlib2FyZFxyXG5kb2N1bWVudC5vbmtleWRvd24gPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGlmIChldmVudC5rZXlDb2RlID09PSA2OCkgLy9kXHJcbiAgICAgICAgcGxheWVyLnByZXNzaW5nUmlnaHQgPSB0cnVlO1xyXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDgzKSAvL3NcclxuICAgICAgICBwbGF5ZXIucHJlc3NpbmdEb3duID0gdHJ1ZTtcclxuICAgIGlmIChldmVudC5rZXlDb2RlID09PSA2NSkgLy9hXHJcbiAgICAgICAgcGxheWVyLnByZXNzaW5nTGVmdCA9IHRydWU7XHJcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gODcpIC8vd1xyXG4gICAgICAgIHBsYXllci5wcmVzc2luZ1VwID0gdHJ1ZTtcclxufVxyXG5cclxuZG9jdW1lbnQub25rZXl1cCA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gNjgpIC8vZFxyXG4gICAgICAgIHBsYXllci5wcmVzc2luZ1JpZ2h0ID0gZmFsc2U7XHJcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gODMpIC8vc1xyXG4gICAgICAgIHBsYXllci5wcmVzc2luZ0Rvd24gPSBmYWxzZTtcclxuICAgIGlmIChldmVudC5rZXlDb2RlID09PSA2NSkgLy9hXHJcbiAgICAgICAgcGxheWVyLnByZXNzaW5nTGVmdCA9IGZhbHNlO1xyXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDg3KSAvL3dcclxuICAgICAgICBwbGF5ZXIucHJlc3NpbmdVcCA9IGZhbHNlO1xyXG59XHJcblxyXG5jb25zdCB1cGRhdGVQbGF5ZXJQb3NpdGlvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYocGxheWVyLnByZXNzaW5nUmlnaHQpXHJcbiAgICAgICAgcGxheWVyLnggKz0gMTA7XHJcbiAgICBpZiAocGxheWVyLnByZXNzaW5nTGVmdClcclxuICAgICAgICBwbGF5ZXIueCArPSAtMTA7XHJcbiAgICBpZiAocGxheWVyLnByZXNzaW5nRG93bilcclxuICAgICAgICBwbGF5ZXIueSArPSAxMDtcclxuICAgIGlmIChwbGF5ZXIucHJlc3NpbmdVcClcclxuICAgICAgICBwbGF5ZXIueSArPSAtMTA7XHJcblxyXG4vL291dCBvZiBib3VuZHMgZm9yIHBsYXllclxyXG5pZihwbGF5ZXIueCA8IHBsYXllci53aWR0aC8yKVxyXG4gICAgcGxheWVyLnggPSBwbGF5ZXIud2lkdGgvMjtcclxuaWYgKHBsYXllci54ID4gd2lkdGggLSBwbGF5ZXIud2lkdGggLyAyKVxyXG4gICAgcGxheWVyLnggPSB3aWR0aCAtIHBsYXllci53aWR0aCAvIDI7XHJcbmlmIChwbGF5ZXIueSA8IHBsYXllci5oZWlnaHQgLyAyKVxyXG4gICAgcGxheWVyLnkgPSBwbGF5ZXIuaGVpZ2h0IC8gMjtcclxuaWYgKHBsYXllci55ID4gaGVpZ2h0IC0gcGxheWVyLmhlaWdodCAvIDIpXHJcbiAgICBwbGF5ZXIueSA9IGhlaWdodCAtIHBsYXllci5oZWlnaHQgLyAyO1xyXG59XHJcblxyXG5jb25zdCB1cGRhdGUgPSBmdW5jdGlvbigpIHtcclxuLy8gY2xlYXJzIHJlY3RhbmdsZSBpbiBjYW52YXMgc28gdGhlIGZpbGxUZXh0IGRvZXNuJ3QganVzdCByZXBlYXRcclxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICBmcmFtZUNvdW50Kys7XHJcbiAgICBzY29yZSsrO1xyXG5cclxuICAgIGlmKGZyYW1lQ291bnQgJSAxMDAgPT09IDApIC8vdXBkYXRlcyBldmVyeSA0c2VjXHJcbiAgICAgICAgcmFuZG9tbHlHZW5lcmF0ZUVuZW15KCk7XHJcbiAgICBpZiAoZnJhbWVDb3VudCAlIDc1ID09PSAwKSAvL3VwZGF0ZXMgZXZlcnkgM3NlY1xyXG4gICAgICAgIHJhbmRvbWx5R2VuZXJhdGVVcGdyYWRlKCk7XHJcbiAgICBcclxuICAgIHBsYXllci5hdHRhY2tDb3VudGVyICs9IHBsYXllci5hdHRhY2tTcGVlZDtcclxuXHJcbiAgICBmb3IobGV0IGtleSBpbiBidWxsZXRMaXN0KSB7XHJcbiAgICAgICAgdXBkYXRlRW50aXR5KGJ1bGxldExpc3Rba2V5XSk7XHJcblxyXG4gICAgICAgIGxldCB0b1JlbW92ZSA9IGZhbHNlO1xyXG4gICAgICAgIGJ1bGxldExpc3Rba2V5XS50aW1lcisrO1xyXG4gICAgICAgIGlmKGJ1bGxldExpc3Rba2V5XS50aW1lciA+IDc1KSB7XHJcbiAgICAgICAgICAgIHRvUmVtb3ZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcihsZXQga2V5MiBpbiBlbmVteUxpc3Qpe1xyXG4gICAgICAgICAgICBsZXQgY29sbGlzaW9uID0gdGVzdENvbGxpc2lvbihidWxsZXRMaXN0W2tleV0sIGVuZW15TGlzdFtrZXkyXSk7XHJcbiAgICAgICAgICAgIGlmIChjb2xsaXNpb24pe1xyXG4gICAgICAgICAgICAgICAgdG9SZW1vdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGVuZW15TGlzdFtrZXkyXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRvUmVtb3ZlKXtcclxuICAgICAgICAgICAgZGVsZXRlIGJ1bGxldExpc3Rba2V5XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9yKGxldCBrZXkgaW4gdXBncmFkZUxpc3QpIHtcclxuICAgICAgICB1cGRhdGVFbnRpdHkodXBncmFkZUxpc3Rba2V5XSk7XHJcbiAgICAgICAgY29uc3QgY29sbGlzaW9uID0gdGVzdENvbGxpc2lvbihwbGF5ZXIsIHVwZ3JhZGVMaXN0W2tleV0pO1xyXG4gICAgICAgIGlmKGNvbGxpc2lvbikge1xyXG4gICAgICAgICAgICBpZiAodXBncmFkZUxpc3Rba2V5XS5jYXRlZ29yeSA9PT0gXCJzY29yZVwiKVxyXG4gICAgICAgICAgICAgICAgc2NvcmUgKz0gMTAwMDtcclxuICAgICAgICAgICAgaWYgKHVwZ3JhZGVMaXN0W2tleV0uY2F0ZWdvcnkgPT09IFwiYXR0YWNrU3BlZWRcIilcclxuICAgICAgICAgICAgICAgIHBsYXllci5hdHRhY2tTcGVlZCArPSAzO1xyXG4gICAgICAgICAgICBkZWxldGUgdXBncmFkZUxpc3Rba2V5XS8vcmVtb3ZlcyB1cGdyYWRlIGZyb20gRE9NXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL2xvb3AgdGhyb3VnaCBlbmVteUxpc3QgdG8gdXBkYXRlIGVuZW1pZXNcclxuICAgIGZvciAobGV0IGtleSBpbiBlbmVteUxpc3QpIHtcclxuICAgICAgICB1cGRhdGVFbnRpdHkoZW5lbXlMaXN0W2tleV0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGNvbGxpc2lvbiA9IHRlc3RDb2xsaXNpb24ocGxheWVyLCBlbmVteUxpc3Rba2V5XSk7XHJcbiAgICAgICAgaWYoY29sbGlzaW9uKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29sbGlzaW9uIVwiKTtcclxuICAgICAgICAgICAgcGxheWVyLmhwIC09IDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmKHBsYXllci5ocCA8PSAwKSB7XHJcbiAgICAgICAgbGV0IHRpbWVTdXJ2aXZlZCA9IERhdGUubm93KCkgLSB0aW1lV2hlbkdhbWVTdGFydGVkO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiWW91IGxvc3QhIFlvdSBzdXJ2aXZlZCBmb3IgXCIrIHRpbWVTdXJ2aXZlZCArIFwiIG1zLlwiKTtcclxuICAgICAgICB0aW1lV2hlbkdhbWVTdGFydGVkID0gRGF0ZS5ub3coKTtcclxuICAgICAgICBzdGFydE5ld0dhbWUoKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZVBsYXllclBvc2l0aW9uKCk7XHJcbiAgICBkcmF3RW50aXR5KHBsYXllcik7XHJcbiAgICBjdHguZmlsbFRleHQocGxheWVyLmhwICsgXCJIUFwiLCAwLCAzMCk7XHJcbiAgICBjdHguZmlsbFRleHQoXCJTY29yZTogXCIgKyBzY29yZSwgMjAwLCAzMCk7XHJcblxyXG59XHJcblxyXG5jb25zdCBzdGFydE5ld0dhbWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBwbGF5ZXIuaHAgPSAxMDtcclxuICAgIHRpbWVXaGVuR2FtZVN0YXJ0ZWQgPSBEYXRlLm5vdygpO1xyXG4gICAgZnJhbWVDb3VudCA9IDA7XHJcbiAgICBzY29yZSA9IDA7XHJcbiAgICBlbmVteUxpc3QgPSB7fTtcclxuICAgIHVwZ3JhZGVMaXN0ID0ge307XHJcbiAgICBidWxsZXRMaXN0ID0ge307XHJcbiAgICByYW5kb21seUdlbmVyYXRlRW5lbXkoKTtcclxuICAgIHJhbmRvbWx5R2VuZXJhdGVFbmVteSgpO1xyXG4gICAgcmFuZG9tbHlHZW5lcmF0ZUVuZW15KCk7XHJcbn1cclxuXHJcblxyXG5cclxuc3RhcnROZXdHYW1lKCk7XHJcblxyXG5zZXRJbnRlcnZhbCh1cGRhdGUsIDQwKTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgIC8qXHRDb21tZW50IFNlY3Rpb25cclxuICAgIFxyXG4gICAgLy8xLiBNb2RpZnkgU2V0dGluZ3MgPVxyXG4gICAgY3R4LmZvbnQgPSAnMzBweCBBcmlhbCc7XHQvL0ZvbnQgdXNlZFxyXG4gICAgY3R4LmZpbGxTdHlsZSA9ICdyZWQnO1x0XHQvL0NvbG9yIG9mIHRoZSB0ZXh0IGFuZCBmb3Jtc1xyXG4gICAgY3R4Lmdsb2JhbEFscGhhID0gMC41O1x0XHQvL1RyYW5zcGFyZW5jeSAwID0gaW52aXNibGUsIDEgPSB2aXNpYmxlXHJcbiAgICBcclxuICAgIC8vMi4gRHJhdyBzb21ldGhpbmcgKClcclxuICAgIGN0eC5maWxsVGV4dCgnSGVsbG8nLDUwLDUwKTtcdC8vV3JpdGUgdGV4dCAuLi4gY3R4LmZpbGxUZXh0KCd0ZXh0Jyx4LHkpO1xyXG4gICAgY3R4LmZpbGxSZWN0KDUwLDUwLDEwMCwxMDApO1x0XHQvL0RyYXcgcmVjdGFuZ2xlIC4uLiBjdHguZmlsbFJlY3Qoc3RhcnRYLHN0YXJ0WSx3aWR0aCxoZWlnaHQpO1xyXG4gICAgY3R4LmNsZWFyUmVjdCg3NSw3NSwxMDAsMTAwKTtcdFx0Ly9DbGVhciBDYW52YXMgLi4uIGN0eC5maWxsUmVjdChzdGFydFgsc3RhcnRZLHdpZHRoLGhlaWdodCk7XHJcbiAgICBcclxuICAgIHggKz0gc3BkWDsgXHRzYW1lIHRoYW5cdHggPSB4ICtzcGRYXHJcbiAgICBcclxuICAgIERlYnVnZ2VyOlxyXG4gICAgRjEyXHJcbiAgICBCcmVha3BvaW50ID0gQ29kZSBzdG9wcyB3aGVuIHJlYWNoZXMgdGhpcyBsaW5lIGlmIGNvbnNvbGUgaXMgb3BlbmVkXHJcbiAgICBDb25zb2xlID0gR2V0IHRoZSB2YWx1ZSBvZiB2YXJpYWJsZSArIE1lc3NhZ2Ugd2l0aCBjb25zb2xlLmxvZygndGV4dCcpO1xyXG4gICAgXHJcbiAgICBFbmQgb2YgQ29tbWVudCBTZWN0aW9uICovXHJcbiAgICBcclxuICAgIFxyXG4vLyA8L3NjcmlwdD4iXX0=
