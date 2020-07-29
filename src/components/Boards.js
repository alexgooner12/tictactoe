import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { navigateToRoute, getDefaultSubmitingData } from '../helpers';
import { SET_ACTIVE_BOARD, SET_BOARDS } from '../actions/boardActions';
import axios from "axios";

const Boards = () => {
    const [boards, setBoards] = useState([]);
    const [newBoardId, setNewBoardId] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchBoards() {
            const res = await axios.post('/boards', getDefaultSubmitingData());
            setBoards(res.data);
            dispatch({ type: SET_BOARDS, payload: boards });
        }
        fetchBoards();
    }, [newBoardId]);

    const createBoard = async () => {
        const board = await axios.post('/create_board', getDefaultSubmitingData());
        setNewBoardId(board.data.id);
        dispatch({ type: SET_ACTIVE_BOARD, payload: board.data.id });
        navigateToRoute(history, '/game');
    }

    return (
        <div className="boards">
            <h2>Welcome to the player's boards</h2>
            <div className="pb-2 text-center">
                <h5>Create a new board</h5>
                <button onClick={createBoard}>Create</button>
            </div>

            <ul>{boards && boards.length && boards.map(board =>
                <li key={board.id}>
                    <span>{board.players && board.players}</span>
                </li>
            )
            }</ul>
        </div>
    )
};


export default Boards;
