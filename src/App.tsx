import React, { useState, useEffect, useReducer } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { IPlayer, Player, ITeam, Team, IGoal, Goal, Match, IMatch } from './types';
import { InitialGameState } from './reducers/GameRecorderReducer';
import { AppStateReducer, initialAppState } from './reducers/AppStateReducer';
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
  doc,
  DocumentReference
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
  const [state, dispatch] = useReducer(AppStateReducer, initialAppState);
  // const { goals, teams, players, games, gameState } = state;

  const loadGoals = async () => {
      const q = query(collection(db, 'goals'));
      onSnapshot(q, (querySnapshot) => {
        console.log('setting goals....');
        dispatch({ type: 'goals', payload: querySnapshot?.docs || []});
      });

  }
  const loadTeams = async () => {
      const q = query(collection(db, 'teams'));
      onSnapshot(q, (querySnapshot) => {
        dispatch({ type: 'teams', payload: querySnapshot?.docs || [] });
        console.log('setting teams....');
      });

  }
  const loadPlayers = async () => {
    const q = query(collection(db,'players'));
    onSnapshot(q, (querySnapshot) => {
      dispatch({ type: 'players', payload: querySnapshot?.docs || [] });
      console.log('setting players....');
    });
  }
  const loadGames = async () => {
    const q = query(collection(db, 'games'));
    onSnapshot(q, (querySnapshot) => {
      dispatch({ type: 'games', payload: querySnapshot?.docs || [] });
      console.log('setting games....')
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
      value={{
        games: state?.games,
        teams: state?.teams,
        players: state?.players,
        gameState: state?.gameState,
        goals: state?.goals,
      }}
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
              <AnimatedPage title='Log a game'>
                <AddGamePage />
              </AnimatedPage>
            }
          ></Route>
          <Route
            path='games/edit/:gameId'
            element={
              <AnimatedPage title='Log a game'>
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
