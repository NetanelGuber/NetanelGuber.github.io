// Name: Netanel Guber
// Date: January 14, 2025
// Course: ICD2O1-02 / ICD2O1-03
// Description: Creates a popup destroyer game where you have to close popups infinetly and not lose

// Initializing game variables
let popupList = [];
let popupAmount = 0;
let closedPopups = 0;
let cooldownTimer = 0;
let ramLeft = 6000;

let backgroundImg;
let endBackgroundImg;

let gameRunning = true;
let counter = 0;
let counter2 = 0;
let counterStarted = false;
let counter2Started = false;
let percentage = 0;
let transparency = 0;
let highscore = 0;
let createdScorePopup = false;
let quitting = false;
let gaming = false;

let rotSpeed = 3;
let rotation = 0;

let state = "menu";

function setup() {
  createCanvas(800, 500); // Sets canvas to be 800x500
  
  angleMode(DEGREES); // When rotating, use degrees
  
  cooldownTimer = millis(); // start a timer to be used in the game
}

function preload() {
  backgroundImg = loadImage("./windowsBackground.jpg"); // Load the background image
  endBackgroundImg = loadImage("./BSOD.png"); // Load the windows BSOD
}

function draw() {
  textAlign(CENTER, CENTER); // Sets text to be drawn in the middle
  
  // Depending on the state, call a specific function
  if (state == "game") {
    game();
  } else if (state == "end") {
    end();
  } else if (state == "loading") {
    loadingScreen();
  } else if (state == "menu") {
    mainMenu();
  } else if (state == "info") {
    guide();
  }
}

// Function to show the game instructions
function guide() {
  image(backgroundImg, 0, 0, 800, 500); // Draws the background
  
  // Loop to draw evey popup in the popup list
  for (let i = 0; i <= popupList.length + 1; i += 16) {
    drawPopup(popupList[i + 1], popupList[i + 2], popupList[i + 3], popupList[i + 4], popupList[i + 5], popupList[i + 6], popupList[i + 7], popupList[i + 8], popupList[i + 9], popupList[i + 10], popupList[i + 11]);
  }
  
  // if havent already drawn instructions popup, add all info to the list
  if (!createdScorePopup) {
    popupList.push(1); // Button ID
    popupList.push(50); // X
    popupList.push(50); // y
    popupList.push(700); // popupWidth
    popupList.push(400); // popupHeight
    popupList.push(187); // Close X Position
    popupList.push(0); // Close Y Position
    popupList.push(0); // Fail x pos
    popupList.push(0); // fail y pos
    popupList.push("menu"); // type
    popupList.push("top"); // top bar orientation
    popupList.push(50); // top bar height
    popupList.push(250/4); // Close Button Width
    popupList.push(50); // Close Button Height
    popupList.push(187 + 500); // Close X Position REAL
    popupList.push(100); // Close Y Position REAL  
      
    createdScorePopup = true; // set to true after created popup
  }
  
  // draw white text aligned to the left top of the instructions
  fill(255);
  textAlign(LEFT, TOP);
  noStroke();
  textSize(19);
  text("Oh no, your computer was infected!\nPressing the PopupDestroyer game in the main menu is the only way to destroy it.\nIn the game random popups will appear all over the screen.\nYou will have to close them by pressing the red X on the top right.\nYou will have 6GB of RAM displayed at the top of your screen.\nEvery popup takes up 500MB of RAM and if you let the RAM get to 0 you lose.\nThe more popups you close, the faster they will appear.\nBut that isn't the only thing that happens when you progress through the game.\nThe popups will try to trick you by changing the position of the red X.\nAt some point popups will appear with checkmarks.\nIf pressed the game will spawn 2 popups as a penalty.\nAdditionally, sometimes the color of the X and checkbox are swapped to trick you.\nLeft click to go back to the main menu and play.\nGood Luck!", 60, 115);
}

// Function to draw the main menu
function mainMenu() {
  image(backgroundImg, 0, 0, 800, 500); // Draws the background
  
  // Loop to draw all popups in the popupList
  for (let i = 0; i <= popupList.length + 1; i += 16) {
    drawPopup(popupList[i + 1], popupList[i + 2], popupList[i + 3], popupList[i + 4], popupList[i + 5], popupList[i + 6], popupList[i + 7], popupList[i + 8], popupList[i + 9], popupList[i + 10], popupList[i + 11]);
  }
    
  // If havent already drawn highscore popup, draw it
  if (!createdScorePopup) {
    popupList.push(1); // Button ID
    popupList.push(500); // X
    popupList.push(100); // Y
    popupList.push(250); // popupWidth
    popupList.push(250); // popupHeight
    popupList.push(187); // Close X Position
    popupList.push(0); // Close Y Position
    popupList.push(0); // Fail x pos
    popupList.push(0); // fail y pos
    popupList.push("menu"); // type
    popupList.push("top"); // top bar orientation
    popupList.push(50); // top bar height
    popupList.push(250/4); // Close Button Width
    popupList.push(50); // Close Button Height
    popupList.push(187 + 500); // Close X Position REAL
    popupList.push(100); // Close Y Position REAL  
      
    createdScorePopup = true; // Say that the popup has been created
  }
  
  // If the amount of popups you closed from last game is bigger than your high score
  // set the new high score to your score from last game
  if (closedPopups > highscore) {
    highscore = closedPopups;
  }
  
  // Says the player score and the play highscore on the popup
  fill(255);
  textSize(17.5);
  text("Popups Destroyed Highscore\n" + highscore, 625, 205);
  text("Popups Destroyed\n" + closedPopups, 625, 275);
  
  // Draws the icons for playing, instructions, and leaving
  textSize(50);
  noStroke();
  text("💀     📕     ❌", 225, 225);
  
  // Draws text under icons
  textSize(16);
  fill(0);
  text("PopupDestroyer", 85, 265);
  text("Instructions", 225, 265);
  text("Shutdown", 365, 265);
  
  // Draws the bar at the bottom of the screen
  stroke(255);
  strokeWeight(2.5);
  rect(-5, 450, 805, 50);
}

