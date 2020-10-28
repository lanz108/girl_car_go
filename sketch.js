//collect as much as energy you can and stay away from the rocks!
var girl, girlImage;
var forest, forestImage, forestGroup;
var water,waterImage, waterGroup;
var rock,rockImge,rockGroup;
var invisibleground;
var gameState="play";
var score;
var collected;
var restart,restartIcon;
var gameOver,gameOverIcon;

function preload(){
  girlImage = loadImage("girl1.png");
  forestImage= loadImage("forest.png");
  waterImage = loadImage("water.png");
  rockImage = loadImage("obstacle.png");
  restartIcon= loadImage("restart2.png");
  gameOverIcon=loadImage("over2.png");
}

function setup(){
 createCanvas(400,400)

  //creating the girl
  girl= createSprite(80, 350, 20, 20);
  girl.addImage(girlImage);
  girl.scale = 0.05;
  
  //creating the forest
  forest=createSprite(400,200);
  forest.addImage(forestImage);
  //giving velocity to the background
  forest.velocityX=-3;
  
  //crearting the invisible ground
  invisibleground=createSprite(400,350,900,10);
  invisibleground.visible=false;
  
  waterGroup=new Group();
  rockGroup= new Group();
  
  //gameOver icon
  gameOver= createSprite(200,150)
  gameOver.addImage(gameOverIcon);
  gameOver.scale=0.5;
  
  //restart icon
  restart = createSprite(200,50);
  restart.addImage(restartIcon);
  restart.scale=0.2;
  
 // score
  score=0;
  
 // energy collected
  collected = 0;
  
  }

function draw(){
  background(220);
  
  // when the game is in play state, the following things       happen
  if (gameState==="play"){
    //visibility of the icons(false)
     restart.visible=false;
    gameOver.visible=false;
    
    //the velocity of the background increases alonmg with         the score
    forest.velocityX = -(3 + 3* score/100)
    
    // the score increases every 60 frame
   score = score + Math.round(getFrameRate()/60);
    
    //resetting the background
    if (forest.x < 0){
      forest.x = forest.width/2;}
    
    //resetting the invisible ground
    if (invisibleground.x<0){
    invisibleground.x= invisibleground.width/2
    }
    
  //the girl jumps when the space key is pressed 
    if (keyDown("space")&& girl.y >= 200){
    
      girl.velocityY=-12;
    
    }
  
    // gravity effect
    girl.velocityY=girl.velocityY+0.8;
  
    // the Energy increses 
    if (waterGroup.isTouching(girl)) {
    collected=collected+1;
    waterGroup.destroyEach();
    }
    //the game goes to end state
    if (rockGroup.isTouching(girl)) {
    
    gameState = "end";
    
    }
    // setting the depth
    forest.dept= girl.depth
    girl.depth= girl.depth+1;
    energy();
    rocks();
    
  // displaying the "Score" and "Energy consumed"
    text("Score: "+ score, 300,50);
    text("Energy consumed: "+collected,100,50);
    }
  
  // the following things happens when the game goes to end     state
  else if (gameState==="end"){
    //visibility of the icons(true)
    restart.visible=true;
    gameOver.visible=true;
    //velocity of the forest
    forest.velocityX=0; 
    
     waterGroup.destroyEach();
    rockGroup.destroyEach();
           
           }
  //collision of the girl with the invisible ground
   girl.collide(invisibleground);
    
  if(mousePressedOver(restart)) {
       reset();
    }
  drawSprites();
  }

//for resetting the game
function reset(){
    gameState="play";
    restart.visible=false;
    gameOver.visible=false;
    waterGroup.destroyEach();
    rockGroup.destroyEach();
    score=0;
    collected=0;
}

//spawning the energy
function energy(){
    if (frameCount % 250=== 0){
     var water  = createSprite(400,330);
      water.y= Math.round(random(120,200));
      water.velocityX = -4;
      water.addImage(waterImage);
      water.scale=0.1;
      water.lifetime=100;
     
     waterGroup.add(water);
   }
  
}

//spawning the rock
function rocks(){
    if (frameCount % 400 === 0){
     var rock  = createSprite(400,330);
     rock.velocityX = -5;
     rock.addImage(rockImage);
     rock.scale=0.2;
     rock.lifetime=100;
     
     rockGroup.add(rock);
   }
  
}
