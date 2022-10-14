title = "Color Runner";

description = `

`;

/*
referenced code from 
https://abagames.github.io/crisp-game-lib-games/?liftup
https://github.com/JunoNgx/crisp-game-lib-tutorial#step-01-basic-drawing-and-update-stars
*/

characters = [
  `
llllll
ll l l
ll l l
llllll
 l  l
 l  l
  `,
  `
llllll
ll l l
ll l l
llllll
ll  ll
  `
];

const G = {
  WIDTH: 400,
  HEIGHT: 225,
  SPEED: 1,
  WIDTH_MIN: 5,
  WIDTH_MAX: 20,
  HEIGHT_MIN: 5,
  HEIGHT_MAX: 20,
};

options = {
  viewSize: {x: G.WIDTH, y: G.HEIGHT},
  isPlayingBgm: true,
  isReplayEnabled: true,
  isDrawingScoreFront: true,
  theme: "blue"
};

/** @type {{pos: Vector, size: Vector, color: String}} */
let player;

/** @type {{pos: Vector, speed: Int}} */
let redCube;

/** @type {{pos: Vector, speed: Int}} */
let blueCube;

/** @type {{pos: Vector, size: Vector}}*/
let platform;

/** @type {{pos: Vector, size: Vector}}*/
let obstacle;

let currentLevel = 1;

let colorChangeDistance = 4;

