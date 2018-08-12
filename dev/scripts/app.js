console.log("linked");

    // <script>
        const ctx = document.getElementById("ctx").getContext("2d");
        ctx.font = '30px Arial';
        const height = 500;
        const width = 500;
        // var message = 'Bouncing';
        
        let player = {
            x : 50,
            spdX : 30,
            y : 40,
            spdY : 5,
            name : "P",
        };

        let enemy = {
            x : 150,
            spdX : 10,
            y : 350,
            spdY : 15,
            name : "E"
        };

        let enemy2 = {
            x : 250,
            spdX : 10,
            y : 450,
            spdY : 15,
            name : "E"
        };

        setInterval(update, 40);
        
        function updateEntity (entity) {
        //entity movement
            entity.x += entity.spdX;
            entity.y += entity.spdY;
            ctx.fillText(entity.name, entity.x, entity.y);
            // console.log(`${entity} moving`, x);
        //collision detection to change the direction of entity when it hits the boundaries
            if(entity.x < 0 || entity.x > width) {
                console.log('Out of Bounds');
                entity.spdX = -entity.spdX;
            }
            if(entity.y < 0 || entity.y > height) {
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