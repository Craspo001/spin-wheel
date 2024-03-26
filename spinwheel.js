 let balance = 5000; // Initial balance
 window.onload = function() {
    alert("Welcome to Spin the Wheel! Place your bets and spin to win!");

    // Your existing JavaScript code
    let balance = 5000; // Initial balance
    const segments = ['Win $10', 'Lose', 'Win $20', 'Lose', 'Win $50', 'Lose'];
    const colors = ['#eae56f', '#89f26e', '#7de6ef', '#e7706f', '#eae56f', '#89f26e'];
    let playerBalance = 100; // Starting balance

    // Function to get the selected player type (bot or player)
    function getPlayerType() {
        const playerRadio = document.getElementById('playerRadio');
        return playerRadio.checked ? 'player' : 'bot';
    }

    // Rest of your JavaScript code...
};


// Function to draw the wheel with sections
function drawWheelWithSections() {
    const numSections = 10; // Number of sections on the wheel
    const sectionAngle = (2 * Math.PI) / numSections; // Angle for each section

    // Define colors for each section
    const sectionColors = [
        'darkblue', 'blue', 'darkblue', 'blue', 'darkblue',
        'blue', 'darkblue', 'blue', 'darkblue', 'blue'
    ];

    // Get the canvas and context
    const canvas = document.getElementById('wheelCanvas');
    const context = canvas.getContext('2d');

    // Calculate the center and radius of the wheel
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const wheelRadius = Math.min(canvas.width, canvas.height) / 2 - 10;

    // Draw the sections
    for (let i = 0; i < numSections; i++) {
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.arc(centerX, centerY, wheelRadius, i * sectionAngle, (i + 1) * sectionAngle);
        context.closePath();
        context.fillStyle = sectionColors[i];
        context.fill();

        // Add text to each section (optional)
        context.save();
        context.translate(centerX, centerY);
        context.rotate(i * sectionAngle + sectionAngle / 2);
        context.textAlign = "center";
        context.fillStyle = "white";
        context.font = "bold 20px Arial";
        context.fillText("Value " + (i + 1), wheelRadius / 2, 0);
        context.restore();
    }

    // Draw the pointer (optional)
    const pointerLength = wheelRadius / 2;
    const pointerWidth = 5;
    context.beginPath();
    context.moveTo(centerX + wheelRadius + pointerWidth / 2, centerY);
    context.lineTo(centerX + wheelRadius + pointerWidth / 2 + pointerLength, centerY);
    context.lineTo(centerX + wheelRadius + pointerWidth / 2 + pointerLength / 2, centerY - 10);
    context.lineTo(centerX + wheelRadius + pointerWidth / 2, centerY);
    context.closePath();
    context.fillStyle = 'black';
    context.fill();
}

// Function to spin the wheel with animation
function spinWheel() {
    // Prompt the user to confirm the bet
    const confirmed = window.confirm("Are you sure you want to place this bet?");

    // If the user cancels the confirmation, do nothing
    if (!confirmed) {
        return;
    }

    // Get the bet amount
    const betAmount = parseInt(document.getElementById('bet').value);
    if (isNaN(betAmount) || betAmount < 1000 || betAmount > balance) {
        alert("Please enter a valid bet amount (minimum 1000 and less than your balance).");
        return;
    }

    // Deduct the bet amount from the balance
    balance -= betAmount;

    // Generate a random seed using current time
    const seed = new Date().getTime();
    Math.seedrandom(seed);

    // Calculate a random number of rotations and a random initial angular velocity
    const numRotations = Math.floor(Math.random() * 0) + 20; // Random number of rotations between 20 and 40
    const initialAngularVelocity = Math.random() * 2 + 3; // Random initial angular velocity between 3 and 5

    // Calculate the total rotation angle (in radians)
    const totalRotation = numRotations * 2 * Math.PI;

    // Define easing parameters
    const startEasingFactor = 0.95; // Easing factor at the start of the spin
    const endEasingFactor = 0.7; // Easing factor at the end of the spin

    // Define a variable to keep track of the current rotation angle and angular velocity
    let currentRotation = 1;
    let currentAngularVelocity = initialAngularVelocity;
    

    console.log("Starting animation...");

    console.log("Updating rotation angle:", currentRotation);


    // Function to update the wheel's rotation
    function updateWheelRotation() {
        // Clear the canvas
        const canvas = document.getElementById('wheelCanvas');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the wheel with sections
        drawWheelWithSections();

        // Update the rotation angle based on the current angular velocity
        currentRotation += currentAngularVelocity;

        // Calculate the easing factor based on the current rotation progress
        const progress = currentRotation / totalRotation;
        const easingFactor = startEasingFactor + (endEasingFactor - startEasingFactor) * progress;

        // Slow down the angular velocity using easing
        currentAngularVelocity *= easingFactor;

        // Check if the total rotation is reached or if the angular velocity is too low
        if (currentRotation < totalRotation && currentAngularVelocity > 0.1) {
            // Continue the animation
            requestAnimationFrame(updateWheelRotation);
        } else {
            console.log("Animation complete");

            // Calculate a random value for the result
            const resultIndex = Math.floor(Math.random() * 10);

            // Calculate winnings based on the result
            let winnings;
            if (resultIndex === 0) {
                winnings = betAmount * 10; // If the result is 0 (first section), winnings are 10 times the bet
            } else {
                winnings = betAmount * (10 - resultIndex); // Otherwise, winnings are proportional to the section index
            }

            // Update balance based on the outcome
            balance += winnings;

            // Display the result
            const resultValue = "Value " + (resultIndex + 1);
            document.getElementById('result').innerText = `You landed on: ${resultValue}. You won ${winnings}!`;

            // Update balance display
            document.getElementById('balance').innerText = `Balance: ${balance}`;
        }
    }

    // Start the animation
    updateWheelRotation();
}

// Call the drawWheelWithSections function when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    drawWheelWithSections();

    // Get the spin button and add click event listener
    const spinButton = document.getElementById('betSpinButton');
    spinButton.addEventListener('click', spinWheel);
});
function updateWheelRotation() {
    // Update rotation angle
    currentRotation += currentAngularVelocity;

    // Apply easing to angular velocity
    currentAngularVelocity *= easingFactor;

    // Continue animation if conditions are met
    if (currentRotation < totalRotation && currentAngularVelocity > 0.1) {
        requestAnimationFrame(updateWheelRotation);
    }
}