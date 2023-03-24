//This variable keeps track of whose turn it is.
let activePlayer = 'X';
//This aray stores an array of moves. We use this to determine the win conditions. 
let selectedSquares = [];

//This function is for placing an x or o in a square.
function placeXOrO(squareNumber) {
    //This condition ensures a square hasn't been selected already.
    //The .some() method is used to check each element of the selectSquare array
    //to see if it contains the square number clicked on.
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        //This variable retrieves the HTML element id that was clicked.
        let select = document.getElementById(squareNumber);
        //This condition check's who's turn it is.
        if (activePlayer === 'X') {
            //if activeplayer is equal to X, the x.png is placed in HTML
            select.style.backgroundImage = 'url("images/x.png")';
            //Active player may only be 'X' or 'O' so, if not 'X' it must be 'O'
        } else {
            //If activePlayer is equal to 'O', the o.png is placed in HTML
            select.style.backgroundImage = 'url("images/o.png")';
        }
        //squareNumber and activePlayer are concatenated together and added to array.
        selectedSquares.push(squareNumber + activePlayer);
        //This calls a function to check for any win conditions.
        checkWinConditions();
        //This condition is for changing the active player.
        if (activePlayer === 'X') {
            //If active player is 'X' change it to 'O'.
            activePlayer = 'O';
            //if active player is anything other than 'X'
        } else {
            //change the active player to 'X'
            activePlayer = 'X';
        }
        //This function plays placement sound. 
        audio('./media/place.mp3');
        //This conditon checks to see if it is the computers turn.
        if (activePlayer === 'O') {
            //This function disables clicking for computers turn.
            disableClick();
            //This function waits 1 second before the computer places an image and enables click.
            setTimeout(function () { computersTurn(); }, 1000);
        }
        //Returning true is needed for our computersTurn() function to work
        return true;
    }
    //This function results in a random square being selected by the computer. 
    function computersTurn() {
        //This boolean s needed for our while loop.
        let success = false;
        //This variable stores a random number 0-8.
        let pickaSquare;
        //This condition allows our while loop to keep trying if a square is selected already.
        while (!success) {
            //A random number between 0 and 8 is selected.
            pickaSquare = String(Math.floor(Math.random() * 9));
            //if the random number evaluated returns true, the square hasn't been selected yet.
            if (placeXOrO(pickaSquare)) {
                //This line calls a function.
                placeXOrO(pickaSquare);
                //This changes our boolean and ends the loop.
                success = true;
            };
        }
    }
}

