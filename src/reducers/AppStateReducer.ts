import { DocumentData } from 'firebase/firestore';
import { State } from '../context/StateContext';
import { InitialGameState } from './GameRecorderReducer';
import {
  IAction,
  IMatch,
  Match,
  IPlayer, Player,
  Team,
  ITeam,
  Goal,
  IGoal,
} from '../types';

export const initialAppState = {
  teams: [],
  players: [],
  games: [],
  goals: [],
  gameState: InitialGameState,
};

export function AppStateReducer(state: State = initialAppState, action: IAction) {
  const { type, payload } = action;
  switch (type) {
    case 'teams':
      const newTeams: Team[] = payload
        .filter((item: DocumentData) => Boolean(item.data()?.name))
        .map((item: DocumentData) => {
          const data = item.data() as ITeam;
          const newTeam = new Team({ ...data, id: item.id }, state.games);
          return newTeam;
        });
      return { ...state, teams: newTeams };
    case 'players':
      const newPlayers: Player[] = payload.map((item:DocumentData) => {
        const data = { ...item.data(), id: item.id } as IPlayer;
        return new Player(data, state.goals);
      });
      return { ...state, players: newPlayers };
    case 'games':
      const newGames: Match[] = payload.map((item:DocumentData) => {
        const data: IMatch = item.data() as IMatch;
        return new Match({ ...data, id: item.id }, state.goals);
      });
      const newTeamsGame = state.teams.map((t:Team) => {
          const data = t.getData();
          const newTeam = new Team({ ...data, id: t.id }, newGames);
          return newTeam;
        });
      return { ...state, games: newGames, teams: newTeamsGame };
    case 'goals':
      const newGoals: Goal[] = payload.map((item: DocumentData) => {
        const data = item.data() as IGoal;
        return new Goal({ ...data, id: item.id });
      });
      const newGamesGoals: Match[] = state.games.map( (g:Match) => {
        const newImatch = { ...g?.getData(), id: g.id } as IMatch;
        return new Match(newImatch, newGoals);
      });
      const newPlayersGoals: Player[] = state.players.map((p:Player) => {
        const data = { ...p.getData(), id: p.id } as IPlayer;
        return new Player(data, newGoals);
      });
      return {
        ...state,
        goals: newGoals,
        games: newGamesGoals,
        players: newPlayersGoals,
      };
    case 'gameState':
      return { ...state, gameState: payload };
  }
}
