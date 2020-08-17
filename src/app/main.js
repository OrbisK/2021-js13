let canvas = document.createElement('canvas');

canvas.id = "canvas"
canvas.width = 600;
canvas.height = 600;

let body = document.getElementsByTagName("body")[0];
body.appendChild(canvas);

if (canvas.getContext) {
  let ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.translate(225, 225);
  ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
  ctx.moveTo(110, 75);
  ctx.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)
  ctx.moveTo(65, 65);
  ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
  ctx.moveTo(95, 65);
  ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye
  ctx.stroke();
}