// Function that draws the loading screen
function loadingScreen() {
  background(0, 0, 0, transparency); // Draws a completely black background with transparency
  
  strokeWeight(2.5);
  stroke(255);
  fill(255);
  
  // If the transparency isnt at 100%, increase it by 0.5
  if (transparency < 100) {
    transparency += 0.5; 
  } else {
    // if you arent leaving the game do this, else do something else
    if (!quitting) {
      fill(255); // set color to white
    
      // move the position to 400, 250 and rotate by the rotation
      translate(400, 250);
    
      rotate(rotation);
    
      // Loop 6 times drawing dots in a circle
      for(let i = 0; i < 6; i++){

        let angle = 360/6;
      
        xCircle = cos(angle*i) * 30;
        yCircle = sin(angle*i) * 30;

        circle(xCircle, yCircle, 10);
      }
    
      // Rotate by the rotation speed
      rotation += rotSpeed;
    
      // If the dots have rotated 720 degrees, do this
      if (rotation >= 720) { 
        // set rotation back to 0 and tranparency to 0
        rotation = 0;
        transparency = 0;
        
        // If you are going to the game, set gaming to false, and set the state to game
        // Else if you are going back to the menu, set createdScorePopup back to false and state to the menu
        if (gaming) {
          gaming = false;
          state = "game";
        } else {
          createdScorePopup = false;
          state = "menu";
        }
      }
    } else {
      popupList.splice(0, 16); // Remove the latest popup
      
      // do everything as before
      fill(255);
    
      translate(400, 250);
    
      rotate(rotation);
    
      for(let i = 0; i < 6; i++){

        let angle = 360/6;
      
        xCircle = cos(angle*i) * 30;
        yCircle = sin(angle*i) * 30;

        circle(xCircle, yCircle, 10);
      }
    
      rotation += rotSpeed;
    
      if (rotation >= 720) {  
        rotation = 0;
        transparency = 0;
        
        // create a big square and stop the loop
        translate(-400, -250);
        noStroke();
        fill(0);
        rect(0, 0, 800, 500);
        
        noLoop();
      }
    }
  }
}

// Function to draw the end screen when you lose
function end() {
  image(endBackgroundImg, 0, 0, 800, 500); // Draws the BSOD background
  
  // Removes the stroke
  noStroke();
  
  // Draws the percentage withought decimals
  textSize(20);
  fill(255);
  text(nf(percentage, 0, 0), 87, 293);
  
  // slow down percentage increase as it gets closer to 100
  // once it gets to 100, go to the loading screen and reset percentage
  if (percentage >= 100) {
    percentage = 0;
    state = "loading";
  } else if (percentage >= 97) {
    percentage += 0.015;
  } else if (percentage >= 95) {
    percentage += 0.025;
  } else if (percentage >= 90) {
    percentage += 0.05;
  } else {
    percentage += 0.4; 
  }
}

