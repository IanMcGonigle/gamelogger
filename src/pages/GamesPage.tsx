import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
  getDocs,
  doc,
  DocumentData,
} from 'firebase/firestore';
import {
  db,
  colletionTeams,
  colletionPlayers,
  colletionGames,
} from '../database/firebase';
import GameRecorder from '../components/GameRecorder'
import { StateContext } from '../context/StateContext';
import { IGame, ITeam, IGoal } from '../types';

export default function GamesPage() {
  const [currentGame, setCurrentGame] = useState<DocumentData | undefined>();
  const { games, teams, players, gameState } = useContext(StateContext);
  return (
    <div className='GamesPage'>
      <h1>Games</h1>
      {currentGame && (
        <GameRecorder
          teams={teams}
          players={players}
          gameData={gameState}
          id={currentGame.id}
        />
      )}
      {!currentGame && games.length > 0 && (
        <>
          <button
            onClick={() => {
              const docRef = doc(colletionGames);
              console.log(docRef);
              setCurrentGame(docRef);
            }}
          >
            Add New Game
          </button>
          <table>
            <tr>
              <td>Date</td>
              <td>Home</td>
              <td>Away</td>
              <td>&nbsp;</td>
            </tr>
            {games.map((g: DocumentData) => {
              console.log(g.data());
              const { date, home, away, homeGoals, awayGoals } = g.data();
              return (
                <tr>
                  <td>{date}</td>
                  <td>{`${home?.name}: ${homeGoals?.length}`}</td>
                  <td>{`${away?.name}: ${awayGoals?.length}`}</td>
                  <td><Link to={`edit/${g.id}`}>Edit</Link></td>
                </tr>
              );
            })}
          </table>
        </>
      )}
    </div>
  );
}
