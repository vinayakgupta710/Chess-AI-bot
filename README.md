# Browser‑Chess — TypeScript Chess Engine & UI

**Browser‑Chess** is a fully‑client‑side chess engine written in **TypeScript** with a modern React front‑end.  
The goal was to create a chess bot version of my play style so that I can play against myself, helping me understand how my opponents think when they play against me. Instead of predicting the best move, I want the engine to predict my moves.

| Features |
|---------|
| 2‑D board & drag‑and‑drop UI |
| Legal move generation (perft‑tested) |
| Alpha‑beta search with iterative deepening |
| Simple evaluation (material + piece‑square tables) |
| WebWorker for background AI |

---

## Quick Start

```bash
# 1. Clone
git clone https://github.com/vinayakgupta710/Chess-AI-bot
cd chess-app

# 2. Install
npm install    

# 3. Dev server
npm run dev   

# 4. Tests
npm run test 
