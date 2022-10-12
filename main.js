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

/**
* @typedef {{
* pos: Vector, size: Vector
* }} Star
*/
  
/**
* @type  { Star [] }
*/
let stars = [];
startick = 0;

/** @type {{pos: Vector, size: Vector}} */
let player;

function update() {
  //startup function
  if (!ticks) {
    player = { pos: vec(G.WIDTH/2, 97), vx: 0, ty: 90 };
  }
  
  color("black")
  const c = char(addWithCharCode("a", floor(ticks / 15) % 2), player.pos, {
    mirror: { x: player.vx < 0 ? -1 : 1 },
  }).isColliding;

  if (input.isPressed && player.pos.y > 5) {
    player.pos.y -= 1;
  }else{
    if(player.pos.y < G.HEIGHT-102){
      player.pos.y += 1;
    }
  }
  
}

addEventListener("load", onLoad);