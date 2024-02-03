export interface IPlayer {
  firstName: string,
  lastName: string,
  jerseyNumber: string,
  teamId: number,
  goals: number,
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
  time: number;
}

export interface ITeam {
  id: number,
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