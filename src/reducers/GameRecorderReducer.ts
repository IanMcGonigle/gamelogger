import { ITeam, IGoal, IAction } from '../types';

export type GameState = {
  home: ITeam | undefined;
  away: ITeam | undefined;
  homeGoals: Array<IGoal>;
  awayGoals: Array<IGoal>;
  date: string;
  winner?: ITeam | null;
  loser?: ITeam | null;
  draw?: boolean;
};

export const InitialGameState: GameState = {
  home: undefined,
  away: undefined,
  homeGoals: [],
  awayGoals: [],
  date: '',
  draw: true
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
  let winner, loser, isDraw,  arr;
  switch (type) {
    case GameRecorderActions.setHomeTeam:
      return { ...state, home: payload };
    case GameRecorderActions.setAwayTeam:
      return { ...state, away: payload };
    case GameRecorderActions.setMatchDate:
      return { ...state, date: payload };
    case GameRecorderActions.setHomeGoals:
      const newHomeGoals = [...state.homeGoals, payload];
      arr = [{team:state.home, goals: newHomeGoals.length},{team:state.away, goals: state.awayGoals.length}]
      arr.sort( (t1, t2) => t2.goals - t1.goals);
      isDraw = newHomeGoals.length === state.awayGoals.length;
      winner = isDraw ? null : arr[0].team;
      loser = isDraw ? null : arr[1].team;
      return { ...state, draw: isDraw, homeGoals: newHomeGoals, winner, loser };
    case GameRecorderActions.setAwayGoals:
      const newAwayGoals = [...state.awayGoals, payload];
      arr = [{ team: state.home, goals: state.homeGoals.length },{ team: state.away, goals: newAwayGoals.length }];
      arr.sort((t1, t2) => t2.goals - t1.goals);
      isDraw = newAwayGoals.length === state.homeGoals.length;
      winner = isDraw ? null : arr[0].team;
      loser = isDraw ? null : arr[1].team;
      return { ...state, awayGoals: newAwayGoals, draw: isDraw, winner, loser };
    case GameRecorderActions.updateGame:
      return { ...state, ...payload };
    default:
      return state;
  }
}
