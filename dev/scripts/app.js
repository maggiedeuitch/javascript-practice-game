console.log("linked");

    // <script>
        const ctx = document.getElementById("ctx").getContext("2d");
        ctx.font = '30px Arial';
        const height = 500;
        const width = 500;
        // var message = 'Bouncing';
        
        // player 
        let x = 50;
        let spdX = 30;
        let y = 40;
        let spdY = 5;
        const name = 'P';


        let enemy_x = 150;
        let enemy_spdX = 10;
        let enemy_y = 350;
        let enemy_spdY = 15;
        let enemy_name = 'E';
        
        setInterval(update, 80);
        
    function update() {
    //player movement
        x += spdX;
        y += spdY;
        ctx.fillText(name, x, y);
        console.log("player moving", x);
    //collision detection to change the direction of player when it hits the boundaries
        if(x < 0 || x > width) {
            console.log('Out of Bounds');
            spdX = -spdX;
        }
        if(y < 0 || y > height) {
            spdY = -spdY;
        }
    
    //enemy movement
        enemy_x += enemy_spdX;
        enemy_y += enemy_spdY;
        ctx.fillText(enemy_name, enemy_x, enemy_y);
        console.log("enemy moving", enemy_x);

    //enemy collision to change direction when it hits the boundaries
        if(enemy_x < 0 || enemy_x > width) {
            enemy_spdX = -enemy_spdX;
        }
        if(enemy_y < 0 || enemy_y > height) {
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