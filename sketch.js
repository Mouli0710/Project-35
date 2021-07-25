//Create variables here
var dog,dog1,dog2;
var database;
var foodS,foodStock;


function preload()
{
	//load images here
  dog1 = loadImage("dogImg.png");
  dog2 = loadImage("dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);

  dog = createSprite(250,300,150,150);
  dog.addImage(dog1);
  dog.scale = 0.2;

  foodStock = database.ref("food");
  foodStock.on("value",readStock);

  
}


function draw() {  
 background("green");

 if(keyWentDown(UP_ARROW)){
   writeStock(foodS);
   dog.addImage(dog2)
 }
 
  drawSprites();
  //add styles here
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
  
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0
  }
  else{
   x = x-1
  }
  database.ref("/").update({
    food:x
  })
}
