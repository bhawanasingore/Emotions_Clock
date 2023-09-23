const canvasSketch = require('canvas-sketch');

function drawClock(context, width, height) {
  const now = new Date();
  const radius = Math.min(width, height) * 0.4;

  // Clear the canvas
  context.clearRect(0, 0, width, height);

  // Modern color palette
  context.fillStyle = '#F2EFFF'; // Background color
  context.fillRect(0, 0, width, height);

  // Draw the clock face
  context.beginPath();
  context.arc(width / 2, height / 2, radius, 0, 2 * Math.PI);
  context.strokeStyle = '#CDC2F7'; // Clock face color
  context.lineWidth = 10;
  context.stroke();
  context.closePath();

  // Draw emojis instead of numbers
  const emojis = ['🥰', '🤣', '🥲', '😁', '😒', '😍', '😖', '😭', '😤', '😡', '🤔', '🤗'];
  context.font = 'bold 40px Arial';
  context.fillStyle = 'white'; // Emoji color
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  for (let hour = 1; hour <= 12; hour++) {
    const hourAngle = (2 * Math.PI * (hour - 3)) / 12;
    const x = width / 2 + (radius - 30) * Math.cos(hourAngle);
    const y = height / 2 + (radius - 30) * Math.sin(hourAngle);
    context.fillText(emojis[hour - 1], x, y);
  }

  // Draw the clock hands with smooth transitions
  const second = now.getSeconds();
  const minute = now.getMinutes();
  const hour = now.getHours() % 12;

  const secondAngle = (2 * Math.PI * (second + now.getMilliseconds() / 1000)) / 60;
  const minuteAngle = (2 * Math.PI * (minute + second / 60)) / 60;
  const hourAngle = (2 * Math.PI * (hour + minute / 60)) / 12;

  drawHand(context, width / 2, height / 2, secondAngle, radius * 0.9, 5, '#CDC2F7');
  drawHand(context, width / 2, height / 2, minuteAngle, radius * 0.7, 5, '#CDC2F7');
  drawHand(context, width / 2, height / 2, hourAngle, radius * 0.5, 5, '#CDC2F7');
}

function drawHand(context, x, y, angle, length, width, color) {
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x + length * Math.cos(angle), y + length * Math.sin(angle));
  context.strokeStyle = color;
  context.lineWidth = width;
  context.lineCap = 'round';
  context.stroke();
  context.closePath();
}

const settings = {
  dimensions: [800, 800],
  animate: true,
  duration: 1,
  context: '2d',
  playbackRate: 'throttle',
};

canvasSketch(({ context, width, height }) => {
  return {
    render: () => {
      drawClock(context, width, height);
    },
  };
}, settings);
