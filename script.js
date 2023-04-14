var nav = document.querySelector("nav");

var section = document.querySelector("section");
var observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      nav.classList.add("scroll");
    } else nav.classList.remove("scroll");
  });
});

observer.observe(section);

var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");

const ARROW = {
  left: 37,
  up: 38,
  right: 39,
  //   down: 40,
};

const OFFSET = {
  x: 0,
  y: 0,
};

var DIRT_DEPTH = 20;
var HOUSE = {
  width: 30,
  height: 60,
};

game();

setInterval(() => {
  // if (paused) return;
  game();
}, 1000 / 60);

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function game() {
  //draw dirt
  clearCanvas();
  context.beginPath();
  context.rect(
    OFFSET.x,
    canvas.height - DIRT_DEPTH + OFFSET.y,
    canvas.width,
    DIRT_DEPTH
  );
  context.fillStyle = "pink";
  context.fill();

  //draw house
  context.beginPath();
  context.rect(
    20 + OFFSET.x,
    canvas.height - DIRT_DEPTH - HOUSE.height,
    HOUSE.width,
    HOUSE.height
  );
  context.fillStyle = "purple";
  context.fill();

  context.beginPath();
  context.rect(
    20 + OFFSET.x + HOUSE.width,
    canvas.height - DIRT_DEPTH - HOUSE.height,
    HOUSE.width * 2,
    HOUSE.height
  );
  context.fillStyle = "violet";
  context.fill();

  context.beginPath();
  context.setTransform(1, 0, -1, 1, 0, 0);
  context.rect(OFFSET.x + HOUSE.width * 3, HOUSE.height, HOUSE.width * 2.5, 20);
  context.fillStyle = "purple";
  context.fill();
  context.resetTransform();

  context.beginPath();
  context.setTransform(1, 0, 1, 1, 0, 0);
  context.rect(OFFSET.x - HOUSE.width, HOUSE.height, HOUSE.width * 2.5, 20);
  context.fillStyle = "violet";
  context.fill();
  context.resetTransform();

  //draw tree
  context.beginPath();
  context.moveTo(canvas.width - 50, canvas.height - DIRT_DEPTH);
  context.lineTo(canvas.width - 50, canvas.height - DIRT_DEPTH - 50);
  context.arcTo();
  context.stroke();
}

window.onkeydown = (e) => {
  if (e.keyCode === ARROW.left) OFFSET.x += -5;
  if (e.keyCode === ARROW.right) OFFSET.x += 5;
};
