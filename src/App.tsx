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
  db
} from './database/firebase';
import {
  doc,
  getDocs,
  onSnapshot,
  collection,
  query,
  DocumentData,
} from 'firebase/firestore';
import MainNavigation from './components/MainNavigation';
import GamesPage from './pages/GamesPage';
import PlayersPage from './pages/PlayersPage';
import AddPlayerPage from './pages/AddPlayerPage';
import HomePage from './pages/HomePage';
import AddGamePage from './pages/AddGamePage';
import EditGamePage from './pages/EditGamePage';


function App() {

  const [players, setPlayers] = useState<IPlayer[] | []>([]);
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
    const q = query(collection(db,'players'));
    onSnapshot(q, (querySnapshot) => {
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
    });

  }
  const loadGames = async () => {
    // const querySnapshot = await getDocs(colletionGames);
    // setGames(querySnapshot.docs);
    const q = query(collection(db, 'games'));
    onSnapshot(q, (querySnapshot) => {
      setGames(querySnapshot.docs);
    });
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
            <Route path='games/edit/:gameId' element={<EditGamePage />}></Route>
            <Route path='/' element={<HomePage />}></Route>
          </Routes>
        </div>
      </div>
    </StateContext.Provider>
  );
}

export default App;
