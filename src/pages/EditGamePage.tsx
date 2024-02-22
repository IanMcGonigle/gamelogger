import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { StateContext } from '../context/StateContext';
import { doc, QueryDocumentSnapshot } from 'firebase/firestore';
import {
  db,
  colletionGames,
} from '../database/firebase';
import { IGame } from '../types';
import GameRecorder from '../components/GameRecorder';
import { GameState } from '../reducers/GameRecorderReducer';

export default function EditGamePage() {
  const { gameId } = useParams();
  const [currentGame, setCurrentGame] = useState<QueryDocumentSnapshot | undefined>();
  const { games, teams, players } = useContext(StateContext);

  useEffect(() => {
    const gameData = games.find((g: IGame) => {
      return g.id === gameId;
    });
    setCurrentGame(gameData);
  }, [games, gameId]);
  return (
    <div className='AddGamePage page'>
      {currentGame && (
        <GameRecorder
          teams={teams}
          players={players}
          gameData={currentGame.data() as GameState}
          id={currentGame.id}
        />
      )}
    </div>
  );
}
