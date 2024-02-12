import React, { createContext } from 'react';
import { GameState } from '../reducers/GameRecorderReducer';
import { IGame, IPlayer, ITeam } from '../types';

export type State = {
  teams: Array<ITeam>;
  players: Array<IPlayer>;
  games: Array<IGame>;
  gameState?: GameState | undefined;
};

export const StateContext = createContext(null as any);
