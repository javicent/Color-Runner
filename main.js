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

let currentLevel = 1;

let colorChangeDistance = 4;

function update() {
  //startup function
  if (!ticks) {
    player = { pos: vec(10, G.HEIGHT - 10), vx: 0, ty: 90, color: "black"};
    redCube = { pos: vec(4*G.WIDTH/5, 14*G.HEIGHT/16), speed: 1};
    blueCube = { pos: vec(4*G.WIDTH/5, 12*G.HEIGHT/16), speed: 1};
    rPlatform = { pos: vec(G.WIDTH + 100, G.HEIGHT - 67), size: vec(20, 5)};
    bPlatform = { pos: vec(G.WIDTH + 300, G.HEIGHT - 67), size: vec(20, 5)};
  }

  //platforms
  color("light_black");
  rect(0, G.HEIGHT - 67, G.WIDTH, 5);

  color("light_black");
  rect(0, G.HEIGHT - 10, G.WIDTH, 7);
  

  color("red");
  rect(rPlatform.pos.x,rPlatform.pos.y,rPlatform.size.x,rPlatform.size.y)
  rPlatform.pos.x --;
  if (rPlatform.pos.x < rPlatform.size.x*-1) {
    rPlatform.pos.x = rnd(G.WIDTH,G.WIDTH+100);
  }

  color("blue");
  rect(bPlatform.pos.x,bPlatform.pos.y,bPlatform.size.x,bPlatform.size.y)
  bPlatform.pos.x --;
  if (bPlatform.pos.x < bPlatform.size.x*-1) {
    bPlatform.pos.x = rnd(G.WIDTH,G.WIDTH+100);
  }

  //player
  color(player.color)
  const c = char(addWithCharCode("a", floor(ticks / 15) % 2), player.pos, {
    mirror: { x: player.vx < 0 ? -1 : 1 },
  }).isColliding;
  
  if(player.pos.y < G.HEIGHT - 60){
    console.log('good');
  }
  if(currentLevel == 1){
    if(canPass()){
      player.pos.y -= 25;
      currentLevel = 2;
    }else 
      if (input.isPressed && player.pos.y > G.HEIGHT - 60) {
        player.pos.y -= 1;
        if(player.pos.y < G.HEIGHT - 60){
          currentLevel = 2;
        }
      }else{
        if(!player.pos.isInRect(0, G.HEIGHT - 13, G.WIDTH, 100)){
          player.pos.y += 1;
        }
      }    
    }

    

    if(currentLevel == 2){
//      console.log(player.pos.y);
      if(canPass() && player.pos.y < G.HEIGHT - 64){
        player.pos.y += 25;
        currentLevel = 1;
      }
       
      if (input.isPressed && player.pos.y > G.HEIGHT - 100) {
        player.pos.y -= 1;
      }else{
        if(!player.pos.isInRect(0, G.HEIGHT - 70, G.WIDTH, 100)){
          player.pos.y += 1;
        }
      }    
      if (input.isPressed && player.pos.y > 5) {
        player.pos.y -= 1;
      }else{
        if(!player.pos.isInRect(0, G.HEIGHT - 70, G.WIDTH, 5)){
          player.pos.y += 1;
        }
      }    
    }


  //red cube
  color("red");
  redCube.pos.x -= redCube.speed;
  if (redCube.pos.x < 0) {
    redCube.pos.x = G.WIDTH;
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
    blueCube.pos.x = G.WIDTH;
  }
  //blue cube collision
  if (abs(blueCube.pos.y - player.pos.y) < colorChangeDistance && abs(blueCube.pos.x - player.pos.x) < colorChangeDistance) {
    player.color = "blue";
  }
  box(blueCube.pos, 3);
}
  function canPass(){
    //Red Collisions
    if(player.pos.isInRect(rPlatform.pos.x,rPlatform.pos.y-3,rPlatform.size.x,rPlatform.size.y*2+1) && player.color == 'red'){
      return true;
    }
    if(player.pos.isInRect(rPlatform.pos.x,rPlatform.pos.y-3,rPlatform.size.x,rPlatform.size.y*2+1) && player.color == 'blue'){
      return end();
    }
    //Blue Collisions
    if(player.pos.isInRect(bPlatform.pos.x,bPlatform.pos.y-3,bPlatform.size.x,bPlatform.size.y*2+1) && player.color == 'blue'){
      return true;
    }
    if(player.pos.isInRect(bPlatform.pos.x,bPlatform.pos.y-3,bPlatform.size.x,bPlatform.size.y*2+1) && player.color == 'red'){
      return end();
    }
    else
    {
      return false;
    }
  }

addEventListener("load", onLoad);