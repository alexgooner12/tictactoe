import { SELECT_BOARD } from '../actions/boardActions';
import { SET_BOARDS, SET_ACTIVE_BOARD } from '../actions/boardActions';

const initialState = {
    activeBoardId: null, boards: []
}

export function boardReducer(state = initialState, action) {
    switch (action.type) {
        case SET_BOARDS:
            return Object.assign({}, { ...state, boards: action.payload });
        case SET_ACTIVE_BOARD:
            return Object.assign({}, { ...state, activeBoardId: action.payload });
        default:
            return state;
    }
}