console.log("linked");

//creates canvas in DOM
const ctx = document.getElementById("ctx").getContext("2d");
ctx.font = '30px Arial';
const height = 500;
const width = 500;

//returns time in milliseconds
let timeWhenGameStarted = Date.now();

//every time game is updated, framecount is updated by 1
let frameCount = 0;

let score = 0;

const player = {
    x : 50,
    spdX : 30,
    y : 40,
    spdY : 5,
    name : "P",
    hp: 10,
    width: 20,
    height: 20,
    color:"green",
    attackSpeed: 1,
    attackCounter: 0,

    //user keyboard interaction
    pressingDown: false,
    pressingUp: false,
    pressingLeft: false,
    pressingRight: false

};
//enemyList stores all the enemies in an object
let enemyList = {};
let upgradeList = {};
let bulletList = {};



//Distance Formula and Pythagorean Theorem
const getDistanceBetweenEntities = function(entity1, entity2) {
    //return distance(number)
    let vx = entity1.x - entity2.x;
    let vy = entity1.y - entity2.y;
    return Math.sqrt(vx*vx + vy*vy);
}

const testCollision = function(entity1, entity2) {
    //return if colliding (true/false)
    const rect1 = {
        x: entity1.x - entity1.width/2,
        y: entity1.y - entity1.height/2,
        width: entity1.width,
        height: entity1.height
    }
    const rect2 = {
        x: entity2.x - entity2.width/2,
        y: entity2.y - entity2.height/2,
        width: entity2.width,
        height: entity2.height
    }

    return testCollisionRectRect(rect1, rect2);

}


//function that creates a new enemy and adds to enemyList
const enemy = function(id, x, y, spdX, spdY, width, height) {
    let enemy1 = {
        x:x,
        spdX: spdX,
        y:y,
        spdY:spdY,
        name: "E",
        id:id,
        width: width,
        height: height,
        color: "red"
    };
    //create the item in enemyList
    enemyList[id] = enemy1;
}

const randomlyGenerateEnemy = function () {
    let x = Math.random() * width;
    let y = Math.random() * height;
    let spdX = 5 + Math.random() * 5;
    let spdY = 5 + Math.random() * 5;
    let enemyHeight = 10 + Math.random() * 30;
    let enemyWidth = 10 + Math.random() * 30;
    let id = Math.random();
    enemy(id, x, y, spdX, spdY, enemyWidth, enemyHeight);
}

//UPGRADE ENTITIES
const upgrade = function (id, x, y, spdX, spdY, width, height, category, color) {
    let upgrade1 = {
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
}

const randomlyGenerateUpgrade = function () {
    let x = Math.random() * width;
    let y = Math.random() * height;
    let spdX = 0;
    let spdY = 0;
    let upgradeHeight = 10;
    let upgradeWidth = 10;
    let id = Math.random();

    let category;
    let color; 

    if(Math.random() < 0.5) {
        category = "score";
        color = "orange";
    } else {
        category = "attackSpeed";
        color = "purple";
    }
    //randomly creates either a score upgrade or attackSpeed upgrade
    upgrade(id, x, y, spdX, spdY, upgradeWidth, upgradeHeight, category, color);
}

//BULLET ENTITIES
const bullet = function (id, x, y, spdX, spdY, width, height) {
    let bullet1 = {
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
        timer:0
    };
    //create the item in upgradeList
    bulletList[id] = bullet1;
}

const randomlyGenerateBullet = function () {
    let x =player.x;
    let y = player.y;
    let bulletHeight = 10;
    let bulletWidth = 10;
    let id = Math.random();

    let angle = Math.random()*360;
    //converts degrees into radians
    let spdX = Math.cos(angle/180*Math.PI)*5;
    let spdY = Math.sin(angle/180*Math.PI)*5;
    bullet(id, x, y, spdX, spdY, bulletWidth, bulletHeight);
}





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


const updateEntity = function(entity) {
    updateEntityPosition(entity);
    drawEntity(entity);
}


const updateEntityPosition = function(entity) {
//entity movement
    entity.x += entity.spdX;
    entity.y += entity.spdY;
// console.log(`${entity} moving`, x);
//collision detection to change the direction of entity when it hits the boundaries
    if(entity.x < 0 || entity.x > width) {
        // console.log('Out of Bounds');
        entity.spdX = -entity.spdX;
    }
    if(entity.y < 0 || entity.y > height) {
        entity.spdY = -entity.spdY;
    }
}

const testCollisionRectRect = function(rect1, rect2) {
    return rect1.x <= rect2.x + rect2.width
        && rect2.x <= rect1.x + rect1.width
        && rect1.y <= rect2.y + rect2.height
        && rect2.y <= rect1.y + rect1.height;
} 

//draws entities as rectangles
const drawEntity = function(entity) {
    ctx.save();//saves the styles
    ctx.fillStyle = entity.color;
    ctx.fillRect(entity.x - entity.width/2, entity.y - entity.height/2, entity.width, entity.height);
    ctx.restore();
}

//user shoots bullets on mouse click
document.onclick = function(mouse){
    if(player.attackCounter > 25) {
        randomlyGenerateBullet();
        player.attackCounter = 0;
    }
}

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
}

