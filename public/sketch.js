
//GLOBAL VARIABLES
//////////////////
widthVal=800;
heightVal=600;

isTyping = false;
typingString = "/ to type message";

player=new ball();
player.name = prompt("What is your name?");

userID = 0;

//SOCKET CODE
//////////////
circles=[];

var socket = io();
socket.emit("join", player);

socket.on("idMsg", (data) => 
{
  userID = data;
});

socket.on("serverUpdateMsg", (data) => 
{
  circles=[];
  for (let i=0; i<data.length; i++)
  {
    if (data[i].id != userID)
    {
      let newBall = new ball();
      let current = data[i].circle;
      newBall.x=current.x;
      newBall.y=current.y;
      newBall.message=current.message;
      newBall.name=current.name;
      circles.push(newBall);
    }
  }
});

//P5 CODE
//////////
function setup() { 
  createCanvas(widthVal, heightVal);
} 

function draw() { 
  background(220);
  fill(0);
  
  player.update();
  player.draw();

  //now to draw other plays
  for (let i=0; i<circles.length; i++)
  {
    circles[i].draw();
  }
  
  // "/ to type message"
  textSize(16);
  fill(50,50,0);
  textAlign(LEFT);
  text(typingString, 0+5, heightVal-5);

  socket.emit("clientDrawMsg", player);
}

//INPUT CODE
/////////////
function keyPressed() 
{
  if (!isTyping)
  {
    if (keyCode === UP_ARROW || keyCode === 87) 
    {
      player.up=true;
    } 
    else if (keyCode === DOWN_ARROW || keyCode === 83) 
    {
      player.down=true;
    }
    else if (keyCode === LEFT_ARROW || keyCode === 65) 
    {
      player.left=true;
    } 
    else if (keyCode === RIGHT_ARROW || keyCode === 68) 
    {
      player.right=true;
    } 
    else if (keyCode === 191) // is is "/"
    {
      isTyping=true;
      typingString="";
    }
  }
  else
  {
    if (keyCode === 13)
    {
      isTyping=false;
      player.newMessage(typingString);
      typingString = "/ to type message";
    } 
    else
    {
      typingString += String.fromCharCode(keyCode);
    }
    
  }
}

function keyReleased() 
{

  if (keyCode === UP_ARROW || keyCode === 87) 
  {
    player.up=false;
  } 
  else if (keyCode === DOWN_ARROW || keyCode === 83) 
  {
    player.down=false;
  }
  else if (keyCode === LEFT_ARROW || keyCode === 65) 
  {
    player.left=false;
  } 
  else if (keyCode === RIGHT_ARROW  || keyCode === 68) 
  {
    player.right=false;
  } 
}