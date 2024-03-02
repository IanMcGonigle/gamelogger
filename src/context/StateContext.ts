import React, { createContext } from 'react';
import { GameState } from '../reducers/GameRecorderReducer';
import { Match, Player, Team, Goal } from '../types';

export type State = {
  teams: Array<Team>;
  players: Array<Player>;
  games: Array<Match>;
  goals: Array<Goal>;
  gameState?: GameState | undefined;
};

export const StateContext = createContext(null as any);
