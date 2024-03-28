const bouncingBox = document.querySelector('.bouncing-box');

let dx = 2; // Horizontal velocity
let dy = 2; // Vertical velocity

function moveBox() {
  const box = bouncingBox;

  let left = parseInt(box.style.left) || 0;
  let top = parseInt(box.style.top) || 0;

  left += dx;
  top += dy;

  if (left <= 0 || left + box.offsetWidth >= window.innerWidth) {
    dx = -dx; // Reverse horizontal velocity
  }

  if (top <= 0 || top + box.offsetHeight >= window.innerHeight) {
    dy = -dy; // Reverse vertical velocity
  }

  box.style.left = left + 'px';
  box.style.top = top + 'px';
}

function animate() {
  moveBox();
  requestAnimationFrame(animate);
}

animate();
