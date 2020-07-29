import { combineReducers } from 'redux';
import { playerReducer } from './playerReducer'
import { boardReducer } from './boardReducer'

export const rootReducer = combineReducers({
  player: playerReducer,
  boards: boardReducer
})
