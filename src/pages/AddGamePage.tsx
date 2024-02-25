import React, { useContext, useState, useEffect } from 'react';
import { StateContext } from '../context/StateContext';
import {
  doc,
  getDocs,
  DocumentData,
} from 'firebase/firestore';
import {
  colletionGames,
} from '../database/firebase';
import GameRecorder from '../components/GameRecorder';

export default function AddGamePage() {
  const [currentGame, setCurrentGame] = useState<DocumentData | undefined>();
  const { teams, players, gameState } = useContext(StateContext);

  useEffect( () => {
    const docRef = doc(colletionGames);
    setCurrentGame(docRef);
  }, [])
  return (
    <div className='AddGamePage page'>
      {currentGame && (
        <GameRecorder
          teams={teams}
          players={players}
          gameData={gameState}
          id={currentGame.id}
        />
      )}
    </div>
  );
}
