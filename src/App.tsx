import React, { useState, useEffect} from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { IPlayer, ITeam, Team } from './types';
import { InitialGameState } from './reducers/GameRecorderReducer';
import './App.scss';
import logo from './images/logo-small.png';
import { StateContext } from './context/StateContext';
import { colletionTeams, db } from './database/firebase';
import {
  getDocs,
  onSnapshot,
  collection,
  query,
  DocumentData,
  updateDoc,
  doc
} from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import MainNavigation from './components/MainNavigation';
import GamesPage from './pages/GamesPage';
import TeamsPage from './pages/TeamsPage';
import PlayersPage from './pages/PlayersPage';
import AddPlayerPage from './pages/AddPlayerPage';
import HomePage from './pages/HomePage';
import AddGamePage from './pages/AddGamePage';
import EditGamePage from './pages/EditGamePage';
import TeamPage from './pages/TeamPage';
import AnimatedPage from './pages/AnimatedPage';

// import { badges } from './dummyPlayers';


function App() {

  const [players, setPlayers] = useState<IPlayer[] | []>([]);
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [games, setGames] = useState<DocumentData[]>([])

  const loadTeams = async () => {
      const q = query(collection(db, 'teams'));
      onSnapshot(q, (querySnapshot) => {
        const newTeams: Array<ITeam> = querySnapshot.docs.filter( item => Boolean(item.data()?.name)).map((item) => {
          const { name, badge, matches = [] } = item.data() as ITeam;
            return { id: item.id, name, matches, badge } as ITeam;
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
      console.log('set games')
      setGames(querySnapshot.docs);
    });
  }

  useEffect(() => {
    loadTeams();
    loadPlayers();
    loadGames();
  }, []);

  const myLocation = useLocation();

  return (
    <StateContext.Provider
      value={{ games, teams, players, gameState: InitialGameState }}
    >
      <div className='App'>
        <MainNavigation />
        <Routes location={myLocation} key={myLocation.pathname}>
          <Route
            path='games'
            element={
              <AnimatedPage title='Games'>
                <GamesPage />
              </AnimatedPage>
            }
          ></Route>
          <Route
            path='teams'
            element={
              <AnimatedPage title='Leader Board'>
                <TeamsPage />
              </AnimatedPage>
            }
          ></Route>
          <Route
            path='players'
            element={
              <AnimatedPage title='Goal Leaders'>
                <PlayersPage />
              </AnimatedPage>
            }
          ></Route>
          <Route
            path='add-player'
            element={
              <AnimatedPage title='Add a player'>
                <AddPlayerPage />
              </AnimatedPage>
            }
          ></Route>
          <Route
            path='add-game'
            element={
              <AnimatedPage title='Add a game'>
                <AddGamePage />
              </AnimatedPage>
            }
          ></Route>
          <Route
            path='games/edit/:gameId'
            element={
              <AnimatedPage title='EditGamePage'>
                <EditGamePage />
              </AnimatedPage>
            }
          ></Route>
          <Route
            path='teams/:teamId'
            element={
              <AnimatedPage title='23/24'>
                <TeamPage />
              </AnimatedPage>
            }
          ></Route>
          <Route
            path='/'
            element={
              <AnimatedPage title='Premier League 2023/24'>
                <HomePage />
              </AnimatedPage>
            }
          ></Route>
        </Routes>
        <footer>
          <img src={logo} />
          Grant & Dad's EPL Game Tracker
        </footer>
      </div>
    </StateContext.Provider>
  );
}

export default App;