document.onkeyup = function(event) {
    if (event.keyCode === 68) //d
        player.pressingRight = false;
    if (event.keyCode === 83) //s
        player.pressingDown = false;
    if (event.keyCode === 65) //a
        player.pressingLeft = false;
    if (event.keyCode === 87) //w
        player.pressingUp = false;
}

const updatePlayerPosition = function() {
    if(player.pressingRight)
        player.x += 10;
    if (player.pressingLeft)
        player.x += -10;
    if (player.pressingDown)
        player.y += 10;
    if (player.pressingUp)
        player.y += -10;

//out of bounds for player
if(player.x < player.width/2)
    player.x = player.width/2;
if (player.x > width - player.width / 2)
    player.x = width - player.width / 2;
if (player.y < player.height / 2)
    player.y = player.height / 2;
if (player.y > height - player.height / 2)
    player.y = height - player.height / 2;
}

const update = function() {
// clears rectangle in canvas so the fillText doesn't just repeat
    ctx.clearRect(0, 0, width, height);
    frameCount++;
    score++;

    if(frameCount % 100 === 0) //updates every 4sec
        randomlyGenerateEnemy();
    if (frameCount % 75 === 0) //updates every 3sec
        randomlyGenerateUpgrade();
    
    player.attackCounter += player.attackSpeed;

    for(let key in bulletList) {
        updateEntity(bulletList[key]);

        let toRemove = false;
        bulletList[key].timer++;
        if(bulletList[key].timer > 75) {
            toRemove = true;
        }

        for(let key2 in enemyList){
            let collision = testCollision(bulletList[key], enemyList[key2]);
            if (collision){
                toRemove = true;
                delete enemyList[key2];
                break;
            }
        }
        if(toRemove){
            delete bulletList[key];
        }
    }

    for(let key in upgradeList) {
        updateEntity(upgradeList[key]);
        const collision = testCollision(player, upgradeList[key]);
        if(collision) {
            if (upgradeList[key].category === "score")
                score += 1000;
            if (upgradeList[key].category === "attackSpeed")
                player.attackSpeed += 3;
            delete upgradeList[key]//removes upgrade from DOM
        }
    }


    //loop through enemyList to update enemies
    for (let key in enemyList) {
        updateEntity(enemyList[key]);
        
        const collision = testCollision(player, enemyList[key]);
        if(collision) {
            console.log("collision!");
            player.hp -= 1;
        }
    }

    if(player.hp <= 0) {
        let timeSurvived = Date.now() - timeWhenGameStarted;
        console.log("You lost! You survived for "+ timeSurvived + " ms.");
        timeWhenGameStarted = Date.now();
        startNewGame();
    }
    updatePlayerPosition();
    drawEntity(player);
    ctx.fillText(player.hp + "HP", 0, 30);
    ctx.fillText("Score: " + score, 200, 30);

}

const startNewGame = function () {
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
}



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