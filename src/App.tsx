import React, { useState, useEffect} from 'react';
import logo from './logo.svg';
import { IPlayer, ITeam } from './types';
import AddPlayer from './components/AddPlayer'
import './App.css';
import GameRecorder from './components/GameRecorder';
import dummy from './dummyPlayers';
import {db, colletionTeams, colletionPlayers} from './database/firebase';
import {
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
  getDocs,
  doc,
} from 'firebase/firestore';


function App() {

  const [players, setPlayers] = useState<IPlayer[] | []>(dummy);
  const [teams, setTeams] = useState<ITeam[]>([]);

  const [teamName, setTeamName] = useState('');

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

  useEffect(() => {
    loadTeams();
    loadPlayers();
    // initialzeLFC();
    // initializeTeams();
  }, []);

  // const addPlayer = (player:IPlayer) => {
  //   setPlayers( [...players, player]);
  //   console.log(players)
  // }
  // const teamById = (id:number):string => {
  //   const sel = teams.find( (team:ITeam) => {
  //     return team.id === id;
  //   });

  //   return sel?.name || '';
  // }
  return (
    <div className='App'>
      <div className='App-header'>
        <GameRecorder teams={teams} players={players} />
        {/* <hr /> */}

        {/* <input
          type='text'
          id='teamName'
          placeholder='add team'
          onChange={(e) => setTeamName(e.target.value)}
        />
        <button onClick={() => addTeam()}>Add Team</button> */}
      </div>
    </div>
  );
}

export default App;
