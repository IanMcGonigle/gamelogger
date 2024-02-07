export interface IPlayer {
  id?: number | string;
  firstName: string;
  lastName: string;
  jerseyNumber: string;
  teamId: number | string;
  goals: number;
};

export interface IGame {
  id: number,
  home: ITeam;
  away: ITeam;
  homeGoals: Array<IGoal>;
  awayGoals: Array<IGoal>;
}

export interface IGoal {
  team: ITeam;
  player: IPlayer;
  time: number | string;
  ownGoal: boolean;
  penaltyKick: boolean;
}

export interface ITeam {
  id: number|string,
  name: string,
};

export type AddPlayerProps = {
  teams: Array<ITeam>;
  onComplete: Function;
  onCancel: Function;
};

export type GameRecorderProps = {
  teams: Array<ITeam>;
  players: Array<IPlayer>;
};

export type TeamCardProps = {
  us:ITeam,
  them?:ITeam
  players:Array<IPlayer>
};