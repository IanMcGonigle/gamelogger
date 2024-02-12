import { ITeam, IGoal, IAction } from '../types';

export type GameState = {
  home: ITeam | undefined;
  away: ITeam | undefined;
  homeGoals: Array<IGoal>;
  awayGoals: Array<IGoal>;
  date: string;
};

export const InitialGameState: GameState = {
  home: undefined,
  away: undefined,
  homeGoals: [],
  awayGoals: [],
  date: '',
};

export enum GameRecorderActions {
  setHomeTeam = 'setHomeTeam',
  setAwayTeam = 'setAwayTeam',
  setMatchDate = 'setMatchDate',
  setHomeGoals = 'setHomeGoals',
  setAwayGoals = 'setAwayGoals',
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
    case GameRecorderActions.setHomeGoals:
      return { ...state, homeGoals: [...state.homeGoals, payload] };
    case GameRecorderActions.setAwayGoals:
      return { ...state, awayGoals: [...state.awayGoals, payload] };
    case GameRecorderActions.updateGame:
      return { ...state, ...payload };
    default:
      return state;
  }
}