// Function to draw the game
function game() {
  // If the player lost, start the lose screen, else, keep playing the game
  if (!gameRunning) {
    // if the counter hasn't started, start it and make it not start again
    if (!counterStarted) {
      counter = millis();
      counterStarted = true;
    }
    
    // Remove 1 popup each 100ms until there is 0 left starting at 300ms
    if (millis() - counter >= 300) {
      popupList.splice(0, 16);
      
      image(backgroundImg, 0, 0, 800, 500); 
      
      stroke(255);
      strokeWeight(2.5);
      rect(-5, 450, 805, 50);
    
      noStroke();
      text("💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀", 400, 475);
    
      for (let i = 0; i <= popupList.length + 1; i += 16) {
        drawPopup(popupList[i + 1], popupList[i + 2], popupList[i + 3], popupList[i + 4], popupList[i + 5], popupList[i + 6], popupList[i + 7], popupList[i + 8], popupList[i + 9], popupList[i + 10], popupList[i + 11]);
      }
      
      textSize(30);
      stroke(255);
      strokeWeight(5);
      text("Popups Destroyed: " + closedPopups, 400, 20);
  
      textSize(20);
      text("RAM Left: " + nf((ramLeft - (popupAmount * 500))/1000, 0, 1) + "GB", 400, 50);
    }
    
    if (millis() - counter >= 400) {
      popupList.splice(0, 16);
      
      image(backgroundImg, 0, 0, 800, 500);
      
      stroke(255);
      strokeWeight(2.5);
      rect(-5, 450, 805, 50);
    
      noStroke();
      text("💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀", 400, 475);
    
      for (let i = 0; i <= popupList.length + 1; i += 16) {
        drawPopup(popupList[i + 1], popupList[i + 2], popupList[i + 3], popupList[i + 4], popupList[i + 5], popupList[i + 6], popupList[i + 7], popupList[i + 8], popupList[i + 9], popupList[i + 10], popupList[i + 11]);
      }
      
      textSize(30);
      stroke(255);
      strokeWeight(5);
      text("Popups Destroyed: " + closedPopups, 400, 20);
  
      textSize(20);
      text("RAM Left: " + nf((ramLeft - (popupAmount * 500))/1000, 0, 1) + "GB", 400, 50);
    }
    
    if (millis() - counter >= 500) {
      popupList.splice(0, 16);
      
      image(backgroundImg, 0, 0, 800, 500); 
      
      stroke(255);
      strokeWeight(2.5);
      rect(-5, 450, 805, 50);
    
      noStroke();
      text("💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀", 400, 475);
    
      for (let i = 0; i <= popupList.length + 1; i += 16) {
        drawPopup(popupList[i + 1], popupList[i + 2], popupList[i + 3], popupList[i + 4], popupList[i + 5], popupList[i + 6], popupList[i + 7], popupList[i + 8], popupList[i + 9], popupList[i + 10], popupList[i + 11]);
      }
      
      textSize(30);
      stroke(255);
      strokeWeight(5);
      text("Popups Destroyed: " + closedPopups, 400, 20);
  
      textSize(20);
      text("RAM Left: " + nf((ramLeft - (popupAmount * 500))/1000, 0, 1) + "GB", 400, 50);
    }
    
    if (millis() - counter >= 600) {
      popupList.splice(0, 16);
      
      image(backgroundImg, 0, 0, 800, 500); 
      
      stroke(255);
      strokeWeight(2.5);
      rect(-5, 450, 805, 50);
    
      noStroke();
      text("💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀", 400, 475);
    
      for (let i = 0; i <= popupList.length + 1; i += 16) {
        drawPopup(popupList[i + 1], popupList[i + 2], popupList[i + 3], popupList[i + 4], popupList[i + 5], popupList[i + 6], popupList[i + 7], popupList[i + 8], popupList[i + 9], popupList[i + 10], popupList[i + 11]);
      }
      
      textSize(30);
      stroke(255);
      strokeWeight(5);
      text("Popups Destroyed: " + closedPopups, 400, 20);
  
      textSize(20);
      text("RAM Left: " + nf((ramLeft - (popupAmount * 500))/1000, 0, 1) + "GB", 400, 50);
    }
    
    if (millis() - counter >= 700) {
      popupList.splice(0, 16);
      
      image(backgroundImg, 0, 0, 800, 500); 
      
      stroke(255);
      strokeWeight(2.5);
      rect(-5, 450, 805, 50);
    
      noStroke();
      text("💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀", 400, 475);
    
      for (let i = 0; i <= popupList.length + 1; i += 16) {
        drawPopup(popupList[i + 1], popupList[i + 2], popupList[i + 3], popupList[i + 4], popupList[i + 5], popupList[i + 6], popupList[i + 7], popupList[i + 8], popupList[i + 9], popupList[i + 10], popupList[i + 11]);
      }
      
      textSize(30);
      stroke(255);
      strokeWeight(5);
      text("Popups Destroyed: " + closedPopups, 400, 20);
  
      textSize(20);
      text("RAM Left: " + nf((ramLeft - (popupAmount * 500))/1000, 0, 1) + "GB", 400, 50);
    }
    
    if (millis() - counter >= 800) {
      popupList.splice(0, 16);
      
      image(backgroundImg, 0, 0, 800, 500); 
      
      stroke(255);
      strokeWeight(2.5);
      rect(-5, 450, 805, 50);
    
      noStroke();
      text("💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀", 400, 475);
    
      for (let i = 0; i <= popupList.length + 1; i += 16) {
        drawPopup(popupList[i + 1], popupList[i + 2], popupList[i + 3], popupList[i + 4], popupList[i + 5], popupList[i + 6], popupList[i + 7], popupList[i + 8], popupList[i + 9], popupList[i + 10], popupList[i + 11]);
      }
      
      textSize(30);
      stroke(255);
      strokeWeight(5);
      text("Popups Destroyed: " + closedPopups, 400, 20);
  
      textSize(20);
      text("RAM Left: " + nf((ramLeft - (popupAmount * 500))/1000, 0, 1) + "GB", 400, 50);
    }
    
    // Once all popups are close, reset all the variables and show the end screen
    if (millis() - counter >= 1000) {
      popupAmount = 0;
      counterStarted = false;
      gameRunning = true;
      
      state = "end";
    }
  } else {
    // if the player has less than or equal to 0 ram left, make them lose
    if (ramLeft - (popupAmount * 500) <= 0) {
      gameRunning = false;
    }
    
    // draws the background
    image(backgroundImg, 0, 0, 800, 500); 
    
    // draws the black bar at the bottom of the screen
    stroke(255);
    strokeWeight(2.5);
    rect(-5, 450, 805, 50);
    
    // draws skulls over the bar at the bottom of the screen
    noStroke();
    text("💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀   💀", 400, 475);
    
    // goes through all the popups and draws them
    for (let i = 0; i <= popupList.length + 1; i += 16) {
      drawPopup(popupList[i + 1], popupList[i + 2], popupList[i + 3], popupList[i + 4], popupList[i + 5], popupList[i + 6], popupList[i + 7], popupList[i + 8], popupList[i + 9], popupList[i + 10], popupList[i + 11]);
    }
  
    // calculate the amount of popups currently on screen
    popupAmount = popupList.length/16;
  
    // say how much popups you have closed
    textSize(30);
    stroke(255);
    strokeWeight(5);
    text("Popups Destroyed: " + closedPopups, 400, 20);
  
    // Say how much RAM left there is depending on the amount of popups on screen
    textSize(20);
    text("RAM Left: " + nf((ramLeft - (popupAmount * 500))/1000, 0, 1) + "GB", 400, 50);
  
    // speed of popup appearing starts at 1 and a quirter seconds and it decreases the time the more you close
    if (millis() - cooldownTimer >= 1250 - closedPopups*1.5) {
      // Reset the timer
      cooldownTimer = millis();
    
      let ids = 1;
      
      // for each milestone, select more random paramaters and select popups with checkmarks
      // It increments the id of popups until it finds an empty slot to put all the information of the new popup
      if (closedPopups >= 300) {
        let popupWidth = random(100, 200);
        let popupHeight = random(100, 200);
        let x = random(width - popupWidth);
        let y = random(height- popupHeight);
        let topBarHeight = random(20, 60);
        let closeXPos = random(popupWidth - popupWidth/4);
        let closeYPos = random(popupHeight - topBarHeight);
        let failXPos = random(popupWidth - popupWidth/4);
        let failYPos = random(popupHeight - topBarHeight);
      
        let orientationsList = ["top", "bottom", "left", "right"];
        let typeList = ["withLoss", "swappedLoss"];
        let selectedType = random(typeList)
        let selectedOrientation = random(orientationsList);
  
        for (let i = 0; i < popupList.length + 1; i += 16) {
          if (popupList[i] <= ids) {
            ids++;
          } else {
            popupList.push(ids); // Button ID
            popupList.push(x);
            popupList.push(y);
            popupList.push(popupWidth);
            popupList.push(popupHeight); // popupHeight
            popupList.push(closeXPos); // Close X Position
            popupList.push(closeYPos); // Close Y Position
            popupList.push(failXPos); // Fail x pos
            popupList.push(failYPos); // fail y pos
            popupList.push(selectedType); // type
            popupList.push(selectedOrientation); // top bar orientation
            popupList.push(topBarHeight);
            popupList.push(popupWidth/4); // Close Button Width
            popupList.push(topBarHeight); // Close Button Height
            popupList.push(closeXPos + x); // Close X Position REAL
            popupList.push(closeYPos + y); // Close Y Position REAL
        
            break;
          }
        }
      } else if (closedPopups >= 250) {
        let popupWidth = random(100, 200);
        let popupHeight = random(100, 200);
        let x = random(width - popupWidth);
        let y = random(height- popupHeight);
        let topBarHeight = random(20, 60);
        let closeXPos = random(popupWidth - popupWidth/4);
        let closeYPos = random(popupHeight - topBarHeight);
        let failXPos = random(popupWidth - popupWidth/4);
        let failYPos = random(popupHeight - topBarHeight);
      
        let orientationsList = ["top", "bottom", "left", "right"];
        let selectedOrientation = random(orientationsList);
  
        for (let i = 0; i < popupList.length + 1; i += 16) {
          if (popupList[i] <= ids) {
            ids++;
          } else {
            popupList.push(ids); // Button ID
            popupList.push(x);
            popupList.push(y);
            popupList.push(popupWidth);
            popupList.push(popupHeight); // popupHeight
            popupList.push(closeXPos); // Close X Position
            popupList.push(closeYPos); // Close Y Position
            popupList.push(failXPos); // Fail x pos
            popupList.push(failYPos); // fail y pos
            popupList.push("withLoss"); // type
            popupList.push(selectedOrientation); // top bar orientation
            popupList.push(topBarHeight);
            popupList.push(popupWidth/4); // Close Button Width
            popupList.push(topBarHeight); // Close Button Height
            popupList.push(closeXPos + x); // Close X Position REAL
            popupList.push(closeYPos + y); // Close Y Position REAL
        
            break;
          }
        } 
      } else if (closedPopups >= 200) {
        let popupWidth = random(100, 200);
        let popupHeight = random(100, 200);
        let x = random(width - popupWidth);
        let y = random(height- popupHeight);
        let topBarHeight = random(20, 60);
        let closeXPos = random(popupWidth - popupWidth/4);
        let closeYPos = random(popupHeight - topBarHeight);
      
        let orientationsList = ["top", "bottom", "left", "right"];
        let selectedOrientation = random(orientationsList);
  
        for (let i = 0; i < popupList.length + 1; i += 16) {
          if (popupList[i] <= ids) {
            ids++;
          } else {
            popupList.push(ids); // Button ID
            popupList.push(x);
            popupList.push(y);
            popupList.push(popupWidth);
            popupList.push(popupHeight); // popupHeight
            popupList.push(closeXPos); // Close X Position
            popupList.push(closeYPos); // Close Y Position
            popupList.push(0); // Fail x pos
            popupList.push(0); // fail y pos
            popupList.push("normal"); // type
            popupList.push(selectedOrientation); // top bar orientation
            popupList.push(topBarHeight);
            popupList.push(popupWidth/4); // Close Button Width
            popupList.push(topBarHeight); // Close Button Height
            popupList.push(closeXPos + x); // Close X Position REAL
            popupList.push(closeYPos + y); // Close Y Position REAL
        
            break;
          }
        }
      } else if (closedPopups >= 150) {
        let popupWidth = random(100, 200);
        let popupHeight = random(100, 200);
        let x = random(width - popupWidth);
        let y = random(height- popupHeight);
        let topBarHeight = random(20, 60);
        let closeXPos = random(popupWidth - popupWidth/4);
        let closeYPos = random(popupHeight - topBarHeight);
  
        for (let i = 0; i < popupList.length + 1; i += 16) {
          if (popupList[i] <= ids) {
            ids++;
          } else {
            popupList.push(ids); // Button ID
            popupList.push(x);
            popupList.push(y);
            popupList.push(popupWidth);
            popupList.push(popupHeight); // popupHeight
            popupList.push(closeXPos); // Close X Position
            popupList.push(closeYPos); // Close Y Position
            popupList.push(0); // Fail x pos
            popupList.push(0); // fail y pos
            popupList.push("normal"); // type
            popupList.push("top"); // top bar orientation
            popupList.push(topBarHeight);
            popupList.push(popupWidth/4); // Close Button Width
            popupList.push(topBarHeight); // Close Button Height
            popupList.push(closeXPos + x); // Close X Position REAL
            popupList.push(closeYPos + y); // Close Y Position REAL
        
            break;
          }
        }
      } else if (closedPopups >= 100) {
        let popupWidth = random(100, 200);
        let popupHeight = random(100, 200);
        let x = random(width - popupWidth);
        let y = random(height- popupHeight);
        let topBarHeight = random(20, 60);
        let closeXPos = random(popupWidth - popupWidth/4);
        let closeYPos = random(popupHeight - topBarHeight);
      
        let orientationsList = ["top", "bottom", "left", "right"];
        let selectedOrientation = random(orientationsList);
  
        for (let i = 0; i < popupList.length + 1; i += 16) {
          if (popupList[i] <= ids) {
            ids++;
          } else {
            if (selectedOrientation == "top") {
              popupList.push(ids); // Button ID
              popupList.push(x);
              popupList.push(y);
              popupList.push(popupWidth);
              popupList.push(popupHeight); // popupHeight
              popupList.push(closeXPos); // Close X Position
              popupList.push(0); // Close Y Position
              popupList.push(0); // Fail x pos
              popupList.push(0); // fail y pos
              popupList.push("normal"); // type
              popupList.push("top"); // top bar orientation
              popupList.push(topBarHeight);
              popupList.push(popupWidth/4); // Close Button Width
              popupList.push(topBarHeight); // Close Button Height
              popupList.push(closeXPos + x); // Close X Position REAL
              popupList.push(0 + y); // Close Y Position REAL 
            } else if (selectedOrientation == "bottom") {
              popupList.push(ids); // Button ID
              popupList.push(x);
              popupList.push(y);
              popupList.push(popupWidth);
              popupList.push(popupHeight); // popupHeight
              popupList.push(closeXPos); // Close X Position
              popupList.push(popupHeight - topBarHeight); // Close Y Position
              popupList.push(0); // Fail x pos
              popupList.push(0); // fail y pos
              popupList.push("normal"); // type
              popupList.push("bottom"); // top bar orientation
              popupList.push(topBarHeight);
              popupList.push(popupWidth/4); // Close Button Width
              popupList.push(topBarHeight); // Close Button Height
              popupList.push(closeXPos + x); // Close X Position REAL
              popupList.push(popupHeight - topBarHeight + y); // Close Y Position REAL
            } else if (selectedOrientation == "left") {
              popupList.push(ids); // Button ID
              popupList.push(x);
              popupList.push(y);
              popupList.push(popupWidth);
              popupList.push(popupHeight); // popupHeight
              popupList.push(0); // Close X Position
              popupList.push(closeYPos); // Close Y Position
              popupList.push(0); // Fail x pos
              popupList.push(0); // fail y pos
              popupList.push("normal"); // type
              popupList.push("left"); // top bar orientation
              popupList.push(topBarHeight);
              popupList.push(popupWidth/4); // Close Button Width
              popupList.push(topBarHeight); // Close Button Height
              popupList.push(0 + x); // Close X Position REAL
              popupList.push(closeYPos + y); // Close Y Position REAL
            } else if (selectedOrientation == "right") {
              popupList.push(ids); // Button ID
              popupList.push(x);
              popupList.push(y);
              popupList.push(popupWidth);
              popupList.push(popupHeight); // popupHeight
              popupList.push(popupWidth - popupWidth/5); // Close X Position
              popupList.push(closeYPos); // Close Y Position
              popupList.push(0); // Fail x pos
              popupList.push(0); // fail y pos
              popupList.push("normal"); // type
              popupList.push("right"); // top bar orientation
              popupList.push(topBarHeight);
              popupList.push(popupWidth/4); // Close Button Width
              popupList.push(topBarHeight); // Close Button Height
              popupList.push(popupWidth - popupWidth/5 + x); // Close X Position REAL
              popupList.push(closeYPos + y); // Close Y Position REAL
            }
        
            break;
          }
        } 
      } else if (closedPopups >= 50) {
        let popupWidth = random(100, 200);
        let popupHeight = random(100, 200);
        let topBarHeight = random(20, 60);
        let closeXPos = random(popupWidth - popupWidth/4);
        let x = random(width - popupWidth);
        let y = random(height - popupHeight);
  
        for (let i = 0; i < popupList.length + 1; i += 16) {
          if (popupList[i] <= ids) {
            ids++;
          } else {
            popupList.push(ids); // Button ID
            popupList.push(x);
            popupList.push(y);
            popupList.push(popupWidth);
            popupList.push(popupHeight); // popupHeight
            popupList.push(closeXPos); // Close X Position
            popupList.push(0); // Close Y Position
            popupList.push(0); // Fail x pos
            popupList.push(0); // fail y pos
            popupList.push("normal"); // type
            popupList.push("top"); // top bar orientation
            popupList.push(topBarHeight);
            popupList.push(popupWidth/4); // Close Button Width
            popupList.push(topBarHeight); // Close Button Height
            popupList.push(closeXPos + x); // Close X Position REAL
            popupList.push(0 + y); // Close Y Position REAL 
            
            break;
          }
        } 
      } else {
        let popupWidth = random(100, 200);
        let popupHeight = random(100, 200);
        let topBarHeight = random(20, 60);
        let x = random(width - popupWidth);
        let y = random(height - popupHeight);
  
        for (let i = 0; i < popupList.length + 1; i += 16) {
          if (popupList[i] <= ids) {
            ids++;
          } else {
            popupList.push(ids); // Button ID
            popupList.push(x); // X Pos
            popupList.push(y); // Y Pos
            popupList.push(popupWidth); // popupWidth
            popupList.push(popupHeight); // popupHeight
            popupList.push(popupWidth - popupWidth/4); // Close X Position
            popupList.push(0); // Close Y Position
            popupList.push(0); // Fail x pos
            popupList.push(0); // fail y pos
            popupList.push("normal"); // type
            popupList.push("top"); // top bar orientation
            popupList.push(topBarHeight); // Height of the top bar
            popupList.push(popupWidth/4); // Close Button Width
            popupList.push(topBarHeight); // Close Button Height
            popupList.push((popupWidth - popupWidth/4) + x); // Close X Position REAL
            popupList.push(0 + y); // Close Y Position REAL
        
            break;
          }
        }   
      }
    }
  }
}

