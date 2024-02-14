import React, { useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import { IPlayer, ITeam, Team } from './types';
import { InitialGameState } from './reducers/GameRecorderReducer';
import './App.css';
import { StateContext } from './context/StateContext';
import { colletionTeams, db } from './database/firebase';
import {
  getDocs,
  onSnapshot,
  collection,
  query,
  DocumentData,
} from 'firebase/firestore';
import MainNavigation from './components/MainNavigation';
import GamesPage from './pages/GamesPage';
import TeamsPage from './pages/TeamsPage';
import PlayersPage from './pages/PlayersPage';
import AddPlayerPage from './pages/AddPlayerPage';
import HomePage from './pages/HomePage';
import AddGamePage from './pages/AddGamePage';
import EditGamePage from './pages/EditGamePage';


function App() {

  const [players, setPlayers] = useState<IPlayer[] | []>([]);
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [games, setGames] = useState<DocumentData[]>([])

  const loadTeams = async () => {
      // const querySnapshot = await getDocs(colletionTeams);
      // const newTeams: Array<ITeam> = querySnapshot.docs.map((item) => {
      //   return { id: item.id, name: item.data().name } as ITeam;
      // });

      const q = query(collection(db, 'teams'));
      onSnapshot(q, (querySnapshot) => {
        const newTeams: Array<ITeam> = querySnapshot.docs.map((item) => {
          const { name, matches = [] } = item.data() as ITeam
          return new Team({id:item.id, name, matches});
          // return { id: item.id, name: item.data().name } as ITeam;
        });
        setTeams(newTeams);
      });

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
    const q = query(collection(db, 'games'));
    onSnapshot(q, (querySnapshot) => {
      setGames(querySnapshot.docs);
    });
  }

  useEffect(() => {
    loadTeams();
    loadPlayers();
    loadGames();
  }, []);

  return (
    <StateContext.Provider
      value={{ games, teams, players, gameState: InitialGameState }}
    >
      <div className='App'>
        <div className='App-header'>
          <MainNavigation />
          <Routes>
            <Route path='games' element={<GamesPage />}></Route>
            <Route path='teams' element={<TeamsPage />}></Route>
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
