const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gravity = 0.5;
let groundHeight = canvas.height - 100;

// Auto
let car = {
    x: 100,
    y: groundHeight - 40,
    width: 80,
    height: 40,
    velocityY: 0,
    rotation: 0,
    rotationSpeed: 0
};

// Hügel-Generierung
let hills = [];
for (let i = 0; i < 50; i++) {
    hills.push({
        x: i * 200,
        y: groundHeight - Math.random() * 100
    });
}

let gasPressed = false;
let brakePressed = false;

// Steuerung
document.getElementById("gas").addEventListener("touchstart", () => gasPressed = true);
document.getElementById("gas").addEventListener("touchend", () => gasPressed = false);
document.getElementById("brake").addEventListener("touchstart", () => brakePressed = true);
document.getElementById("brake").addEventListener("touchend", () => brakePressed = false);

// Spielschleife
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Boden & Hügel zeichnen
    ctx.beginPath();
    ctx.moveTo(0, groundHeight);
    for (let h of hills) {
        ctx.lineTo(h.x - car.x + 100, h.y);
    }
    ctx.lineTo(canvas.width, groundHeight);
    ctx.fillStyle = "#654321";
    ctx.fill();

    // Auto-Physik
    if (gasPressed) car.x += 5;
    if (brakePressed) car.x -= 3;

    car.y += car.velocityY;
    car.velocityY += gravity;

    if (car.y > groundHeight - car.height) {
        car.y = groundHeight - car.height;
        car.velocityY = 0;
    }

    // Auto zeichnen
    ctx.save();
    ctx.translate(100, car.y);
    ctx.rotate(car.rotation);
    ctx.fillStyle = "red";
    ctx.fillRect(-car.width / 2, -car.height / 2, car.width, car.height);
    ctx.restore();

    requestAnimationFrame(gameLoop);
}

gameLoop();