//This function parses the selectedSquares array to search for win conditions.
//drawline() function is called to draw a line on the screen if the condition is met. 
function checkWinConditions() {
    // all conditions
    if (arrayIncludes('0X', '1X', '2X')) { drawWinLine(50, 100, 558, 100) }
    else if (arrayIncludes('3X', '4X', '5X')) { drawWinLine(50, 304, 558, 304) }
    else if (arrayIncludes('6X', '7X', '8X')) { drawWinLine(50, 508, 558, 508) }
    else if (arrayIncludes('0X', '3X', '6X')) { drawWinLine(100, 50, 100, 558) }
    else if (arrayIncludes('1X', '4X', '7X')) { drawWinLine(304, 50, 304, 558) }
    else if (arrayIncludes('2X', '5X', '8X')) { drawWinLine(508, 50, 508, 558) }
    else if (arrayIncludes('6X', '4X', '2X')) { drawWinLine(100, 508, 510, 90) }
    else if (arrayIncludes('0X', '4X', '8X')) { drawWinLine(100, 100, 520, 520) }
    else if (arrayIncludes('0O', '1O', '2O')) { drawWinLine(50, 100, 558, 100) }
    else if (arrayIncludes('3O', '4O', '5O')) { drawWinLine(50, 304, 558, 304) }
    else if (arrayIncludes('6O', '7O', '8O')) { drawWinLine(50, 508, 558, 508) }
    else if (arrayIncludes('0O', '3O', '6O')) { drawWinLine(100, 50, 100, 558) }
    else if (arrayIncludes('1O', '4O', '7O')) { drawWinLine(304, 50, 304, 558) }
    else if (arrayIncludes('2O', '5O', '8O')) { drawWinLine(508, 50, 508, 558) }
    else if (arrayIncludes('6O', '4O', '2O')) { drawWinLine(100, 508, 510, 90) }
    else if (arrayIncludes('0O', '4O', '8O')) { drawWinLine(100, 100, 520, 520) }
    //condition checks for a tie if none of the conditions above are met and 
    //9 squares are selected the code executes
    else if (selectedSquares.length >= 9) {
        //game sound
        audio('./media/tie.mp3');
        //function sets .3 second timer before the restGame is called
        setTimeout(function () { resetGame(); }, 500);
    }
    //function checks if an array includes 3 strings. it is used to check for
    //each win conditions
    function arrayIncludes(squareA, squareB, squareC) {
        //these 3 variables will be used to check for 3 in a row
        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);
        //if the 3 variables we pass are all included in our array then
        // true is a returned and our else if condition executes the drawLine() function
        if (a === true && b === true && c === true) { return true; }
    }
}
//function makes our body element temperarily unclickable.
function disableClick() {
    //makes our body unclickable
    body.style.pointerEvents = 'none';
    //makes our body clickable again after 1 second
    setTimeout(function () { body.style.pointerEvents = 'auto'; }, 1000);
}
//functione takes a string parameter of the path you set earlier for
//placement sound('./media/place.mp3')
function audio(audioURL) {
    //we create a new audio object and we pass the path as a parameter
    let audio = new Audio(audioURL);
    //play method plays our audio sound.
    audio.play();
}
//function utilizes HTML canvas to draw win lines
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    //line accesses our HTML canvas element
    const canvas = document.getElementById('win-lines');
    //line gives us access to methods and properties to use on canvas
    const c = canvas.getContext('2d');
    //line indicates where the start of a lines x axis is
    let x1 = coordX1,
        // line indicates where the start of a lines y axis is
        y1 = coordY1,
        // line indicates where the end of a lines x axis is
        x2 = coordX2,
        // line indicates where the end of a lines y axis is
        y2 = coordY2,
        // variable stores temporary x axis data we update in our animation loop
        x = x1,
        // variable stores temporary y axis data we update in our animation loop
        y = y1;
    // function interacts with the canvas
    function animateLineDrawing() {
        // variable creates loop
        const animationLoop = requestAnimationFrame(animateLineDrawing);
        // this method clears content form the last loop iteration
        c.clearRect(0, 0, 608, 608);
        //this method starts a new path
        c.beginPath();
        //this method moves us to a starting point in our line
        c.moveTo(x1, y1);
        //this method indicates the end point in our line
        c.lineTo(x, y)
        //this method sets the width of our line
        c.lineWidth = 20;
        //this method sets the color of our line
        c.strokeStyle = 'rgba(207, 179, 2)';
        //this method draws everything we laid out
        c.stroke();
        //this condition checks if we have reached the endpoints
        if (x1 <= x2 && y1 <= y2) {
            //condition adds 10 to the previous end x endpoint
            if (x < x2) { x += 10; }
            //condition adds 10 to the previous end y endpoint
            if (y < y2) { y += 10; }
            //this condition is similar to the one above
            //this is necessary got the 6, 4, 2, win conditions
            if (x >= x2 && y >= y2) { cancelAnimationFrame(animationLoop); }
        }

        //this condition is similar to the one above
        //this is necessary for the 6, 4, 2 win condition
        if (x1 <= x2 && y1 >= y2) {
            if (x < x2) { x += 10; }
            if (y > y2) { y -= 10; }
            if (x >= x2 && y <= y2) { cancelAnimationFrame(animationLoop); }
        }
    }
    //this functon clears our canvas after our win line is drawn
    function clear() {
        //this line starts our loop
        const animationLoop = requestAnimationFrame(clear);
        //line clears our canvas
        c.clearRect(0, 0, 608, 608);
        //line stops our animation loop
        cancelAnimationFrame(animationLoop);
    }
    //This line disallows clicking while the win sound is playing
    disableClick();
    //line plays the win sounds
    audio('./media/winGame.mp3')
    //line calls our main animation loop
    animateLineDrawing();
    //This line waits 1 second. then, clears canvas, resets game, and allows clicking again
    setTimeout(function () { clear(); resetGame(); }, 1000);
}
//function resets the game in the event of a tie or a win
function resetGame() {
    //this for loop iterates through each HTML square element
    for (let i = 0; i < 9; i++) {
        //this variable gets the HTML element i
        let square = document.getElementById(String(i));
        //this removes our elements backgroundImage
        square.style.backgroundImage = '';
    }
    //this resets our array so it is empty and we can start over
    selectedSquares = [];
}
