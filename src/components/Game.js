import React, { useState, useEffect } from 'react';
import Board from './Board';
import { calculateWinner } from '../helpers';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

function Game() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerPresent, setIsPlayerPresent] = useState(true);
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(board);
  const player = useSelector(state => state.player);
  const boardId = useSelector(state => state.boards.activeBoardId);

  let socket = io(`/?id=${player.id}`);

  useEffect(() => {
    socket.on('connect', () => console.log(socket, "connected"));
    socket.on('disconnect', () => console.log('disc'));
  }, []);


  const handleClick = i => {
    const boardCopy = [...board];
    if (winner || boardCopy[i]) return;
    boardCopy[i] = xIsNext ? "X" : "O";
    setBoard(boardCopy);
    setXisNext(!xIsNext);
    // mark(i);
  };

  const leaveRoom = () => {
    const l = socket.emit('leave_room', boardId, (responseCode) => {
      console.log(responseCode);
    });
    console.log(l, "leave")
    setIsPlayerPresent(false);
  }

  const joinRoom = () => {
    const b = socket.emit('join_room', boardId, (responseCode) => {
      console.log(responseCode);
    });
    setIsPlayerPresent(true);
    console.log(b, "join")
  }

  const leaveSeat = () => {
    const leaveSeat = socket.emit('leave_seat', boardId, (responseCode) => {
      console.log(responseCode);
    });
    setIsPlayerPresent(false);
    console.log(leaveSeat, "leaveSeat")
  }

  const mark = tile => {
    const m = socket.emit('mark_tile', boardId, tile, (responseCode) => {
      console.log(responseCode);
    });
    console.log(m, "mark")
  }

  const restart = () => {
    const rest = socket.emit('restart', boardId, (responseCode) => {
      console.log(responseCode);
    });
    console.log(rest, 'restart')

    const r = socket.on('restarted', boardId, (responseCode) => {
      console.log(responseCode);
    });

    console.log(r, 'r')
  }

  return (
    <div className="game">
      <Board squares={board} onClick={handleClick} />
      <div>
        <p>
          {winner ? "Winner: " + winner : "Next Player: " + (xIsNext ? "X" : "O")}
        </p>
        {!isPlayerPresent && <button onClick={joinRoom}>JOIN ROOM</button>}
        <button onClick={leaveRoom}>LEAVE ROOM</button>
        <button onClick={leaveSeat}>LEAVE SEAT</button>
        <button onClick={restart}>Restart</button>
      </div>
    </div>
  );
}

export default Game;
