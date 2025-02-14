// Get the canvas element
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions to match the window size
function resizeCanvas() {
  const drawingBoard = document.querySelector('.drawing-board');
  canvas.width = drawingBoard.clientWidth;
  canvas.height = drawingBoard.clientHeight;
}

// Call the resize function initially
resizeCanvas();

// Add event listener to window resize
window.addEventListener('resize', resizeCanvas);

// Define variables
let painting = false;
let defaultBrushSize = 3; // Default brush size
ctx.strokeStyle = 'black';

// Add event listeners for pointer input
canvas.addEventListener('pointerdown', (e) => {
  if (e.pointerType === 'pen' && e.pressure > 0) {
    startDrawing(e.clientX, e.clientY);
    e.preventDefault(); // Disable scrolling for stylus
  }
});

canvas.addEventListener('pointermove', (e) => {
  if (e.pointerType === 'pen' && painting) {
    draw(e.clientX, e.clientY, e.pressure);
    e.preventDefault(); // Disable scrolling for stylus
  }
});

canvas.addEventListener('pointerup', (e) => {
  if (e.pointerType === 'pen') {
    stopDrawing();
  }
});

// Ensure touch scrolling works outside the canvas
canvas.addEventListener('touchstart', (e) => {
  if (e.target === canvas) {
    e.preventDefault(); // Prevent scrolling for canvas touch input
  }
});

// Add event listeners for mouse input
canvas.addEventListener('mousedown', (e) => {
  if (e.buttons === 1) { // Left mouse button
    startDrawing(e.clientX, e.clientY);
  }
});

canvas.addEventListener('mousemove', (e) => {
  if (e.buttons === 1 && painting) {
    draw(e.clientX, e.clientY);
  }
});

canvas.addEventListener('mouseup', () => {
  stopDrawing();
});

// Add event listeners for touch input
canvas.addEventListener('touchstart', (e) => {
  if (e.touches.length === 1) { // Single finger touch
    startDrawing(e.touches[0].clientX, e.touches[0].clientY);
  }
});

canvas.addEventListener('touchmove', (e) => {
  if (e.touches.length === 1 && painting) {
    draw(e.touches[0].clientX, e.touches[0].clientY);
  }
});

canvas.addEventListener('touchend', () => {
  stopDrawing();
});

// Drawing helper functions
function startDrawing(clientX, clientY) {
  painting = true;
  const { x, y } = getCanvasCoordinates(clientX, clientY);
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function draw(clientX, clientY, pressure = 1) {
  const { x, y } = getCanvasCoordinates(clientX, clientY);
  ctx.lineWidth = defaultBrushSize * pressure; // Adjust line width by pressure
  ctx.lineTo(x, y);
  ctx.stroke();
}

function stopDrawing() {
  painting = false;
  ctx.closePath();
}

// Utility function to get canvas coordinates
function getCanvasCoordinates(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
  };
}

// Prevent scrolling for stylus interactions outside canvas
document.addEventListener('pointermove', (e) => {
  if (e.pointerType === 'pen' && e.target !== canvas) {
    e.preventDefault();
  }
});

// Change cursor dynamically during drawing
canvas.addEventListener('pointerdown', () => {
  canvas.style.cursor = 'url("../images/Cursors/pencursoractive18.png") 0 30, auto'; // Change to active cursor
});

canvas.addEventListener('pointerup', () => {
  canvas.style.cursor = 'url("../images/Cursors/pencursor18.png")0 30, auto'; // Revert to default cursor
});