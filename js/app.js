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
    displayResult(`It's ${computerChoice}! You win!`);
    handleWin();
  } else {
    displayResult(`It's ${computerChoice}. You lose.`);
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
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
  }
  .earthquake {
    animation: shake 0.5s infinite;
  }
`;
document.head.appendChild(style);


function startCaveGame() {
  document.body.innerHTML = ''; // Clear existing content
  const caveContainer = createCaveContainer();
  document.body.appendChild(caveContainer);
}//cave container contains the new game
//next game will probably work best to transition into another game container - nesting

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
  button.textContent = "Continue";
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
  "You awake.", "You are face up.", "You are half submerged in quarters.", "It must've been that dangol' flippage game.", "I knew there was a catch. I knew there was nothing free in life", "puts several quarters into pockets",
  "The darkness is very dark (darker than you remember)", "You call for mommy.", ". . .", "She does not answer.",
  "A faint glimmer of light appears up ahead.",
  "You hear strange noises echoing through the cavern walls.",
  "The path splits ahead; one way seems to lead downwards, the other upwards.",
  "You decide to go deeper into the cave...",
  "There is a probably ugly (because of the dark) witch who howls at you.",
  ". . .",
  "Mommy?",
  "It is not your mother.",
  "You are flummoxed.", "You cry.", "You lament your existence."
];

function startTextStream() {
  // Initialize text container if it doesn't exist yet
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

  // Display the next story segment
  if (storyIndex < storySegments.length) {
    const newLine = document.createElement("p");
    newLine.textContent = storySegments[storyIndex];
    textContainer.appendChild(newLine);
    textContainer.scrollTop = textContainer.scrollHeight; // Scroll to the bottom
    storyIndex++;
  } else {
    // Story is over, you can add more logic or options here if needed
    const endMessage = document.createElement("p");
    endMessage.textContent = "You run into the end of the cave, a stalagtite impales you. You also die from exposure and dystentary but you still feel the sharp pain of cave rock through your body.";
    textContainer.appendChild(endMessage);

    createNewGameContainer(); // Trigger the new game container
  
    }
}

function createNewGameContainer() {

    document.body.innerHTML = '';

    // Create a new container for the next game
    const newGameContainer = document.createElement('div');
    newGameContainer.id = 'new-game';
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
      font-size: 24px;
    `;  
    
    const message = document.createElement('div');
    message.textContent = "Welcome to Beyond the Cave Adventure!";
    newGameContainer.appendChild(message);
    
    const button = document.createElement('button');
  button.textContent = "Start";
  button.style.cssText = `
    margin-top: 20px;
    padding: 15px 30px;
    background-color: silver;
    color: white;
    cursor: pointer;
    font-size: 24px;
  `;
  button.addEventListener("click", () => {
    // Logic to start the new game
    alert("What are you doing here? You are supposed to be!");
  });
  newGameContainer.appendChild(button);

  document.body.appendChild(newGameContainer);
}

