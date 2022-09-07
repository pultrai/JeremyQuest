var player, bg;
var PLAY=1;
var END=0;
var gameState=PLAY;
var score=0;
function preload(){
  playerImg=loadImage("Jeremy.png");
  bgImg=loadImage("lake.jpg");
  coinImg=loadImage("goldcoin.png");
  enemyImg=loadImage("dolphin.png");

  lose=loadSound("losing.mp3");
  win=loadSound("winning.mp3");
  swim=loadSound("swimming.mp3");
}

function setup() {

  
  createCanvas(windowWidth,windowHeight)
  

bg=createSprite(0,0,windowWidth,windowHeight); 
bg.velocityX=-1;
  
  bg.addImage(bgImg);
  bg.scale=4.5;

  player=createSprite(200,700,100,100);
  player.addImage(playerImg);
  player.scale=0.5;

  coinGroup=new Group();
  enemyGroup=new Group();

} 

function draw() {
  background(0); 
  //Image(bgImg,0,0,windowWidth,windowHeight);
  drawSprites();


  if(gameState==PLAY){  

    if(keyDown("UP_ARROW")||touches.length>0){
        player.y = player.y-30
        swim.play();
      }
      if(keyDown("DOWN_ARROW")||touches.length>0){
        player.y = player.y+30
        swim.play();
      }
      if(bg.x<300){
        bg.x=300;
      }
      
      coins();
      enemyD();

     if(player.isTouching(coinGroup)){
        for(var i=0;i<coinGroup.length;i++){     
            
         if(coinGroup[i].isTouching(player)){
          win.play(); 
              coinGroup[i].destroy()
           score+=5;
             
             } 
        
        }
    }
        if(player.isTouching(enemyGroup)){
            for(var i=0;i<enemyGroup.length;i++){     
                
             if(enemyGroup[i].isTouching(player)){
              lose.play();
                  enemyGroup[i].destroy()
                    player.destroy();
                    gameState=END;
                 } 
            
            }
      }

  }
  else if(gameState==END){
    if(bg.x<300){
        bg.x=300;
      }
      
    fill("red");
    textSize(50);
    text("GAME OVER!!", width -1200,400);
    textAlign(CENTER, CENTER);
 
  }

 


fill("pink");
textSize(50);
text(`Score:${score}`, width - 500,100);
textAlign(CENTER, CENTER);

}

function coins(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    coin = createSprite(random(1300,1500),random(100,500),1,1)

    coin.addImage(coinImg)
    coin.scale = 0.09
    coin.velocityX = -6
    coin.debug= true
    coin.setCollider("rectangle",0,0,400,400)
   
    coin.lifetime = 400
    coinGroup.add(coin)
  }

}

function enemyD(){
  if(frameCount%100===0){

    //giving random x and y positions for zombie to appear
    enemy = createSprite(random(1300,1500),random(10,600),1,1)

    enemy.addImage(enemyImg)
    enemy.scale = 0.35
    enemy.velocityX = -6
    enemy.debug= true
    enemy.setCollider("rectangle",0,0,400,400)
   
    enemy.lifetime = 400
    enemyGroup.add(enemy)
  }

}