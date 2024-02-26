import React, { useState, useEffect} from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { IPlayer, Player, ITeam, Team, IGoal, Goal, Match, IMatch } from './types';
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

  const [players, setPlayers] = useState<Player[] | []>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [games, setGames] = useState<Match[]>([])

  const loadGoals = async () => {
      const q = query(collection(db, 'goals'));
      onSnapshot(q, (querySnapshot) => {
        const newGoals: Array<Goal> = querySnapshot.docs.filter( item => Boolean(item.data()?.name)).map((item) => {
          const data = item.data() as IGoal;
            return new Goal({...data, id: item.id});
        });
        setGoals(newGoals);
      });

  }
  const loadTeams = async () => {
      const q = query(collection(db, 'teams'));
      onSnapshot(q, (querySnapshot) => {
        const newTeams: Array<Team> = querySnapshot.docs.filter( item => Boolean(item.data()?.name)).map((item) => {
          const data = item.data() as ITeam;
            return new Team({...data, id:item.id}, games);
        });
        setTeams(newTeams);
      });

  }
  const loadPlayers = async () => {
    const q = query(collection(db,'players'));
    onSnapshot(q, (querySnapshot) => {
      const newPlayers: Array<Player> = querySnapshot.docs.map((item) => {
        const data = { ...item.data(), id: item.id } as IPlayer;
        return new Player(data, goals);
      });
      setPlayers(newPlayers);
    });
  }
  const loadGames = async () => {
    const q = query(collection(db, 'games'));
    onSnapshot(q, (querySnapshot) => {
      const newGames: Match[] = querySnapshot.docs.map( (item) => {
        const data:IMatch = item.data() as IMatch;
        return new Match({...data, id:item.id}, goals, teams);
      });
      console.log('set games')
      setGames(newGames);
    });
  }

  useEffect(() => {
    loadGoals();
    loadTeams();
    loadPlayers();
    loadGames();
  },[]);

  const myLocation = useLocation();

  return (
    <StateContext.Provider
      value={{ games, teams, players, gameState: InitialGameState, goals }}
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
          Grant & Dad's <img src={logo} alt='EPL Logo' /> Game Tracker
        </footer>
      </div>
    </StateContext.Provider>
  );
}

export default App;
