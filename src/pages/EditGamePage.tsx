import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { StateContext, State } from '../context/StateContext';
import { doc, QueryDocumentSnapshot } from 'firebase/firestore';
import {
  db,
  colletionGames,
} from '../database/firebase';
import { IMatch, Match, Player, Goal } from '../types';
import GameRecorder from '../components/GameRecorder';
import { GameState } from '../reducers/GameRecorderReducer';

export default function EditGamePage() {
  const { gameId } = useParams();
  const [currentGame, setCurrentGame] = useState<Match | undefined>();
  const { games, teams, players, goals } = useContext(StateContext) as State;

  useEffect(() => {
    const match = games.find((g:Match) => {
      return g.id === gameId;
    });
    setCurrentGame(match);
  }, [games, gameId]);
  return (
    <div className='AddGamePage page'>
      {currentGame && (
        <GameRecorder
          id={currentGame.id}
          teams={teams}
          players={players}
          gameData={currentGame.getData() as GameState}
          goals={goals.filter((g: Goal) => g.matchId === currentGame.id)}
        />
      )}
    </div>
  );
}
