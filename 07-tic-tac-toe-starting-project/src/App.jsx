import Player from "./Components/Player";
import GameBoard from "./Components/GameBoard";
import { useState } from "react";
import Log from "./Components/Log";
import { WINNING_COMBINATIONS } from "./assets/winning-combinations";
import GameOver from "./gameOver";

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

      if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
      }
  return currentPlayer
}

const initialGameBoard = [
  [null , null, null],
  [null , null, null],
  [null , null, null],
];

function App() {

  let gameBoard = [...initialGameBoard].map(array => [...array]);

  // const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  
  for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;

      gameBoard[row][col] = player;
  }
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

   
      if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && secondSquareSymbol === thirdSquareSymbol) {
        winner = firstSquareSymbol;
      }

  }
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {

    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns)
      const updatedTurns = [{square: {row: rowIndex, col:colIndex}, player:currentPlayer}, ...prevTurns];
    
      return updatedTurns;
    });
  }
  function handleRestart() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="player 1" symbol="X" isActive={activePlayer === 'X'}/>
          <Player initialName="player 2" symbol="O" isActive={activePlayer === 'O'}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner = {winner} onRestart={handleRestart}></GameOver>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard } />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App
