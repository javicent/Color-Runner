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

/** @type {{pos: Vector, size: Vector}} */
let player;

/** @type {{pos: Vector, speed: Int}} */
let redCube;

/** @type {{pos: Vector, speed: Int}} */
let blueCube;

function update() {
  //startup function
  if (!ticks) {
    player = { pos: vec(10, G.HEIGHT - 10), vx: 0, ty: 90 };
    redCube = { pos: vec(4*G.WIDTH/5, 14*G.HEIGHT/16), speed: 1};
    blueCube = { pos: vec(4*G.WIDTH/5, 12*G.HEIGHT/16), speed: 1};
  }
  
  color("black")
  const c = char(addWithCharCode("a", floor(ticks / 15) % 2), player.pos, {
    mirror: { x: player.vx < 0 ? -1 : 1 },
  }).isColliding;

  if (input.isPressed && player.pos.y > 5) {
    player.pos.y -= 1;
  }else{
    if(player.pos.y < G.HEIGHT -10){
      player.pos.y += 1;
    }
  }

  //red cube
  color("red");
  redCube.pos.x -= redCube.speed;
  if (redCube.pos.x < 0) {
    redCube.pos.x = G.WIDTH;
  }
  box(redCube.pos, 3);

  //blue cube
  color("blue");
  blueCube.pos.x -= blueCube.speed;
  if (blueCube.pos.x < 0) {
    blueCube.pos.x = G.WIDTH;
  }
  box(blueCube.pos, 3);

  color("light_black");
  rect(0, G.HEIGHT - 7, G.WIDTH, 100);
}

addEventListener("load", onLoad);