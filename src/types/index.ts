import { GameState } from '../reducers/GameRecorderReducer';

export interface IAction {
  type: string;
  payload?: any;
}

export interface IPlayer {
  id: string;
  firstName: string;
  lastName: string;
  jerseyNumber: string;
  teamId: number | string;
  goals: number;
};

export interface IGame {
  id: string;
  date: string;
  home: ITeam | Team;
  away: ITeam | Team;
  homeGoals: Array<IGoal>;
  awayGoals: Array<IGoal>;
  winner?: ITeam | null;
  loser?: ITeam | null;
  draw?: boolean;
}

export interface IGoal {
  team: ITeam;
  player: IPlayer;
  time?: number | string;
  ownGoal: boolean;
  penaltyKick: boolean;
}

export interface ITeam {
  id: string,
  name: string,
  badge?: string,
  matches:Array<IGame>,
};

export class Team implements ITeam {
  id: string;
  name: string;
  matches: IGame[];
  badge:string;
  constructor(data: ITeam) {
    this.id = data.id;
    this.name = data.name;
    this.badge = data.badge || '';
    this.matches = data.matches || [];
  }
  getWins() {
    return this.matches.filter((g: IGame) => {
      return g.winner?.id === this.id;
    });
  }
  getLosses() {
    return this.matches.filter((g: IGame) => {
      return g.loser?.id === this.id;
    });
  }
  getDraws() {
    return this.matches.filter((g: IGame) => {
      return g.draw === true;
    });
  }
  getPoints() {
    const wins = this.getWins().length;
    const draws = this.getDraws().length;
    return wins * 3 + draws;
  }
  getData() {
    return {
      id: this.id,
      name: this.name,
      matches: this.matches,
    };
  }
}

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