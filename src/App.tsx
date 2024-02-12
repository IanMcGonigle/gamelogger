import React, { useState, useEffect} from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import GameRecorder from './components/GameRecorder';
import { IPlayer, ITeam } from './types';
import { InitialGameState } from './reducers/GameRecorderReducer';
import './App.css';
import dummy from './dummyPlayers';
import { StateContext } from './context/StateContext';
import {
  colletionTeams,
  colletionPlayers,
  colletionGames,
} from './database/firebase';
import {
  getDocs,
  DocumentData,
} from 'firebase/firestore';
import MainNavigation from './components/MainNavigation';
import GamesPage from './pages/GamesPage';
import PlayersPage from './pages/PlayersPage';
import AddPlayerPage from './pages/AddPlayerPage';
import HomePage from './pages/HomePage';
import AddGamePage from './pages/AddGamePage';


function App() {

  const [players, setPlayers] = useState<IPlayer[] | []>(dummy);
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [games, setGames] = useState<DocumentData[]>([])
  const [currentGame, setCurrentGame] = useState<DocumentData | undefined>();

  const loadTeams = async () => {
      const querySnapshot = await getDocs(colletionTeams);
      const newTeams: Array<ITeam> = querySnapshot.docs.map((item) => {
        return { id: item.id, name: item.data().name } as ITeam;
      });
      setTeams(newTeams);
  }
  const loadPlayers = async () => {
      const querySnapshot = await getDocs(colletionPlayers);
      const newPlayers: Array<IPlayer> = querySnapshot.docs.map((item) => {
        const { firstName, lastName, jerseyNumber, teamId, goals } = item.data();
        return {
          id: item.id,
          firstName,
          lastName,
          jerseyNumber,
          teamId,
          goals,
        };
      });
      setPlayers(newPlayers);
  }
  const loadGames = async () => {
    const querySnapshot = await getDocs(colletionGames);
    console.log('games')
    console.log(querySnapshot.docs);
    setGames(querySnapshot.docs);
  }

  useEffect(() => {
    loadTeams();
    loadPlayers();
    loadGames();
    // initialzeLFC();
    // initializeTeams();
  }, []);

  const getGameData = () => {
    if(currentGame && Object.hasOwn(currentGame, 'data')){
      return currentGame.data();
    } else {

      return InitialGameState;
    }
  }

  return (
    <StateContext.Provider
      value={{ games, teams, players, gameState: getGameData() }}
    >
      <div className='App'>
        <div className='App-header'>
          <MainNavigation />
          <Routes>
            <Route path='games' element={<GamesPage />}></Route>
            <Route path='players' element={<PlayersPage />}></Route>
            <Route path='add-player' element={<AddPlayerPage />}></Route>
            <Route path='add-game' element={<AddGamePage />}></Route>
            <Route path='/' element={<HomePage />}></Route>
          </Routes>
          {/* {games
            .filter((g: DocumentData) => {
              return g.id === '4eqTwl4a1vRcKqNgcfzd';
            })
            .map((g: DocumentData) => {
              return <h2>{g.data().date}</h2>;
            })}
          {currentGame && (
            <GameRecorder
              teams={teams}
              players={players}
              gameData={getGameData()}
              id={currentGame.id}
            />
          )}
          {!currentGame && (
            <button
              onClick={() => {
                const docRef = doc(colletionGames);
                console.log(docRef);
                setCurrentGame(docRef);
              }}
            >
              Add New Game
            </button>
          )} */}
        </div>
      </div>
    </StateContext.Provider>
  );
}

export default App;
