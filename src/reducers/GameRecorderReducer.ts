import { ITeam, IGoal, IAction, Team } from '../types';

export type GameState = {
  home: string;
  away: string;
  date: string;
  goals: string[]
};

export const InitialGameState: GameState = {
  home:'',
  away: '',
  date: '',
  goals:[]
};

export enum GameRecorderActions {
  setHomeTeam = 'setHomeTeam',
  setAwayTeam = 'setAwayTeam',
  setMatchDate = 'setMatchDate',
  setHomeGoals = 'setHomeGoals',
  setAwayGoals = 'setAwayGoals',
  updateGoals = 'updateGoals',
  updateGame = 'updateGame',
}

export function GameRecorderReducer(
  state: GameState = InitialGameState,
  action: IAction
): GameState {
  const { type, payload } = action;
  switch (type) {
    case GameRecorderActions.setHomeTeam:
      return { ...state, home: payload };
    case GameRecorderActions.setAwayTeam:
      return { ...state, away: payload };
    case GameRecorderActions.setMatchDate:
      return { ...state, date: payload };
    case GameRecorderActions.updateGoals:
      const newGoals = [...state.goals, payload];
      return { ...state, goals: newGoals };
    case GameRecorderActions.updateGame:
      return { ...state, ...payload };
    default:
      return state;
  }
}
