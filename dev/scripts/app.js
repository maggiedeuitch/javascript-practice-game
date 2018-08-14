console.log("linked");

// <script>
const ctx = document.getElementById("ctx").getContext("2d");
ctx.font = '30px Arial';
const height = 500;
const width = 500;

//returns time in milliseconds
let timeWhenGameStarted = Date.now();
// var message = 'Bouncing';

const player = {
    x : 50,
    spdX : 30,
    y : 40,
    spdY : 5,
    name : "P",
    hp: 10,
    width: 20,
    height: 20,
    color:"green"
};
//enemyList stores all the enemies in an object
let enemyList = {};


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

//moves player (x and y) with mouse
document.onmousemove = function(mouse) {
    let mouseX = mouse.clientX;
    let mouseY = mouse.clientY;

    player.x = mouseX;
    player.y = mouseY;
}


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

const update = function() {
// clears rectangle in canvas so the fillText doesn't just repeat
    ctx.clearRect(0, 0, width, height);


    //loop through enemyList to update enemies
    for (let key in enemyList) {
        updateEntity(enemyList[key]);
        
        const collision = testCollision(player, enemyList[key]);
        if(collision) {
            console.log("collision!");
            player.hp -= 1;
            if(player.hp <= 0) {
                let timeSurvived = Date.now() - timeWhenGameStarted;
                console.log("You lost! You survived for "+ timeSurvived + " ms.");
                timeWhenGameStarted = Date.now();
                player.hp = 10;
                

            }
            
        }
    }

    drawEntity(player);
    ctx.fillText(player.hp + "HP", 0, 30);


}


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