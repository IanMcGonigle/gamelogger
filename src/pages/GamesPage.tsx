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
      {!currentGame && games.length > 0 && (
        <>
          <button
            onClick={() => {
              window.location.href = '/add-game';
            }}
          >
            Add New Game
          </button>
          <table>
            <thead>
              <tr>
                <td>Date</td>
                <td>Home</td>
                <td>Away</td>
                <td>&nbsp;</td>
              </tr>
            </thead>
            <tbody>
              {games.map((g: DocumentData) => {
                const { date, home, away, homeGoals, awayGoals } = g.data();
                return (
                  <tr key={g.id}>
                    <td>{date}</td>
                    <td>{`${home?.name}: ${homeGoals?.length}`}</td>
                    <td>{`${away?.name}: ${awayGoals?.length}`}</td>
                    <td>
                      <Link to={`edit/${g.id}`}>Edit</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
