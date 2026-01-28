// 1. DATA STRUCTURE: GRAPH (Adjacency List)
// Defines who beats whom. Scalable (easy to add Lizard/Spock later).
const gameGraph = {
    rock: { beats: ['scissors'], icon: '🪨' },
    paper: { beats: ['rock'], icon: '📄' },
    scissors: { beats: ['paper'], icon: '✂️' }
};

// 2. DATA STRUCTURE: SIMPLE TREE (Pattern Matching)
// Tracks user history. If user played Rock, what did they play next?
// Structure: { rock: { rock: 0, paper: 0, scissors: 0 }, ... }
const aiMemory = {
    rock: { rock: 0, paper: 0, scissors: 0 },
    paper: { rock: 0, paper: 0, scissors: 0 },
    scissors: { rock: 0, paper: 0, scissors: 0 }
};

// Game State
let scores = { user: 0, ai: 0 };
let lastUserMove = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadHighScore();
    setupListeners();
});

function setupListeners() {
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const userChoice = btn.getAttribute('data-choice');
            playRound(userChoice);
        });
    });
}

function playRound(userChoice) {
    const userHand = document.getElementById('user-hand');
    const aiHand = document.getElementById('ai-hand');
    
    // Animation Effect
    userHand.classList.add('shaking');
    aiHand.classList.add('shaking');
    document.getElementById('result-text').innerText = "Fighting...";

    setTimeout(() => {
        userHand.classList.remove('shaking');
        aiHand.classList.remove('shaking');

        // 3. ALGORITHM: AI DECISION (Based on Tree/History)
        const aiChoice = predictMove();

        // Update UI Icons
        userHand.innerText = gameGraph[userChoice].icon;
        aiHand.innerText = gameGraph[aiChoice].icon;

        // 4. LOGIC: DETERMINE WINNER (Graph Traversal)
        const winner = getWinner(userChoice, aiChoice);
        updateScore(winner);
        
        // Train AI (Update Tree)
        if (lastUserMove) {
            aiMemory[lastUserMove][userChoice]++;
        }
        lastUserMove = userChoice;

    }, 500); // Wait 500ms for animation
}

function getWinner(p1, p2) {
    if (p1 === p2) return 'draw';
    // Check Graph: Does P1's "beats" list include P2?
    if (gameGraph[p1].beats.includes(p2)) return 'user';
    return 'ai';
}

function predictMove() {
    // If no history, random move
    if (!lastUserMove) return randomMove();

    // Look at the "Tree" node for the last move
    const history = aiMemory[lastUserMove];
    
    // Find which move the user plays most often after the previous move
    let likelyMove = null;
    let maxCount = -1;

    for (const [move, count] of Object.entries(history)) {
        if (count > maxCount) {
            maxCount = count;
            likelyMove = move;
        }
    }

    // AI counters the likely move
    // If user is likely to play 'Rock', AI should play 'Paper'
    // We find what beats the likelyMove by searching the Graph
    for (const [key, data] of Object.entries(gameGraph)) {
        if (data.beats.includes(likelyMove)) return key;
    }
    
    return randomMove(); // Fallback
}

function randomMove() {
    const moves = Object.keys(gameGraph);
    return moves[Math.floor(Math.random() * moves.length)];
}

function updateScore(winner) {
    const resText = document.getElementById('result-text');
    const subText = document.getElementById('sub-text');

    if (winner === 'user') {
        scores.user++;
        resText.innerText = "YOU WIN!";
        resText.style.color = "#2ed573";
        subText.innerText = "Good Strategy!";
    } else if (winner === 'ai') {
        scores.ai++;
        resText.innerText = "AI WINS!";
        resText.style.color = "#ff4757";
        subText.innerText = "It predicted that...";
    } else {
        resText.innerText = "DRAW!";
        resText.style.color = "#ffffff";
        subText.innerText = "Great minds think alike.";
    }

    // UI Updates
    document.getElementById('user-score').innerText = scores.user;
    document.getElementById('ai-score').innerText = scores.ai;
    checkHighScore();
}

// 5. STORAGE: LOCAL STORAGE
function checkHighScore() {
    let currentHigh = parseInt(localStorage.getItem('rpsHighScore')) || 0;
    if (scores.user > currentHigh) {
        localStorage.setItem('rpsHighScore', scores.user);
        document.getElementById('high-score').innerText = scores.user;
    }
}

function loadHighScore() {
    const savedScore = localStorage.getItem('rpsHighScore') || 0;
    document.getElementById('high-score').innerText = savedScore;
}

function resetScores() {
    localStorage.removeItem('rpsHighScore');
    scores.user = 0;
    scores.ai = 0;
    lastUserMove = null; // Reset AI memory
    updateUI();
    document.getElementById('high-score').innerText = 0;
    document.getElementById('user-score').innerText = 0;
    document.getElementById('ai-score').innerText = 0;
}