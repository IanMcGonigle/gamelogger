import React, { useState } from 'react';
import logo from './logo.svg';
import { IPlayer, ITeam } from './types';
import AddPlayer from './components/AddPlayer'
import './App.css';
import GameRecorder from './components/GameRecorder';
import dummy from './dummyPlayers';

const teams = [
{id: 0, name:'Arsenal'},
{id: 1, name:'Aston Villa'},
{id: 2, name:'Bournemouth'},
{id: 3, name:'Brentford'},
{id: 4, name:'Brighton & Hove Albion'},
{id: 5, name:'Burnley'},
{id: 6, name:'Chelsea'},
{id: 7, name:'Crystal Palace'},
{id: 8, name:'Everton'},
{id: 9, name:'Fulham'},
{id: 10, name:'Liverpool'},
{id: 11, name:'Luton Town'},
{id: 12, name:'Manchester City'},
{id: 13, name:'Manchester United'},
{id: 14, name:'Newcastle United'},
{id: 15, name:'Nottingham Forest'},
{id: 16, name:'Sheffield United'},
{id: 17, name:'Tottenham Hotspur'},
{id: 18, name:'West Ham United'},
{id: 19, name:'Wolverhampton Wanderers'},
];

function App() {

  const [players, setPlayers] = useState<IPlayer[] | []>(dummy);

  const addPlayer = (player:IPlayer) => {
    setPlayers( [...players, player]);
    console.log(players)
  }
  const teamById = (id:number):string => {
    const sel = teams.find( (team:ITeam) => {
      return team.id === id;
    });

    return sel?.name || '';
  }
  return (
    <div className='App'>
      <div className='App-header'>
        <GameRecorder teams={teams} players={players}/>
        <hr />
        {/* <h2>All players added</h2>
        <ul>
          {players.map( (p:IPlayer  )=> {
            return (
              <li key={p.firstName + p.lastName + p.jerseyNumber}>
                #{p.jerseyNumber} {p.firstName} {p.lastName} for {teamById(p.teamId)}
              </li>
            );
          })}
        </ul> */}
        {/* <AddPlayer teams={teams} onComplete={addPlayer} onCancel={() => {}} /> */}
      </div>
    </div>
  );
}

export default App;
