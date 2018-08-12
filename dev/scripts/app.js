console.log("linked");

// <script>
const ctx = document.getElementById("ctx").getContext("2d");
ctx.font = '30px Arial';
const height = 500;
const width = 500;
// var message = 'Bouncing';

const player = {
    x : 50,
    spdX : 30,
    y : 40,
    spdY : 5,
    name : "P"
};
//enemyList stores all the enemies in an object
let enemyList = {};

const enemy = {
    x : 150,
    spdX : 10,
    y : 350,
    spdY : 15,
    name : "E",
    id: "E1"
};
//create the first item in enemyList
enemyList["E1"] = enemy;

const enemy2 = {
    x : 250,
    spdX : 10,
    y : 450,
    spdY : 15,
    name : "E",
    id: "E2"
};

enemyList["E2"] = enemy2;
console.log(enemyList);

const enemy3 = {
    x : 230,
    spdX : 5,
    y : 70,
    spdY : -8,
    name : "E",
    id: "E3"
};

enemyList["E3"] = enemy3;
console.log(enemyList);

setInterval(update, 40);

function updateEntity (entity) {
//entity movement
    entity.x += entity.spdX;
    entity.y += entity.spdY;
    ctx.fillText(entity.name, entity.x, entity.y);
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

function update() {
// clears rectangle in canvas so the fillText doesn't just repeat
    ctx.clearRect(0, 0, width, height);

    updateEntity(player);

    //loop through enemyList to update enemies
    for (let key in enemyList) {
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