# RPS: Graph & Tree Edition

A modern Rock-Paper-Scissors game built to visualize Data Structures. Instead of standard logic, it uses a **Directed Graph** for efficient rule checks and a **Frequency Tree** to create an AI that learns and predicts your patterns.

![Project Preview](https://poisonmunna.github.io/RPS_Graph_Edition/)

## 📝 About the Project

This project demonstrates how Computer Science concepts can be applied to simple games. It features a responsive light UI, smooth animations, and a "smart" opponent.

### How it Works (The Logic)

1.  **Graph Logic (The Rules):**
    * Normally, games use many `if/else` statements (e.g., *if rock and scissors...*).
    * This project uses a **Graph** structure. We simply check if a "connection" exists from Player A to Player B to decide the winner instantly.

2.  **Tree AI (The Brain):**
    * The AI doesn't guess randomly.
    * It uses a **Frequency Tree** to remember your history. If you often play "Paper" after "Rock", the AI remembers this pattern and tries to counter it next time.

## ✨ Features

* **Smart AI:** Learns your move patterns over time.
* **Light UI:** Beautiful dark mode design with glowing effects.
* **High Score:** Saves your best score using LocalStorage.
* **Responsive:** Works on both mobile and desktop.

## 🚀 How to Run

1.  Download the files (`index.html`, `style.css`, `script.js`).
2.  Open `index.html` in any web browser (Chrome, Firefox, Edge).
3.  Start playing!

## 🛠️ Built With

* HTML5
* CSS3 (Animations & Flexbox)
* JavaScript (ES6+)