function update() {
  //startup function
  if (!ticks) {
    player = { pos: vec(10, G.HEIGHT - 10), vx: 0, ty: 90, color: "black"};
    redCube = { pos: vec(G.WIDTH, G.HEIGHT - 25), speed: 1};
    blueCube = { pos: vec(G.WIDTH, G.HEIGHT - 40), speed: 1};
    greenCube = { pos: vec(G.WIDTH + 100, G.HEIGHT - 40), speed: 1};
    
    rPlatform = { pos: vec(G.WIDTH + 100, G.HEIGHT - 60), size: vec(20, 5)};
    bPlatform = { pos: vec(G.WIDTH + 300, G.HEIGHT - 60), size: vec(20, 5)};
    gPlatform = { pos: vec(G.WIDTH + 200, G.HEIGHT - Math.floor(rnd(0,3))*50 - 60), size: vec(20, 5)};

    rOb = { pos: vec(G.WIDTH + 10, G.HEIGHT - 35), size: vec(5, 25)}
    bOb = { pos: vec(G.WIDTH + 40, G.HEIGHT - 85), size: vec(5, 25)}
    gOb = { pos: vec(G.WIDTH + 90, G.HEIGHT - 135), size: vec(5, 25)}
  }
  console.log(player.pos.y);
  //platforms
  color("light_black");
  rect(0, G.HEIGHT - 10, G.WIDTH, 10);

  color("light_black");
  rect(0, G.HEIGHT - 60, G.WIDTH, 5);

  color("light_black")
  rect(0, G.HEIGHT - 110, G.WIDTH, 5);

  color("light_black")
  rect(0, G.HEIGHT - 160, G.WIDTH, 5);

  color("light_black")
  rect(0, 0, G.WIDTH, G.HEIGHT - 210);

  color("red");
  rect(rPlatform.pos.x,rPlatform.pos.y,rPlatform.size.x,rPlatform.size.y)
  rPlatform.pos.x --;
  if (rPlatform.pos.x < rPlatform.size.x*-1) {
    rPlatform.pos.x = rnd(G.WIDTH,G.WIDTH+100);
    rPlatform.pos.y = G.HEIGHT - Math.floor(rnd(0,3))*50 - 60;
  }

  color("blue");
  rect(bPlatform.pos.x,bPlatform.pos.y,bPlatform.size.x,bPlatform.size.y)
  bPlatform.pos.x --;
  if (bPlatform.pos.x < bPlatform.size.x*-1) {
    bPlatform.pos.x = rnd(G.WIDTH,G.WIDTH+100);
    bPlatform.pos.y = G.HEIGHT - Math.floor(rnd(0,3))*50 - 60;
  }

  color('green');
  rect(gPlatform.pos.x,gPlatform.pos.y,gPlatform.size.x,gPlatform.size.y)
  gPlatform.pos.x --;
  if (gPlatform.pos.x < gPlatform.size.x*-1) {
    gPlatform.pos.x = rnd(G.WIDTH,G.WIDTH+100);
    gPlatform.pos.y = G.HEIGHT - Math.floor(rnd(0,3))*50 - 60;
  }

  color("red");
  rect(rOb.pos.x,rOb.pos.y,rOb.size.x,rOb.size.y)
  rOb.pos.x --;
  if (rOb.pos.x < rOb.size.x*-1) {
    rOb.pos.x = rnd(G.WIDTH,G.WIDTH+100);
    rOb.pos.y = G.HEIGHT - Math.floor(rnd(0,3))*50 - 35;
  }

  color("blue");
  rect(bOb.pos.x,bOb.pos.y,bOb.size.x,bOb.size.y)
  bOb.pos.x --;
  if (bOb.pos.x < bOb.size.x*-1) {
    bOb.pos.x = rnd(G.WIDTH,G.WIDTH+100);
    bOb.pos.y = G.HEIGHT - Math.floor(rnd(0,3))*50 - 35;
  }

  color("green");
  rect(gOb.pos.x,gOb.pos.y,gOb.size.x,gOb.size.y)
  gOb.pos.x --;
  if (gOb.pos.x < gOb.size.x*-1) {
    gOb.pos.x = rnd(G.WIDTH,G.WIDTH+100);
    gOb.pos.y = G.HEIGHT - Math.floor(rnd(0,3))*50 - 35;
  }

  //player
  color(player.color)
  const c = char(addWithCharCode("a", floor(ticks / 15) % 2), player.pos, {
    mirror: { x: player.vx < 0 ? -1 : 1 },
  }).isColliding;
  
  if(currentLevel == 1){
    if(canPass()){
      player.pos.y -= 10;
      currentLevel++;
    }else 
      if (input.isPressed && player.pos.y > G.HEIGHT - 53) {
        player.pos.y -= 1;
        if(player.pos.y < G.HEIGHT - 53){
          currentLevel++;
        }
      }else{
        if(!player.pos.isInRect(0, G.HEIGHT - 13, G.WIDTH, 100)){
          player.pos.y += 1;
        }
      }    
    }

    if(currentLevel == 2){
      if(canPass() && player.pos.y > G.HEIGHT - 71){
        player.pos.y += 10;
        currentLevel--;
      }
      if(canPass() && player.pos.y <= G.HEIGHT - 103){
        player.pos.y -= 10;
        currentLevel++;
      }
      if (input.isPressed && player.pos.y > G.HEIGHT - 103) {
        player.pos.y -= 1;
      }else{
        if(!player.pos.isInRect(0, G.HEIGHT - 63, G.WIDTH, 100)){
          player.pos.y += 1;
        }
      }    
      if (input.isPressed && player.pos.y > 5) {
        player.pos.y -= 1;
      }else{
        if(!player.pos.isInRect(0, G.HEIGHT - 63, G.WIDTH, 5)){
          player.pos.y += 1;
        }
      }      
    }
    if(currentLevel == 3){
      if(canPass() && player.pos.y > G.HEIGHT - 114){
        player.pos.y += 10;
        currentLevel--;
      }
      if(canPass() && player.pos.y < G.HEIGHT - 152){
        player.pos.y -= 10;
        currentLevel++;
      }
      if (input.isPressed && player.pos.y > G.HEIGHT - 153) {
        player.pos.y -= 1;
      }else{
        if(!player.pos.isInRect(0, G.HEIGHT - 113, G.WIDTH, 100)){
          player.pos.y += 1;
        }
      }    
      if (input.isPressed && player.pos.y > 5) {
        player.pos.y -= 1;
      }else{
        if(!player.pos.isInRect(0, G.HEIGHT - 113, G.WIDTH, 5)){
          player.pos.y += 1;
        }
      }
    }
    if(currentLevel == 4){
      if(canPass() && player.pos.y > G.HEIGHT - 164){
        player.pos.y += 10;
        currentLevel--;
      }
      if(canPass() && player.pos.y < G.HEIGHT - 202){
        player.pos.y -= 10;
        currentLevel++;
      }
      if (input.isPressed && player.pos.y > G.HEIGHT - 207) {
        player.pos.y -= 1;
      }else{
        if(!player.pos.isInRect(0, G.HEIGHT - 163, G.WIDTH, 100)){
          player.pos.y += 1;
        }
      }    
      if (input.isPressed && player.pos.y > 5) {
        player.pos.y -= 1;
      }else{
        if(!player.pos.isInRect(0, G.HEIGHT - 163, G.WIDTH, 5)){
          player.pos.y += 1;
        }
      }
    }
  //red cube
  color("red");
  redCube.pos.x -= redCube.speed;
  if (redCube.pos.x < 0) {
    redCube.pos.x = rnd(G.WIDTH, G.WIDTH + 200);
    redCube.pos.x = G.WIDTH;
    redCube.pos.y = G.HEIGHT - Math.floor(rnd(0,3))*50 - 25;    
  }
  //red cube collision
  if (abs(redCube.pos.y - player.pos.y) < colorChangeDistance && abs(redCube.pos.x - player.pos.x) < colorChangeDistance) {
    player.color = "red";
  }
  box(redCube.pos, 3);
  //blue cube
  color("blue");
  blueCube.pos.x -= blueCube.speed;
  if (blueCube.pos.x < 0) {
    blueCube.pos.x = rnd(G.WIDTH, G.WIDTH + 200);
    blueCube.pos.y = G.HEIGHT - Math.floor(rnd(0,3))*50 - 40;      }
  //blue cube collision
  if (abs(blueCube.pos.y - player.pos.y) < colorChangeDistance && abs(blueCube.pos.x - player.pos.x) < colorChangeDistance) {
    player.color = "blue";
  }
  box(blueCube.pos, 3);
  //green cube
  color("green");
  greenCube.pos.x -= greenCube.speed;
  if (greenCube.pos.x < 0) {
    greenCube.pos.x = rnd(G.WIDTH, G.WIDTH + 200);
    greenCube.pos.y = G.HEIGHT - Math.floor(rnd(0,3))*50 - 40;      }
  //green cube collision
  if (abs(greenCube.pos.y - player.pos.y) < colorChangeDistance && abs(greenCube.pos.x - player.pos.x) < colorChangeDistance) {
    player.color = "green";
  }
  box(greenCube.pos, 3);
}
function canPass(){
  //Red Collisions
  if(player.pos.isInRect(rPlatform.pos.x,rPlatform.pos.y-3,rPlatform.size.x,rPlatform.size.y*2+1) && player.color == 'red'){
    play("coin");
    return true;
  }
  if(player.pos.isInRect(rPlatform.pos.x,rPlatform.pos.y-3,rPlatform.size.x,rPlatform.size.y*2+1) && player.color != 'red'){
    play("explosion");
    return end();
  }
  //Blue Collisions
  if(player.pos.isInRect(bPlatform.pos.x,bPlatform.pos.y-3,bPlatform.size.x,bPlatform.size.y*2+1) && player.color == 'blue'){
    play("coin");
    return true;
  }
  if(player.pos.isInRect(bPlatform.pos.x,bPlatform.pos.y-3,bPlatform.size.x,bPlatform.size.y*2+1) && player.color != 'blue'){
    play("explosion");
    return end();
  }
  // Green Collisions
  if(player.pos.isInRect(gPlatform.pos.x,gPlatform.pos.y-3,gPlatform.size.x,gPlatform.size.y*2+1) && player.color == 'green'){
    play("coin");
    return true;
  }
  if(player.pos.isInRect(gPlatform.pos.x,gPlatform.pos.y-3,gPlatform.size.x,gPlatform.size.y*2+1) && player.color != 'green'){
    play("explosion");
    return end();
  }
  else
  {
    return false;
  }
}

addEventListener("load", onLoad);