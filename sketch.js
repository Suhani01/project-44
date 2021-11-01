var walkingbear,jumpingbear,bear, background1
var gameState=0
var honeyImage
var honeyCount=0
var beeImage
var invisibleGround
var honeyGroup, beeGroup

function preload(){
  walkingbear=loadAnimation("images/bear1.png","images/bear2.png","images/bear3.png","images/bear4.png")
  background1=loadImage("images/41530.jpg")
  honeyImage=loadImage("images/honey.png")
  beeImage=loadImage("images/bee.png")
}

function setup(){
  createCanvas(displayWidth-05,displayHeight-120);
  
  

   bg=createSprite(width/2,0,width,height)
   bg.addImage(background1)
   bg.scale=0.45

   bear=createSprite(50,displayHeight-275,20,50)
  bear.addAnimation("jumping",walkingbear)
   bear.scale=0.3
  

   invisibleGround = createSprite(200,height-50,400,10);
  invisibleGround.visible = false;
  honeyGroup=new Group()
  beeGroup=new Group()
}

function draw(){
 background(255) 
  bg.velocityX=-10
  if (bg.x <172){
    bg.x =bg.width/8
  }
  

  if(keyDown("space")) {
    bear.velocityY = -12;
  }

  bear.velocityY=bear.velocityY+0.8
  bear.collide(invisibleGround)


  spawnHoney()
  spawnBee()

  for(var i=0;i<honeyGroup.length;i++){
    if(honeyGroup.get(i).isTouching(bear)){
      honeyGroup.get(i).destroy()
      honeyCount +=1
    }
  }

  for(var i=0;i<beeGroup.length;i++){
   if(beeGroup.get(i).y===100){
     beeGroup.get(i).velocityY=3
   }
  }

  drawSprites()

  fill("white")
  
  text("Honey Score: "+ honeyCount, width-200,50);

  
}

function spawnHoney() {

  if (frameCount % 80 === 0 && frameCount %10===0) {
    var honey = createSprite(width-50,120,40,10);
    honey.y = Math.round(random(50,500));
    honey.addImage(honeyImage);
    honey.scale = 0.1;
    honey.velocityX = -5;
    
    
    honey.lifetime =1000;

    honeyGroup.add(honey);
  }
  
}

function spawnBee() {

  if (frameCount % 100 === 0) {
    var bee = createSprite(width-50,120,40,10);
    bee.y = Math.round(random(50,500));
    bee.addImage(beeImage);
    bee.scale = 0.1;
    bee.velocityX = -3;
    bee.velocityY=random(-5,5)

    if(bee.y===150){
      bee.velocityY=3
      console.log(bee.y)
    }else if (bee.y===height-150){
      bee.velocityY=-3
    }    
    
    
    bee.lifetime = 1000;

    beeGroup.add(bee);
  }
  
}