// Function to draw custom popups
function drawPopup(x, y, popupWidth, popupHeight, closeXPos, closeYPos, failXPos, failYPos, type, topBarOrientation, topBarHeight) {
  // check what type of popup it is, options are normal, menu, one with a check mark, and one with a check mark but swapped colors
  if (type == "normal") {
    // draws a black square with the size asked
    fill(0);
    strokeWeight(1);
    stroke(0);
    rect(x, y, popupWidth, popupHeight);
    
    // Check what type of top bar orientation was selected and draw a white line in the position with the asked height
    if (topBarOrientation == "top") {
      fill(255);
      rect(x, y, popupWidth, topBarHeight);
    } else if (topBarOrientation == "bottom") {
      fill(255);
      rect(x, y + popupHeight - topBarHeight, popupWidth, topBarHeight);
    } else if (topBarOrientation == "left") {
      fill(255);
      rect(x, y, popupWidth/5, popupHeight);
    } else if (topBarOrientation == "right") {
      fill(255);
      rect(x + popupWidth - popupWidth/5, y, popupWidth/5, popupHeight);
    }
    
    // if the orientation is right or left, fix the width and height of the X button else, keep it normal
    if (topBarOrientation == "left" || topBarOrientation == "right") {
      fill(255, 0, 0);
      rect(closeXPos + x, closeYPos + y, popupWidth/5, topBarHeight);
      
      noStroke();
      fill(0);
      textSize(20);
      text("X", (closeXPos + x) + ((popupWidth/5)/2), (closeYPos + y) + topBarHeight/1.85);
    } else {
      fill(255, 0, 0);
      rect(closeXPos + x, closeYPos + y, popupWidth/4, topBarHeight); 
      
      noStroke();
      fill(0);
      textSize(20);
      text("X", (closeXPos + x) + ((popupWidth/4)/2), (closeYPos + y) + topBarHeight/1.85);
    }
  } else if (type == "withLoss") {
    // Exactly the same but with a green checkmark
    
    fill(0);
    strokeWeight(1);
    stroke(0);
    rect(x, y, popupWidth, popupHeight);
    
    if (topBarOrientation == "top") {
      fill(255);
      rect(x, y, popupWidth, topBarHeight);
    } else if (topBarOrientation == "bottom") {
      fill(255);
      rect(x, y + popupHeight - topBarHeight, popupWidth, topBarHeight);
    } else if (topBarOrientation == "left") {
      fill(255);
      rect(x, y, popupWidth/5, popupHeight);
    } else if (topBarOrientation == "right") {
      fill(255);
      rect(x + popupWidth - popupWidth/5, y, popupWidth/5, popupHeight);
    }
    
    if (topBarOrientation == "left" || topBarOrientation == "right") {
      fill(255, 0, 0);
      rect(closeXPos + x, closeYPos + y, popupWidth/5, topBarHeight);
      
      noStroke();
      fill(0);
      textSize(20);
      text("X", (closeXPos + x) + ((popupWidth/5)/2), (closeYPos + y) + topBarHeight/1.85);
      
      fill(0, 255, 0);
      stroke(0);
      rect(failXPos + x, failYPos + y, popupWidth/5, topBarHeight);
      
      fill(0);
      textSize(20);
      noStroke();
      text("✔️", (failXPos + x) + ((popupWidth/5)/2), (failYPos + y) + topBarHeight/1.85);
    } else {
      fill(255, 0, 0);
      rect(closeXPos + x, closeYPos + y, popupWidth/4, topBarHeight); 
      
      noStroke();
      fill(0);
      textSize(20);
      text("X", (closeXPos + x) + ((popupWidth/4)/2), (closeYPos + y) + topBarHeight/1.85);
      
      fill(0, 255, 0);
      stroke(0);
      rect(failXPos + x, failYPos + y, popupWidth/4, topBarHeight); 
      
      fill(0);
      textSize(20);
      noStroke();
      text("✔️", (failXPos + x) + ((popupWidth/4)/2), (failYPos + y) + topBarHeight/1.85);
    }
  } else if (type == "swappedLoss") {
    // Exactly the same except the x is green and the checkmark is red
    
    fill(0);
    strokeWeight(1);
    stroke(0);
    rect(x, y, popupWidth, popupHeight);
    
    if (topBarOrientation == "top") {
      fill(255);
      rect(x, y, popupWidth, topBarHeight);
    } else if (topBarOrientation == "bottom") {
      fill(255);
      rect(x, y + popupHeight - topBarHeight, popupWidth, topBarHeight);
    } else if (topBarOrientation == "left") {
      fill(255);
      rect(x, y, popupWidth/5, popupHeight);
    } else if (topBarOrientation == "right") {
      fill(255);
      rect(x + popupWidth - popupWidth/5, y, popupWidth/5, popupHeight);
    }
    
    if (topBarOrientation == "left" || topBarOrientation == "right") {
      fill(0, 255, 0);
      rect(closeXPos + x, closeYPos + y, popupWidth/5, topBarHeight);
      
      noStroke();
      fill(0);
      textSize(20);
      text("X", (closeXPos + x) + ((popupWidth/5)/2), (closeYPos + y) + topBarHeight/1.85);
      
      fill(255, 0, 0);
      stroke(0);
      rect(failXPos + x, failYPos + y, popupWidth/5, topBarHeight);
      
      fill(0);
      textSize(20);
      noStroke();
      text("✔️", (failXPos + x) + ((popupWidth/5)/2), (failYPos + y) + topBarHeight/1.85);
    } else {
      fill(0, 255, 0);
      rect(closeXPos + x, closeYPos + y, popupWidth/4, topBarHeight); 
      
      noStroke();
      fill(0);
      textSize(20);
      text("X", (closeXPos + x) + ((popupWidth/4)/2), (closeYPos + y) + topBarHeight/1.85);
      
      fill(255, 0, 0);
      stroke(0);
      rect(failXPos + x, failYPos + y, popupWidth/4, topBarHeight); 
      
      fill(0);
      textSize(20);
      noStroke();
      text("✔️", (failXPos + x) + ((popupWidth/4)/2), (failYPos + y) + topBarHeight/1.85);
    }
  } else if (type == "menu") {
    // exactly the same but withought the x button
    
    fill(0);
    strokeWeight(1);
    stroke(0);
    rect(x, y, popupWidth, popupHeight);
    
    if (topBarOrientation == "top") {
      fill(255);
      rect(x, y, popupWidth, topBarHeight);
    } else if (topBarOrientation == "bottom") {
      fill(255);
      rect(x, y + popupHeight - topBarHeight, popupWidth, topBarHeight);
    } else if (topBarOrientation == "left") {
      fill(255);
      rect(x, y, popupWidth/5, popupHeight);
    } else if (topBarOrientation == "right") {
      fill(255);
      rect(x + popupWidth - popupWidth/5, y, popupWidth/5, popupHeight);
    }
  }
}

