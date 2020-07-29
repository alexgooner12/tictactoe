import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { navigateToRoute, getDefaultSubmitingData } from '../helpers';
import { useDispatch } from 'react-redux';
import { ADD_PLAYER } from '../actions/playerActions';
import axios from "axios";


const CreatePlayer = () => {
    const [name, setName] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = async e => {
        e.preventDefault();
        const res = await axios.post('/player', { name, ...getDefaultSubmitingData()});
        if (res.status !== 200) return;
        dispatch({ type: ADD_PLAYER, payload: res.data });
        navigateToRoute(history, '/boards');
    }

    return (
        <div className="create-player">
            <h2>Welcome to the TicTacToe game</h2>
            <h5>Choose your name bellow</h5>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} />
                <button>Submit</button>
            </form>
        </div>
    )
};


export default CreatePlayer;
