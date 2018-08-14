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
    attackSpeed: 1
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
    score++;

    if (frameCount % 100 === 0) //updates every 4sec
        randomlyGenerateEnemy();
    if (frameCount % 75 === 0) //updates every 3sec
        randomlyGenerateUpgrade();
    if (frameCount % Math.round(25 / player.attackSpeed) === 0) //updates every 1sec
        randomlyGenerateBullet();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLFFBQVEsR0FBUixDQUFZLFFBQVo7O0FBRUE7QUFDQSxJQUFNLE1BQU0sU0FBUyxjQUFULENBQXdCLEtBQXhCLEVBQStCLFVBQS9CLENBQTBDLElBQTFDLENBQVo7QUFDQSxJQUFJLElBQUosR0FBVyxZQUFYO0FBQ0EsSUFBTSxTQUFTLEdBQWY7QUFDQSxJQUFNLFFBQVEsR0FBZDs7QUFFQTtBQUNBLElBQUksc0JBQXNCLEtBQUssR0FBTCxFQUExQjs7QUFFQTtBQUNBLElBQUksYUFBYSxDQUFqQjs7QUFFQSxJQUFJLFFBQVEsQ0FBWjs7QUFFQSxJQUFNLFNBQVM7QUFDWCxPQUFJLEVBRE87QUFFWCxVQUFPLEVBRkk7QUFHWCxPQUFJLEVBSE87QUFJWCxVQUFPLENBSkk7QUFLWCxVQUFPLEdBTEk7QUFNWCxRQUFJLEVBTk87QUFPWCxXQUFPLEVBUEk7QUFRWCxZQUFRLEVBUkc7QUFTWCxXQUFNLE9BVEs7QUFVWCxpQkFBYTtBQVZGLENBQWY7QUFZQTtBQUNBLElBQUksWUFBWSxFQUFoQjtBQUNBLElBQUksY0FBYyxFQUFsQjtBQUNBLElBQUksYUFBYSxFQUFqQjs7QUFJQTtBQUNBLElBQU0sNkJBQTZCLFNBQTdCLDBCQUE2QixDQUFTLE9BQVQsRUFBa0IsT0FBbEIsRUFBMkI7QUFDMUQ7QUFDQSxRQUFJLEtBQUssUUFBUSxDQUFSLEdBQVksUUFBUSxDQUE3QjtBQUNBLFFBQUksS0FBSyxRQUFRLENBQVIsR0FBWSxRQUFRLENBQTdCO0FBQ0EsV0FBTyxLQUFLLElBQUwsQ0FBVSxLQUFHLEVBQUgsR0FBUSxLQUFHLEVBQXJCLENBQVA7QUFDSCxDQUxEOztBQU9BLElBQU0sZ0JBQWdCLFNBQWhCLGFBQWdCLENBQVMsT0FBVCxFQUFrQixPQUFsQixFQUEyQjtBQUM3QztBQUNBLFFBQU0sUUFB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TyxFQUFQLElBQWEsQ0FBYjtBQUNIO0FBQ0o7O0FBRUQsUUFBRyxPQUFPLEVBQVAsSUFBYSxDQUFoQixFQUFtQjtBQUNmLFlBQUksZUFBZSxLQUFLLEdBQUwsS0FBYSxtQkFBaEM7QUFDQSxnQkFBUSxHQUFSLENBQVksZ0NBQStCLFlBQS9CLEdBQThDLE1BQTFEO0FBQ0EsOEJBQXNCLEtBQUssR0FBTCxFQUF0QjtBQUNBO0FBQ0g7O0FBRUQsZUFBVyxNQUFYO0FBQ0EsUUFBSSxRQUFKLENBQWEsT0FBTyxFQUFQLEdBQVksSUFBekIsRUFBK0IsQ0FBL0IsRUFBa0MsRUFBbEM7QUFDQSxRQUFJLFFBQUosQ0FBYSxZQUFZLEtBQXpCLEVBQWdDLEdBQWhDLEVBQXFDLEVBQXJDO0FBRUgsQ0F0RUQ7O0FBd0VBLElBQU0sZUFBZSxTQUFmLFlBQWUsR0FBWTtBQUM3QixXQUFPLEVBQVAsR0FBWSxFQUFaO0FBQ0EsMEJBQXNCLEtBQUssR0FBTCxFQUF0QjtBQUNBLGlCQUFhLENBQWI7QUFDQSxZQUFRLENBQVI7QUFDQSxnQkFBWSxFQUFaO0FBQ0Esa0JBQWMsRUFBZDtBQUNBLGlCQUFhLEVBQWI7QUFDQTtBQUNBO0FBQ0E7QUFDSCxDQVhEOztBQWVBOztBQUVBLFlBQVksTUFBWixFQUFvQixFQUFwQjs7QUFPSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JKIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc29sZS5sb2coXCJsaW5rZWRcIik7XHJcblxyXG4vL2NyZWF0ZXMgY2FudmFzIGluIERPTVxyXG5jb25zdCBjdHggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN0eFwiKS5nZXRDb250ZXh0KFwiMmRcIik7XHJcbmN0eC5mb250ID0gJzMwcHggQXJpYWwnO1xyXG5jb25zdCBoZWlnaHQgPSA1MDA7XHJcbmNvbnN0IHdpZHRoID0gNTAwO1xyXG5cclxuLy9yZXR1cm5zIHRpbWUgaW4gbWlsbGlzZWNvbmRzXHJcbmxldCB0aW1lV2hlbkdhbWVTdGFydGVkID0gRGF0ZS5ub3coKTtcclxuXHJcbi8vZXZlcnkgdGltZSBnYW1lIGlzIHVwZGF0ZWQsIGZyYW1lY291bnQgaXMgdXBkYXRlZCBieSAxXHJcbmxldCBmcmFtZUNvdW50ID0gMDtcclxuXHJcbmxldCBzY29yZSA9IDA7XHJcblxyXG5jb25zdCBwbGF5ZXIgPSB7XHJcbiAgICB4IDogNTAsXHJcbiAgICBzcGRYIDogMzAsXHJcbiAgICB5IDogNDAsXHJcbiAgICBzcGRZIDogNSxcclxuICAgIG5hbWUgOiBcIlBcIixcclxuICAgIGhwOiAxMCxcclxuICAgIHdpZHRoOiAyMCxcclxuICAgIGhlaWdodDogMjAsXHJcbiAgICBjb2xvcjpcImdyZWVuXCIsXHJcbiAgICBhdHRhY2tTcGVlZDogMVxyXG59O1xyXG4vL2VuZW15TGlzdCBzdG9yZXMgYWxsIHRoZSBlbmVtaWVzIGluIGFuIG9iamVjdFxyXG5sZXQgZW5lbXlMaXN0ID0ge307XHJcbmxldCB1cGdyYWRlTGlzdCA9IHt9O1xyXG5sZXQgYnVsbGV0TGlzdCA9IHt9O1xyXG5cclxuXHJcblxyXG4vL0Rpc3RhbmNlIEZvcm11bGEgYW5kIFB5dGhhZ29yZWFuIFRoZW9yZW1cclxuY29uc3QgZ2V0RGlzdGFuY2VCZXR3ZWVuRW50aXRpZXMgPSBmdW5jdGlvbihlbnRpdHkxLCBlbnRpdHkyKSB7XHJcbiAgICAvL3JldHVybiBkaXN0YW5jZShudW1iZXIpXHJcbiAgICBsZXQgdnggPSBlbnRpdHkxLnggLSBlbnRpdHkyLng7XHJcbiAgICBsZXQgdnkgPSBlbnRpdHkxLnkgLSBlbnRpdHkyLnk7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHZ4KnZ4ICsgdnkqdnkpO1xyXG59XHJcblxyXG5jb25zdCB0ZXN0Q29sbGlzaW9uID0gZnVuY3Rpb24oZW50aXR5MSwgZW50aXR5Mikge1xyXG4gICAgLy9yZXR1cm4gaWYgY29sbGlkaW5nICh0cnVlL2ZhbHNlKVxyXG4gICAgY29uc3QgcmVjdDEgPSB7XHJcbiAgICAgICAgeDogZW50aXR5MS54IC0gZW50aXR5MS53aWR0aC8yLFxyXG4gICAgICAgIHk6IGVudGl0eTEueSAtIGVudGl0eTEuaGVpZ2h0LzIsXHJcbiAgICAgICAgd2lkdGg6IGVudGl0eTEud2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0OiBlbnRpdHkxLmhlaWdodFxyXG4gICAgfVxyXG4gICAgY29uc3QgcmVjdDIgPSB7XHJcbiAgICAgICAgeDogZW50aXR5Mi54IC0gZW50aXR5Mi53aWR0aC8yLFxyXG4gICAgICAgIHk6IGVudGl0eTIueSAtIGVudGl0eTIuaGVpZ2h0LzIsXHJcbiAgICAgICAgd2lkdGg6IGVudGl0eTIud2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0OiBlbnRpdHkyLmhlaWdodFxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0ZXN0Q29sbGlzaW9uUmVjdFJlY3QocmVjdDEsIHJlY3QyKTtcclxuXHJcbn1cclxuXHJcblxyXG4vL2Z1bmN0aW9uIHRoYXQgY3JlYXRlcyBhIG5ldyBlbmVteSBhbmQgYWRkcyB0byBlbmVteUxpc3RcclxuY29uc3QgZW5lbXkgPSBmdW5jdGlvbihpZCwgeCwgeSwgc3BkWCwgc3BkWSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgbGV0IGVuZW15MSA9IHtcclxuICAgICAgICB4OngsXHJcbiAgICAgICAgc3BkWDogc3BkWCxcclxuICAgICAgICB5OnksXHJcbiAgICAgICAgc3BkWTpzcGRZLFxyXG4gICAgICAgIG5hbWU6IFwiRVwiLFxyXG4gICAgICAgIGlkOmlkLFxyXG4gICAgICAgIHdpZHRoOiB3aWR0aCxcclxuICAgICAgICBoZWlnaHQ6IGhlaWdodCxcclxuICAgICAgICBjb2xvcjogXCJyZWRcIlxyXG4gICAgfTtcclxuICAgIC8vY3JlYXRlIHRoZSBpdGVtIGluIGVuZW15TGlzdFxyXG4gICAgZW5lbXlMaXN0W2lkXSA9IGVuZW15MTtcclxufVxyXG5cclxuY29uc3QgcmFuZG9tbHlHZW5lcmF0ZUVuZW15ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IHggPSBNYXRoLnJhbmRvbSgpICogd2lkdGg7XHJcbiAgICBsZXQgeSA9IE1hdGgucmFuZG9tKCkgKiBoZWlnaHQ7XHJcbiAgICBsZXQgc3BkWCA9IDUgKyBNYXRoLnJhbmRvbSgpICogNTtcclxuICAgIGxldCBzcGRZID0gNSArIE1hdGgucmFuZG9tKCkgKiA1O1xyXG4gICAgbGV0IGVuZW15SGVpZ2h0ID0gMTAgKyBNYXRoLnJhbmRvbSgpICogMzA7XHJcbiAgICBsZXQgZW5lbXlXaWR0aCA9IDEwICsgTWF0aC5yYW5kb20oKSAqIDMwO1xyXG4gICAgbGV0IGlkID0gTWF0aC5yYW5kb20oKTtcclxuICAgIGVuZW15KGlkLCB4LCB5LCBzcGRYLCBzcGRZLCBlbmVteVdpZHRoLCBlbmVteUhlaWdodCk7XHJcbn1cclxuXHJcbi8vVVBHUkFERSBFTlRJVElFU1xyXG5jb25zdCB1cGdyYWRlID0gZnVuY3Rpb24gKGlkLCB4LCB5LCBzcGRYLCBzcGRZLCB3aWR0aCwgaGVpZ2h0LCBjYXRlZ29yeSwgY29sb3IpIHtcclxuICAgIGxldCB1cGdyYWRlMSA9IHtcclxuICAgICAgICB4OiB4LFxyXG4gICAgICAgIHNwZFg6IHNwZFgsXHJcbiAgICAgICAgeTogeSxcclxuICAgICAgICBzcGRZOiBzcGRZLFxyXG4gICAgICAgIG5hbWU6IFwiVVwiLFxyXG4gICAgICAgIGlkOiBpZCxcclxuICAgICAgICB3aWR0aDogd2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXHJcbiAgICAgICAgY29sb3I6IGNvbG9yLFxyXG4gICAgICAgIGNhdGVnb3J5OiBjYXRlZ29yeVxyXG5cclxuXHJcbiAgICB9O1xyXG4gICAgLy9jcmVhdGUgdGhlIGl0ZW0gaW4gdXBncmFkZUxpc3RcclxuICAgIHVwZ3JhZGVMaXN0W2lkXSA9IHVwZ3JhZGUxO1xyXG59XHJcblxyXG5jb25zdCByYW5kb21seUdlbmVyYXRlVXBncmFkZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCB4ID0gTWF0aC5yYW5kb20oKSAqIHdpZHRoO1xyXG4gICAgbGV0IHkgPSBNYXRoLnJhbmRvbSgpICogaGVpZ2h0O1xyXG4gICAgbGV0IHNwZFggPSAwO1xyXG4gICAgbGV0IHNwZFkgPSAwO1xyXG4gICAgbGV0IHVwZ3JhZGVIZWlnaHQgPSAxMDtcclxuICAgIGxldCB1cGdyYWRlV2lkdGggPSAxMDtcclxuICAgIGxldCBpZCA9IE1hdGgucmFuZG9tKCk7XHJcblxyXG4gICAgbGV0IGNhdGVnb3J5O1xyXG4gICAgbGV0IGNvbG9yOyBcclxuXHJcbiAgICBpZihNYXRoLnJhbmRvbSgpIDwgMC41KSB7XHJcbiAgICAgICAgY2F0ZWdvcnkgPSBcInNjb3JlXCI7XHJcbiAgICAgICAgY29sb3IgPSBcIm9yYW5nZVwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjYXRlZ29yeSA9IFwiYXR0YWNrU3BlZWRcIjtcclxuICAgICAgICBjb2xvciA9IFwicHVycGxlXCI7XHJcbiAgICB9XHJcbiAgICAvL3JhbmRvbWx5IGNyZWF0ZXMgZWl0aGVyIGEgc2NvcmUgdXBncmFkZSBvciBhdHRhY2tTcGVlZCB1cGdyYWRlXHJcbiAgICB1cGdyYWRlKGlkLCB4LCB5LCBzcGRYLCBzcGRZLCB1cGdyYWRlV2lkdGgsIHVwZ3JhZGVIZWlnaHQsIGNhdGVnb3J5LCBjb2xvcik7XHJcbn1cclxuXHJcbi8vQlVMTEVUIEVOVElUSUVTXHJcbmNvbnN0IGJ1bGxldCA9IGZ1bmN0aW9uIChpZCwgeCwgeSwgc3BkWCwgc3BkWSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgbGV0IGJ1bGxldDEgPSB7XHJcbiAgICAgICAgeDogeCxcclxuICAgICAgICBzcGRYOiBzcGRYLFxyXG4gICAgICAgIHk6IHksXHJcbiAgICAgICAgc3BkWTogc3BkWSxcclxuICAgICAgICBuYW1lOiBcIkJcIixcclxuICAgICAgICBpZDogaWQsXHJcbiAgICAgICAgd2lkdGg6IHdpZHRoLFxyXG4gICAgICAgIGhlaWdodDogaGVpZ2h0LFxyXG4gICAgICAgIGNvbG9yOiBcImJsYWNrXCIsXHJcbiAgICAgICAgLy90aW1lciB0byBjb3VudCB3aGVuIHRoZSBidWxsZXQgZGlzYXBwZWFyc1xyXG4gICAgICAgIHRpbWVyOjBcclxuICAgIH07XHJcbiAgICAvL2NyZWF0ZSB0aGUgaXRlbSBpbiB1cGdyYWRlTGlzdFxyXG4gICAgYnVsbGV0TGlzdFtpZF0gPSBidWxsZXQxO1xyXG59XHJcblxyXG5jb25zdCByYW5kb21seUdlbmVyYXRlQnVsbGV0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IHggPXBsYXllci54O1xyXG4gICAgbGV0IHkgPSBwbGF5ZXIueTtcclxuICAgIGxldCBidWxsZXRIZWlnaHQgPSAxMDtcclxuICAgIGxldCBidWxsZXRXaWR0aCA9IDEwO1xyXG4gICAgbGV0IGlkID0gTWF0aC5yYW5kb20oKTtcclxuXHJcbiAgICBsZXQgYW5nbGUgPSBNYXRoLnJhbmRvbSgpKjM2MDtcclxuICAgIC8vY29udmVydHMgZGVncmVlcyBpbnRvIHJhZGlhbnNcclxuICAgIGxldCBzcGRYID0gTWF0aC5jb3MoYW5nbGUvMTgwKk1hdGguUEkpKjU7XHJcbiAgICBsZXQgc3BkWSA9IE1hdGguc2luKGFuZ2xlLzE4MCpNYXRoLlBJKSo1O1xyXG4gICAgYnVsbGV0KGlkLCB4LCB5LCBzcGRYLCBzcGRZLCBidWxsZXRXaWR0aCwgYnVsbGV0SGVpZ2h0KTtcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8vbW92ZXMgcGxheWVyICh4IGFuZCB5KSB3aXRoIG1vdXNlIGFuZCBtYWtlcyBzdXJlIGl0IGNhbid0IG1vdmUgb3V0IG9mIGJvdW5kc1xyXG5kb2N1bWVudC5vbm1vdXNlbW92ZSA9IGZ1bmN0aW9uKG1vdXNlKSB7XHJcbiAgICBsZXQgbW91c2VYID0gbW91c2UuY2xpZW50WCAtIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3R4XCIpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XHJcbiAgICBsZXQgbW91c2VZID0gbW91c2UuY2xpZW50WSAtIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3R4XCIpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcclxuXHJcbiAgICBpZiAobW91c2VYIDwgcGxheWVyLndpZHRoLzIpXHJcbiAgICAgICAgbW91c2VYID0gcGxheWVyLndpZHRoLzI7XHJcbiAgICBpZiAobW91c2VYID4gd2lkdGggLSBwbGF5ZXIud2lkdGgvMilcclxuICAgICAgICBtb3VzZVggPSB3aWR0aCAtIHBsYXllci53aWR0aC8yO1xyXG4gICAgaWYgKG1vdXNlWSA8IHBsYXllci5oZWlnaHQvMilcclxuICAgICAgICBtb3VzZVkgPSBwbGF5ZXIuaGVpZ2h0LzI7XHJcbiAgICBpZiAobW91c2VZID4gaGVpZ2h0IC0gcGxheWVyLmhlaWdodC8yKVxyXG4gICAgICAgIG1vdXNlWSA9IGhlaWdodCAtIHBsYXllci5oZWlnaHQvMjtcclxuXHJcbiAgICBwbGF5ZXIueCA9IG1vdXNlWDtcclxuICAgIHBsYXllci55ID0gbW91c2VZO1xyXG59XHJcblxyXG5cclxuY29uc3QgdXBkYXRlRW50aXR5ID0gZnVuY3Rpb24oZW50aXR5KSB7XHJcbiAgICB1cGRhdGVFbnRpdHlQb3NpdGlvbihlbnRpdHkpO1xyXG4gICAgZHJhd0VudGl0eShlbnRpdHkpO1xyXG59XHJcblxyXG5cclxuY29uc3QgdXBkYXRlRW50aXR5UG9zaXRpb24gPSBmdW5jdGlvbihlbnRpdHkpIHtcclxuLy9lbnRpdHkgbW92ZW1lbnRcclxuICAgIGVudGl0eS54ICs9IGVudGl0eS5zcGRYO1xyXG4gICAgZW50aXR5LnkgKz0gZW50aXR5LnNwZFk7XHJcbi8vIGNvbnNvbGUubG9nKGAke2VudGl0eX0gbW92aW5nYCwgeCk7XHJcbi8vY29sbGlzaW9uIGRldGVjdGlvbiB0byBjaGFuZ2UgdGhlIGRpcmVjdGlvbiBvZiBlbnRpdHkgd2hlbiBpdCBoaXRzIHRoZSBib3VuZGFyaWVzXHJcbiAgICBpZihlbnRpdHkueCA8IDAgfHwgZW50aXR5LnggPiB3aWR0aCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdPdXQgb2YgQm91bmRzJyk7XHJcbiAgICAgICAgZW50aXR5LnNwZFggPSAtZW50aXR5LnNwZFg7XHJcbiAgICB9XHJcbiAgICBpZihlbnRpdHkueSA8IDAgfHwgZW50aXR5LnkgPiBoZWlnaHQpIHtcclxuICAgICAgICBlbnRpdHkuc3BkWSA9IC1lbnRpdHkuc3BkWTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgdGVzdENvbGxpc2lvblJlY3RSZWN0ID0gZnVuY3Rpb24ocmVjdDEsIHJlY3QyKSB7XHJcbiAgICByZXR1cm4gcmVjdDEueCA8PSByZWN0Mi54ICsgcmVjdDIud2lkdGhcclxuICAgICAgICAmJiByZWN0Mi54IDw9IHJlY3QxLnggKyByZWN0MS53aWR0aFxyXG4gICAgICAgICYmIHJlY3QxLnkgPD0gcmVjdDIueSArIHJlY3QyLmhlaWdodFxyXG4gICAgICAgICYmIHJlY3QyLnkgPD0gcmVjdDEueSArIHJlY3QxLmhlaWdodDtcclxufSBcclxuXHJcbi8vZHJhd3MgZW50aXRpZXMgYXMgcmVjdGFuZ2xlc1xyXG5jb25zdCBkcmF3RW50aXR5ID0gZnVuY3Rpb24oZW50aXR5KSB7XHJcbiAgICBjdHguc2F2ZSgpOy8vc2F2ZXMgdGhlIHN0eWxlc1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9IGVudGl0eS5jb2xvcjtcclxuICAgIGN0eC5maWxsUmVjdChlbnRpdHkueCAtIGVudGl0eS53aWR0aC8yLCBlbnRpdHkueSAtIGVudGl0eS5oZWlnaHQvMiwgZW50aXR5LndpZHRoLCBlbnRpdHkuaGVpZ2h0KTtcclxuICAgIGN0eC5yZXN0b3JlKCk7XHJcbn1cclxuXHJcbmNvbnN0IHVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xyXG4vLyBjbGVhcnMgcmVjdGFuZ2xlIGluIGNhbnZhcyBzbyB0aGUgZmlsbFRleHQgZG9lc24ndCBqdXN0IHJlcGVhdFxyXG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgIGZyYW1lQ291bnQrKztcclxuICAgIHNjb3JlKys7XHJcblxyXG4gICAgaWYoZnJhbWVDb3VudCAlIDEwMCA9PT0gMCkgLy91cGRhdGVzIGV2ZXJ5IDRzZWNcclxuICAgICAgICByYW5kb21seUdlbmVyYXRlRW5lbXkoKTtcclxuICAgIGlmIChmcmFtZUNvdW50ICUgNzUgPT09IDApIC8vdXBkYXRlcyBldmVyeSAzc2VjXHJcbiAgICAgICAgcmFuZG9tbHlHZW5lcmF0ZVVwZ3JhZGUoKTtcclxuICAgIGlmIChmcmFtZUNvdW50ICUgTWF0aC5yb3VuZCgyNS9wbGF5ZXIuYXR0YWNrU3BlZWQpID09PSAwKSAvL3VwZGF0ZXMgZXZlcnkgMXNlY1xyXG4gICAgICAgIHJhbmRvbWx5R2VuZXJhdGVCdWxsZXQoKTtcclxuXHJcbiAgICBmb3IobGV0IGtleSBpbiBidWxsZXRMaXN0KSB7XHJcbiAgICAgICAgdXBkYXRlRW50aXR5KGJ1bGxldExpc3Rba2V5XSk7XHJcblxyXG4gICAgICAgIGxldCB0b1JlbW92ZSA9IGZhbHNlO1xyXG4gICAgICAgIGJ1bGxldExpc3Rba2V5XS50aW1lcisrO1xyXG4gICAgICAgIGlmKGJ1bGxldExpc3Rba2V5XS50aW1lciA+IDc1KSB7XHJcbiAgICAgICAgICAgIHRvUmVtb3ZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcihsZXQga2V5MiBpbiBlbmVteUxpc3Qpe1xyXG4gICAgICAgICAgICBsZXQgY29sbGlzaW9uID0gdGVzdENvbGxpc2lvbihidWxsZXRMaXN0W2tleV0sIGVuZW15TGlzdFtrZXkyXSk7XHJcbiAgICAgICAgICAgIGlmIChjb2xsaXNpb24pe1xyXG4gICAgICAgICAgICAgICAgdG9SZW1vdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGVuZW15TGlzdFtrZXkyXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRvUmVtb3ZlKXtcclxuICAgICAgICAgICAgZGVsZXRlIGJ1bGxldExpc3Rba2V5XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9yKGxldCBrZXkgaW4gdXBncmFkZUxpc3QpIHtcclxuICAgICAgICB1cGRhdGVFbnRpdHkodXBncmFkZUxpc3Rba2V5XSk7XHJcbiAgICAgICAgY29uc3QgY29sbGlzaW9uID0gdGVzdENvbGxpc2lvbihwbGF5ZXIsIHVwZ3JhZGVMaXN0W2tleV0pO1xyXG4gICAgICAgIGlmKGNvbGxpc2lvbikge1xyXG4gICAgICAgICAgICBpZiAodXBncmFkZUxpc3Rba2V5XS5jYXRlZ29yeSA9PT0gXCJzY29yZVwiKVxyXG4gICAgICAgICAgICAgICAgc2NvcmUgKz0gMTAwMDtcclxuICAgICAgICAgICAgaWYgKHVwZ3JhZGVMaXN0W2tleV0uY2F0ZWdvcnkgPT09IFwiYXR0YWNrU3BlZWRcIilcclxuICAgICAgICAgICAgICAgIHBsYXllci5hdHRhY2tTcGVlZCArPSAzO1xyXG4gICAgICAgICAgICBkZWxldGUgdXBncmFkZUxpc3Rba2V5XS8vcmVtb3ZlcyB1cGdyYWRlIGZyb20gRE9NXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL2xvb3AgdGhyb3VnaCBlbmVteUxpc3QgdG8gdXBkYXRlIGVuZW1pZXNcclxuICAgIGZvciAobGV0IGtleSBpbiBlbmVteUxpc3QpIHtcclxuICAgICAgICB1cGRhdGVFbnRpdHkoZW5lbXlMaXN0W2tleV0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGNvbGxpc2lvbiA9IHRlc3RDb2xsaXNpb24ocGxheWVyLCBlbmVteUxpc3Rba2V5XSk7XHJcbiAgICAgICAgaWYoY29sbGlzaW9uKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29sbGlzaW9uIVwiKTtcclxuICAgICAgICAgICAgcGxheWVyLmhwIC09IDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmKHBsYXllci5ocCA8PSAwKSB7XHJcbiAgICAgICAgbGV0IHRpbWVTdXJ2aXZlZCA9IERhdGUubm93KCkgLSB0aW1lV2hlbkdhbWVTdGFydGVkO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiWW91IGxvc3QhIFlvdSBzdXJ2aXZlZCBmb3IgXCIrIHRpbWVTdXJ2aXZlZCArIFwiIG1zLlwiKTtcclxuICAgICAgICB0aW1lV2hlbkdhbWVTdGFydGVkID0gRGF0ZS5ub3coKTtcclxuICAgICAgICBzdGFydE5ld0dhbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3RW50aXR5KHBsYXllcik7XHJcbiAgICBjdHguZmlsbFRleHQocGxheWVyLmhwICsgXCJIUFwiLCAwLCAzMCk7XHJcbiAgICBjdHguZmlsbFRleHQoXCJTY29yZTogXCIgKyBzY29yZSwgMjAwLCAzMCk7XHJcblxyXG59XHJcblxyXG5jb25zdCBzdGFydE5ld0dhbWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBwbGF5ZXIuaHAgPSAxMDtcclxuICAgIHRpbWVXaGVuR2FtZVN0YXJ0ZWQgPSBEYXRlLm5vdygpO1xyXG4gICAgZnJhbWVDb3VudCA9IDA7XHJcbiAgICBzY29yZSA9IDA7XHJcbiAgICBlbmVteUxpc3QgPSB7fTtcclxuICAgIHVwZ3JhZGVMaXN0ID0ge307XHJcbiAgICBidWxsZXRMaXN0ID0ge307XHJcbiAgICByYW5kb21seUdlbmVyYXRlRW5lbXkoKTtcclxuICAgIHJhbmRvbWx5R2VuZXJhdGVFbmVteSgpO1xyXG4gICAgcmFuZG9tbHlHZW5lcmF0ZUVuZW15KCk7XHJcbn1cclxuXHJcblxyXG5cclxuc3RhcnROZXdHYW1lKCk7XHJcblxyXG5zZXRJbnRlcnZhbCh1cGRhdGUsIDQwKTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgIC8qXHRDb21tZW50IFNlY3Rpb25cclxuICAgIFxyXG4gICAgLy8xLiBNb2RpZnkgU2V0dGluZ3MgPVxyXG4gICAgY3R4LmZvbnQgPSAnMzBweCBBcmlhbCc7XHQvL0ZvbnQgdXNlZFxyXG4gICAgY3R4LmZpbGxTdHlsZSA9ICdyZWQnO1x0XHQvL0NvbG9yIG9mIHRoZSB0ZXh0IGFuZCBmb3Jtc1xyXG4gICAgY3R4Lmdsb2JhbEFscGhhID0gMC41O1x0XHQvL1RyYW5zcGFyZW5jeSAwID0gaW52aXNibGUsIDEgPSB2aXNpYmxlXHJcbiAgICBcclxuICAgIC8vMi4gRHJhdyBzb21ldGhpbmcgKClcclxuICAgIGN0eC5maWxsVGV4dCgnSGVsbG8nLDUwLDUwKTtcdC8vV3JpdGUgdGV4dCAuLi4gY3R4LmZpbGxUZXh0KCd0ZXh0Jyx4LHkpO1xyXG4gICAgY3R4LmZpbGxSZWN0KDUwLDUwLDEwMCwxMDApO1x0XHQvL0RyYXcgcmVjdGFuZ2xlIC4uLiBjdHguZmlsbFJlY3Qoc3RhcnRYLHN0YXJ0WSx3aWR0aCxoZWlnaHQpO1xyXG4gICAgY3R4LmNsZWFyUmVjdCg3NSw3NSwxMDAsMTAwKTtcdFx0Ly9DbGVhciBDYW52YXMgLi4uIGN0eC5maWxsUmVjdChzdGFydFgsc3RhcnRZLHdpZHRoLGhlaWdodCk7XHJcbiAgICBcclxuICAgIHggKz0gc3BkWDsgXHRzYW1lIHRoYW5cdHggPSB4ICtzcGRYXHJcbiAgICBcclxuICAgIERlYnVnZ2VyOlxyXG4gICAgRjEyXHJcbiAgICBCcmVha3BvaW50ID0gQ29kZSBzdG9wcyB3aGVuIHJlYWNoZXMgdGhpcyBsaW5lIGlmIGNvbnNvbGUgaXMgb3BlbmVkXHJcbiAgICBDb25zb2xlID0gR2V0IHRoZSB2YWx1ZSBvZiB2YXJpYWJsZSArIE1lc3NhZ2Ugd2l0aCBjb25zb2xlLmxvZygndGV4dCcpO1xyXG4gICAgXHJcbiAgICBFbmQgb2YgQ29tbWVudCBTZWN0aW9uICovXHJcbiAgICBcclxuICAgIFxyXG4vLyA8L3NjcmlwdD4iXX0=