function mousePressed() {
  // First check if you press the left mouse button
  if (mouseButton == LEFT) {
    if (state == "menu") {
      // Depending on what you press in the menu, go to the specified page
      if (mouseX >= 332 && mouseX <= 390 && mouseY >= 190 && mouseY <= 245) {
        quitting = true;
        state = "loading";
      } else if (mouseX >= 55 && mouseX <= 110 && mouseY >= 190 && mouseY <= 245) {
        popupList.splice(0, 16);
        gaming = true;
        closedPopups = 0;
        state = "loading";
      } else if (mouseX >= 200 && mouseX <= 245 && mouseY >= 190 && mouseY <= 245) {
        popupList.splice(0, 16);
        createdScorePopup = false;
        state = "info";
      }
    } else if (state == "info") {
      // If you are in the intructions page and press, it sends you back to the main menu
      popupList.splice(0, 16);
      state = "loading";
    }
    
    // Loop through every popup in the list
    for (let i = 0; i < popupList.length + 1; i += 16) {    
      // if you are in the menu, ignore it
      if (popupList[i + 9] == "menu") {
        break;
      }

      if (popupList[i + 9] == "normal") {
        // If popup is normal type, and is pressed, remove it from the list and increase the closedPopups
        if (mouseX >= popupList[i + 14] && mouseX <= popupList[i + 14] + popupList[i + 12] && mouseY >= popupList[i + 15] && mouseY <= popupList[i + 15] + popupList[i + 13]) {
          popupList.splice(i, 16);
        
          closedPopups++;
          break;  
        }
      } else if (popupList[i + 9] == "withLoss" || popupList[i + 9] == "swappedLoss") {
        // If you pressed the X with the one with the checkmark, remove it from the list and increment closedPopups
        if (mouseX >= popupList[i + 14] && mouseX <= popupList[i + 14] + popupList[i + 12] && mouseY >= popupList[i + 15] && mouseY <= popupList[i + 15] + popupList[i + 13]) {
          popupList.splice(i, 16);
        
          closedPopups++;  
        }
          
        // If you pressed the checkmark, remove it from the list, increments closedPopups, and create 2 new popups
        if (mouseX >= popupList[i + 7] + popupList[i + 1] && mouseX <= popupList[i + 7] + popupList[i + 1] + popupList[i + 12] && mouseY >= popupList[i + 8] + popupList[i + 2] && mouseY <= popupList[i + 8] + popupList[i + 2] + popupList[i + 13]) {
          popupList.splice(i, 16);
        
          closedPopups++;
            
          for (i3 = 0; i3 <= 1; i3++) {
            let ids = 1;
      
            if (closedPopups >= 250) {
              // selects random paramaters for the popup
              let popupWidth = random(100, 200);
              let popupHeight = random(100, 200);
              let x = random(width - popupWidth);
              let y = random(height- popupHeight);
              let topBarHeight = random(20, 60);
              let closeXPos = random(popupWidth - popupWidth/4);
              let closeYPos = random(popupHeight - topBarHeight);
              let failXPos = random(popupWidth - popupWidth/4);
              let failYPos = random(popupHeight - topBarHeight);
      
              let orientationsList = ["top", "bottom", "left", "right"];
              let selectedOrientation = random(orientationsList);
  
              // increment the id until you reach an empty space and then push all the information of the popup to the list
              for (let i2 = 0; i2 < popupList.length + 1; i2 += 16) {
                if (popupList[i2] <= ids) {
                  ids++;
                } else {
                  popupList.push(ids); // Button ID
                  popupList.push(x); // X
                  popupList.push(y); // Y
                  popupList.push(popupWidth); // popupWidth
                  popupList.push(popupHeight); // popupHeight
                  popupList.push(closeXPos); // Close X Position
                  popupList.push(closeYPos); // Close Y Position
                  popupList.push(failXPos); // Fail x pos
                  popupList.push(failYPos); // fail y pos
                  popupList.push("withLoss"); // type
                  popupList.push(selectedOrientation); // top bar orientation
                  popupList.push(topBarHeight); // top bar height
                  popupList.push(popupWidth/4); // Close Button Width
                  popupList.push(topBarHeight); // Close Button Height
                  popupList.push(closeXPos + x); // Close X Position REAL
                  popupList.push(closeYPos + y); // Close Y Position REAL
        
                  break;
                }
              }
            }
          }
        }
      }
    }
  }
}