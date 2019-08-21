class ball
{
  constructor()
  {
    this.x=0;
    this.y=0;
    
    this.xvel=0;
    this.yvel=0;
    
    this.speed=2;
    
    this.up=false;
    this.down=false;
    this.left=false;
    this.right=false;
    
    this.message="";
    this.messageTime;
    
    this.name="test";
  }
  
  update()
  {
    if (this.up)
    {
      this.y -= this.speed;
    }
    if (this.down)
    {
      this.y+=this.speed;
    }
    if (this.right)
    {
      this.x+=this.speed;
    }
    if (this.left)
    {
      this.x-=this.speed;
    }
    
    if (this.messageTime>0)
    {
      this.messageTime-=1;
      
      if (this.messageTime<=0)
      {
        this.message="";
      }
    }
  }
  
  draw()
  {
    ellipse(this.x,this.y,50,50);
    
    //name tag
    textSize(16);
    textAlign(CENTER);
    text(this.name, this.x, this.y+40);
    
    //message
    textSize(12);
    textAlign(CENTER);
    text(this.message, this.x, this.y-30);
  }
  
  newMessage(newMsg)
  {
    this.message=newMsg;
    this.messageTime=600;
  }
}