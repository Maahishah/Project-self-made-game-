var thief, thiefAnimation, 
bgImg, groundImg, ground;
var stone , stoneImg;
var tree, treeImg;
var invisibleGround;
var Play = 1;
var End =0;
var gamestate = Play;
var score=0;
var thiefAnimation2
var gameOver;
var stoneGrp;
var restart;



function preload(){
  thiefAnimation = loadAnimation("images/run2.png","images/run4.png",);
  bgImg = loadImage("images/bg.jpg")
groundImg= loadImage("images/ground.png")
stoneImg= loadImage("images/stone.png")
treeImg =  loadImage("images/tree.png")
thiefAnimation2 = loadAnimation("images/run2.png");
gameOverImg = loadImage("images/gameOver.png")
restartImg = loadImage("images/reset.png")

}

function setup() {
  createCanvas(1600,787);

thief = createSprite(150,520,20,20)
thief.addAnimation("thief",thiefAnimation);
thief.scale = 0.6
thief.addAnimation("thief1",thiefAnimation2);

ground = createSprite(800,700,800,10)
//ground.addImage(groundImg)
ground.scale=2


invisibleGround = createSprite(800,630,2000,10);
invisibleGround.visible = false;

gameOver = createSprite(800,300,100,100)
gameOver.addImage(gameOverImg)
gameOver.scale = 0.3;

restart = createSprite(100,100,20,20)
restart.addImage(restartImg);
restart.scale = 0.4

stoneGrp  = new Group;
}

function draw() {
  background(bgImg);  


thief.depth = ground.depth
thief.depth = thief.depth +1

stoneGrp.depth = ground.depth
stoneGrp.depth = stoneGrp.depth +1

thief.debug = true;
thief.setCollider("circle",10,0,50)



if(gamestate===Play){

  Stone();
  ground.velocityX=-2
if(ground.x<0){
  ground.width=ground.width/2
}  


      gameOver.visible=false;
//SCORE
      textSize(40);
      fill(rgb(265,265,265)) 
      textFont("BLACKACDER ITC");
      text("Score = "+score,1300,100);
  
//score = score + Math.round(getFrameRate()/100)
        score = score+1

//key code
    if((keyIsDown(UP_ARROW))&& (thief.y>450)){
        thief.velocityY=-30 
      }

    if (thief.y <550){
        thief.changeAnimation("thief1");
       }
    else {
         thief.changeAnimation("thief");
       }

    thief.velocityY = thief.velocityY+2;
    thief.collide(invisibleGround)

   

    if(thief.isTouching(stoneGrp)){
      gamestate= End;
    }

}

//gamestate end
else if(gamestate===End){
gameOver.visible = true;

ground.velocityX = 0;
thief.velocityY = 0;

stoneGrp.setVelocityXEach(0);
stoneGrp.setLifetimeEach(-1);

thief.changeAnimation("thief1");

}


console.log(gamestate)

  drawSprites();
}

function Stone(){
  if(frameCount%170===0){
    stone = createSprite(1609,630,10,10)
    stone.addImage(stoneImg);
    stone.scale=0.17
    stone.velocityX = -(6 + 3*score/100)
    stone.lifetime=200;
    stone.debug = true;
    stoneGrp.add(stone)
  }
}


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
 stoneGrp.destroyEach();
 
 thief.changeAnimation("thief");  
 score = 0;
  
}

