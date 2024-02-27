export interface IAction {
  type: string;
  payload?: any;
}

export interface IPlayer {
  id?: string;
  firstName: string;
  lastName: string;
  jerseyNumber: string;
  teamId: string;
}

export class Player {
  id: string;
  firstName: string;
  lastName: string;
  jerseyNumber: string;
  teamId: string;
  goals: Goal[];

  constructor(data: IPlayer, goalData:Goal[] = []) {
    this.id = data.id || '';
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.jerseyNumber = data.jerseyNumber;
    this.teamId = data.teamId;
    this.goals = goalData.filter( (g:Goal) => {
     return g.playerId === this.id
    });
  }
  get fullName(): string {
    return `${this.jerseyNumber} ${this.firstName} ${this.lastName}`;
  }

  get goalsScored() {
    return this.goals.filter((g: Goal) => {
      return !g.ownGoal;
    });
  }

  get goalsScoredCount() {
    return this.goalsScored.length;
  }

  getData() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      jerseyNumber: this.jerseyNumber,
      teamId: this.teamId,
      goals: this.goals.map((g: Goal) => g.id),
    };
  }
}

export interface IMatch {
  id?: string;
  date: string;
  home: string;
  away: string;
  goals: string[];
}

export class Match {
  id: string;
  date: string;
  homeId: string;
  awayId: string;
  goals?: Goal[] = [];
  homeGoals: Goal[] =[];
  awayGoals: Goal[] =[];

  constructor(matchData: IMatch, goalData: Goal[] = []) {
    this.id = matchData.id || '';
    this.date = matchData.date;
    this.homeId = matchData.home;
    this.awayId = matchData.away;
    this.goals = matchData?.goals?.reduce((result: Goal[], id: string) => {
      const currentGoal = goalData.find((g: Goal) => {
        return g.id === id;
      });
      return currentGoal ? [...result, currentGoal] : result;
    }, []);

    this.homeGoals = this.goals?.filter((g: Goal) => {
      return g.for === this.homeId;
    });

    this.awayGoals = this.goals?.filter((g: Goal) => {
      return g.for === this.awayId;
    });
  }

  get draw() {
    const forHome = this.homeGoals?.length || 0;
    const forAway = this.awayGoals?.length || 0;
    return forHome === forAway;
  }

  get winner() {
    const forHome = this.homeGoals?.length || 0;
    const forAway = this.awayGoals?.length || 0;
    if (this.draw) {
      return null;
    }
    return forAway > forHome ? this.awayId : this.homeId;
  }

  get loser() {
    const forHome = this.homeGoals?.length || 0;
    const forAway = this.awayGoals?.length || 0;
    if (this.draw) {
      return null;
    }
    return forAway > forHome ? this.awayId : this.homeId;
  }

  getData() {
    return {
      date: this.date,
      home: this.homeId,
      away: this.awayId,
      goals: this.goals?.map((g: Goal) => g.id),
    };
  }
}
export interface IGoal {
  id?: string;
  date: string;
  for: string;
  against: string;
  playerId: string;
  matchId: string;
  time?: string;
  ownGoal: boolean;
  penaltyKick: boolean;
}
export class Goal {
  id: string;
  matchId: string;
  date: string;
  for: string;
  against: string;
  playerId: string;
  time?: string;
  ownGoal: boolean;
  penaltyKick: boolean;

  constructor(data: IGoal) {
    this.id = data?.id || '';
    this.matchId = data?.matchId || '';
    this.date = data.date;
    this.for = data.for;
    this.against = data.against;
    this.playerId = data.playerId;
    this.time = data.time;
    this.ownGoal = data.ownGoal;
    this.penaltyKick = data.penaltyKick;
  }

  getData() {
    return {
      date: this.date,
      for: this.for,
      against: this.against,
      playerId: this.playerId,
      time: this.time,
      ownGoal: this.ownGoal,
      penaltyKick: this.penaltyKick,
    };
  }
}
export interface ITeam {
  id: string;
  name: string;
  badge?: string;
  // matches: string[];
}
export class Team {
  id: string;
  name: string;
  matches: Match[];
  badge: string;

  constructor(data: ITeam, gameData: Match[] = []) {
    this.id = data.id;
    this.name = data.name;
    this.badge = data.badge || '';
    this.matches = gameData.filter((game: Match) => {
        return game.homeId === this.id || game.awayId === this.id;
      });
  }
  getWins() {
    return this.matches.filter((g: Match) => {
      return g.winner === this.id;
    });
  }
  getLosses() {
    return this.matches.filter((g: Match) => {
      return g.loser === this.id;
    });
  }
  getDraws() {
    return this.matches.filter((g: Match) => {
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
      badge: this.badge,
      matches: this.matches.map( (m:Match) => m.id),
    };
  }
}
