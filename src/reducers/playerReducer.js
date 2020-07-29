import { ADD_PLAYER } from '../actions/playerActions';

export function playerReducer(state = {}, action) {
    switch (action.type) {
        case ADD_PLAYER:
            return action.payload;
        default:
            return state;
    }
}