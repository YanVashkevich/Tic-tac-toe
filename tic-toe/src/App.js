import './App.css';
import { Board } from './components/Board/Board';
import React, {useState} from 'react';
import { Scoreboard } from './components/ScoreBoard/Scoreboard';

function App() {
  const WIN_CONDITIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

  const [board,setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setXPlaying] = useState(true);
  const [scores,setScores] = useState({xScores: 0, oScores:0})
  const [gameover, setGameover] = useState(false)

  const handleBoxClick = (boxIndex) => {
    const updatedBoard = board.map((value, index) => {
      if(index === boxIndex){
        return xPlaying === true ? 'X':'O';
      } else {
        return value;
      }
    })

    
    const winner = checkWinner(updatedBoard);
    
  if(winner){
    if(winner === 'O'){
      let {oScores} = scores;
      oScores += 1
      setScores({...scores,oScores})
    } else {
      let {xScores} = scores;
      xScores += 1
      setScores({...scores,xScores})
    }
  }


    setBoard(updatedBoard);

    setXPlaying(!xPlaying);
  }

  const checkWinner = (board) => {
    for(let i = 0; i < WIN_CONDITIONS.length; i++){
      const [x, y, z] = WIN_CONDITIONS[i]

      if(board[x] && board[x] === board[y] && board[y] === board[z]){
        setGameover(true)
        return board[x];
      }
    }
  }
  
  const resetBoard = () => {
      setGameover(false)
      setBoard(Array(9).fill(null))
  }

  if(gameover === true){
    resetBoard()
  }



  return (
    <div className="App">
      <Scoreboard scores = {scores} xPlaying ={xPlaying}/>
      <Board board = {board} onClick ={handleBoxClick} />
    </div>
  );
}

export default App;
