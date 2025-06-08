const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confettis = [];

document.getElementById('confetti-btn').addEventListener('mouseenter', (e) => {
  const { x, y, width, height } = e.target.getBoundingClientRect();
  for (let i = 0; i < 40; i++) {
    confettis.push({
      x: x + width / 2,
      y: y + height / 2,
      dx: (Math.random() - 0.5) * 6,
      dy: Math.random() * -4 - 2,
      width: 4,
      height: 10,
      angle: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      color: `hsl(${Math.random() * 360}, 80%, 60%)`,
      alpha: 1
    });
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettis.forEach((c, i) => {
    c.x += c.dx;
    c.y += c.dy;
    c.dy += 0.2; // gravity
    c.angle += c.rotationSpeed;
    c.alpha -= 0.01;

    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.rotate((c.angle * Math.PI) / 180);
    ctx.fillStyle = c.color;
    ctx.globalAlpha = c.alpha;
    ctx.fillRect(-c.width / 2, -c.height / 2, c.width, c.height);
    ctx.restore();

    if (c.alpha <= 0) confettis.splice(i, 1);
  });
  requestAnimationFrame(animate);
}
animate();
