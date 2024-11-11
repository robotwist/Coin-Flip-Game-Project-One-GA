// Add event listeners for buttons
document.getElementById("headsBtn").addEventListener("click", () => playGame("Heads"));
document.getElementById("tailsBtn").addEventListener("click", () => playGame("Tails"));

let consecutiveWins = 0;
let linkUnlocked = false;

function playGame(playerChoice) {
  const computerChoice = getRandomChoice();
  animateCoinFlip();

  // Display results and handle win/loss logic
  if (playerChoice === computerChoice) {
    displayResult(`It's ${computerChoice}! You win! Songs will be written about you!`);
    handleWin();
  } else {
    displayResult(`It's ${computerChoice}. You lose. You are the worst!`);
    consecutiveWins = 0; // Reset on loss
  }
}

// Utility functions
function getRandomChoice() {
  return ["Heads", "Tails"][Math.floor(Math.random() * 2)];
}

function animateCoinFlip() {
  const coinImage = document.getElementById("coinImage");
  coinImage.style.transition = "transform 1s";
  coinImage.style.transform = "rotateY(180deg)";
  setTimeout(() => {
    coinImage.style.transform = "rotateY(0deg)";
  }, 1000);
}

function displayResult(message) {
  document.getElementById("result").textContent = message;
}

function handleWin() {
  consecutiveWins++;
  triggerConfetti();
  if (consecutiveWins === 3 && !linkUnlocked) {
    unlockSecretLink();
    linkUnlocked = true;
  }
}

function triggerConfetti() {
  try {
    confetti({
      particleCount: 200,
      spread: 170,
      origin: { y: 0.6 }
    });
  } catch (error) {
    console.error("Confetti error:", error);
  }
}

function unlockSecretLink() {
  const link = createSecretLink();
  document.body.appendChild(link);
}

function createSecretLink() {
  const link = document.createElement("a");
  link.href = "#";
  link.textContent = "Do you dare click this forbidden link?";
  link.style.position = "absolute";
  link.style.top = "10px";
  link.style.left = "10px";
  link.addEventListener("click", triggerEarthquake);
  return link;
}

function triggerEarthquake(event) {
  event.preventDefault();
  document.body.style.backgroundColor = "black";
  document.body.classList.add("earthquake");
  setTimeout(() => {
    document.body.classList.remove("earthquake");
    startCaveGame();
  }, 1000);
}

// Earthquake effect style
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 5px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(12deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(18deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
  }
  .earthquake {
    animation: shake 4.5s infinite;
  }
`;
document.head.appendChild(style);

function startCaveGame() {
  document.body.innerHTML = ''; // Clear existing content
  const caveContainer = createCaveContainer();
  document.body.appendChild(caveContainer);
}

function createCaveContainer() {
  const container = document.createElement('div');
  container.id = 'cave-game';
  container.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: grey;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 24px;
  `;

  const message = document.createElement('div');
  message.textContent = "Cave The Game.";
  container.appendChild(message);

  const button = document.createElement('button');
  button.textContent = "PRESS";
  button.style.cssText = `
    margin-top: 20px;
    padding: 15px 30px;
    background-color: silver;
    color: white;
    cursor: pointer;
    font-size: 24px;
  `;
  button.addEventListener("click", startTextStream);
  container.appendChild(button);

  return container;
}

// Text-based adventure sequence
let storyIndex = 0;
const storySegments = [
  "You awaken to the sound of dripping water.", "Are you dead?", "Do you need to call the plumber?", "You are lying face up.", "You are half submerged in quarters.", "It must've been a trapdoor in that coin flippage game.", "I knew there was a catch. I knew there was nothing free in life", "puts several quarters into pockets",
  "The darkness is very dark (darker than you remember)", "You call for mommy.", ". . .", "She does not answer.",
  "A faint glimmer of light appears up ahead.",
  "You hear strange noises echoing through the cavern walls.",
  "The path splits ahead; one way seems to lead downwards, the other upwards.",
  "You decide to go deeper into the cave...",
  "There is what must be a witch who howls at you..",
  ". . .",
  "Mommy?",
  "It is not your mother.",
  "You are flummoxed.", "You cry.", "You lament your existence.", 
  "You run into the end of the cave, a stalagtite impales you. You also die from exposure and dysentery but you still feel the sharp pain of cave rock through your body.",
  "This is not grotesque. These are just the facts. You are dead. This is the end. Deal with it. There will be no next chapter. The end."
];

