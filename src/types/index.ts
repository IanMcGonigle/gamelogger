import { DocumentData } from 'firebase/firestore';
import { GameState } from '../reducers/GameRecorderReducer';

export interface IAction {
  type: string;
  payload?: any;
}

export interface IPlayer {
  id?: number | string;
  firstName: string;
  lastName: string;
  jerseyNumber: string;
  teamId: number | string;
  goals: number;
};

export interface IGame {
  id: number;
  date: string;
  home: ITeam;
  away: ITeam;
  homeGoals: Array<IGoal>;
  awayGoals: Array<IGoal>;
}

export interface IGoal {
  team: ITeam;
  player: IPlayer;
  time?: number | string;
  ownGoal: boolean;
  penaltyKick: boolean;
}

export interface ITeam {
  id: number|string,
  name: string,
  wins?:number,
  losses?:number,
  draws?:number,
};

export type AddPlayerProps = {
  teams: Array<ITeam>;
  onComplete: Function;
  onCancel: Function;
};

export type GameRecorderProps = {
  gameData: GameState;
  teams: Array<ITeam>;
  players: Array<IPlayer>;
  id: string;
};

export type TeamCardProps = {
  us:ITeam,
  them?:ITeam,
  onGoal: Function,
  players:Array<IPlayer>
};