function startTextStream() {
  let textContainer = document.getElementById("text-stream");
  if (!textContainer) {
    textContainer = document.createElement("div");
    textContainer.id = "text-stream";
    textContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 30%;
      height: 100%;
      overflow-y: scroll;
      color: white;
      font-size: 17px;
    `;
    document.body.appendChild(textContainer);
  }

  if (storyIndex < storySegments.length) {
    const newLine = document.createElement("p");
    newLine.textContent = storySegments[storyIndex];
    textContainer.appendChild(newLine);
    textContainer.scrollTop = textContainer.scrollHeight;
    storyIndex++;
  } else {
    const endMessage = document.createElement("p");
    endMessage.textContent = "You run into the end of the cave, a stalagtite impales you. You also die from exposure and dysentery but you still feel the sharp pain of cave rock through your body.";
    textContainer.appendChild(endMessage);
    createNewGameContainer();
  }
}

function createNewGameContainer() {
  document.body.innerHTML = '';
  const newGameContainer = document.createElement('div');
  newGameContainer.id = 'ascii-game-container';
  newGameContainer.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: monospace;
    font-size: 18px;
  `;

  const asciiMap = document.createElement('pre');
  asciiMap.id = 'ascii-map';
  asciiMap.style.cssText = `
    margin-bottom: 20px;
    border: 1px solid white;
    padding: 10px;
  `;
  newGameContainer.appendChild(asciiMap);

  const instructions = document.createElement('p');
  instructions.id = 'ascii-instructions';
  instructions.textContent = "Use the arrow keys! Evade the enemy!";
  instructions.style.cssText = "margin-top: 10px;";
  newGameContainer.appendChild(instructions);

  document.body.appendChild(newGameContainer);
  initializeAsciiGame();
}
  function initializeAsciiGame() {
    const asciiMap = document.getElementById("ascii-map");
    let playerPosition = { x: 5, y: 5 };
    let enemyPosition = { x: 8, y: 8 };
    let isGameOver = false;
    const mapWidth = 20;
    const mapHeight = 10;
    let enemySpeed = 30; // enemy speed 100ms delay adj to 30ms + difficulty
    let timeSurvived = 0;
    const winTime = 1000; // evade the enemy for 100 seconds to win
  
    // Render the game map
    function renderMap() {
      let output = '';
      for (let y = 0; y < mapHeight; y++) {
        for (let x = 0; x < mapWidth; x++) {
          if (x === playerPosition.x && y === playerPosition.y) {
            output += "@"; // Player character
          } else if (x === enemyPosition.x && y === enemyPosition.y) {
            output += "Mommy!"; // Enemy character
          } else {
            output += "."; // Empty space
          }
        }
        output += "\n";
      }
      asciiMap.textContent = output;
    }
  
    // Handle player movement based on arrow keys
    function movePlayer(event) {
      if (isGameOver) return;
  
      switch (event.key) {
        case "ArrowUp":
          if (playerPosition.y > 0) playerPosition.y--;
          break;
        case "ArrowDown":
          if (playerPosition.y < mapHeight - 1) playerPosition.y++;
          break;
        case "ArrowLeft":
          if (playerPosition.x > 0) playerPosition.x--;
          break;
        case "ArrowRight":
          if (playerPosition.x < mapWidth - 1) playerPosition.x++;
          break;
      }
      renderMap();
      checkGameOver();
    }
  
    // Enemy movement in a random direction
    function moveEnemy() {
      if (isGameOver) return;
  
      const directions = [
        { x: 0, y: -1 }, // Up
        { x: 0, y: 1 },  // Down
        { x: -1, y: 0 }, // Left
        { x: 1, y: 0 }   // Right
      ];
      const randomDirection = directions[Math.floor(Math.random() * directions.length)];
      const newEnemyPosition = {
        x: enemyPosition.x + randomDirection.x,
        y: enemyPosition.y + randomDirection.y
      };
  
      // Keep the enemy within map boundaries
      if (newEnemyPosition.x >= 0 && newEnemyPosition.x < mapWidth &&
          newEnemyPosition.y >= 0 && newEnemyPosition.y < mapHeight) {
        enemyPosition = newEnemyPosition;
      }
  
      renderMap();
      checkGameOver();
    }
  
    // Check for collisions or if the player survived long enough to win
    function checkGameOver() {
        if (playerPosition.x === enemyPosition.x && playerPosition.y === enemyPosition.y) {
          isGameOver = true;
          showEndScreen("Game Over! You stink at this. The enemy gave you a wedgy. Note, this is the condition of having clothing wedged between the buttocks, usually as a prank.");
        } else if (timeSurvived >= winTime) {
          isGameOver = true;
          showEndScreen("You survived! You win! You are the champion! People will now give you things and cheer for you and also write epic poetry! You will be remembered!");
        }
      }
      
      // Function to create and display the end screen
      function showEndScreen(message) {
        // Create overlay container
        const overlay = document.createElement('div');
        overlay.id = 'end-screen';
        overlay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.9);
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 24px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif, sans-serif; 
          z-index: 1000;
          text-align: center;
          padding: 20px;
          line-height: 1.5;
          max-width: 90%
        `;
      
        // Message for game over or win
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        messageElement.style.marginBottom = '20px';
      
        // Restart button
        const restartButton = document.createElement('button');
        restartButton.textContent = "Play Again";
        restartButton.style.cssText = `
          padding: 10px 20px;
          font-size: 18px;
          background-color: silver;
          color: black;
          border: none;
          cursor: pointer;
        `;
        restartButton.addEventListener('click', () => {
          location.reload(); // Reloads the page to restart the game
        });
      
        // Append message and button to overlay
        overlay.appendChild(messageElement);
        overlay.appendChild(restartButton);
      
        // Append overlay to the body
        document.body.appendChild(overlay);
      }      
    // Update the game timer and enemy speed
    function updateGame() {
      if (isGameOver) return;
  
      timeSurvived++;
      if (timeSurvived % 2 === 0 && enemySpeed > 300) {
        enemySpeed -= 100; // Speed up enemy every 2 seconds
      }
  
      // Move enemy at the current speed and check again
      moveEnemy();
      setTimeout(updateGame, enemySpeed);
    }
  
    // Start listening for key presses to move the player
    window.addEventListener("keydown", movePlayer);
  
    // Start the game loop
    renderMap();
    updateGame();
    }

