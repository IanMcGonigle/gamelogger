import React, { useContext } from 'react';
import { StateContext } from '../context/StateContext';
import { IPlayer, ITeam } from '../types';


export default function PlayersPage() {
  const { players, teams } = useContext(StateContext);
  const getFullName = (p:IPlayer):string => {
    const result = `#${p.jerseyNumber} ${p.firstName} ${p.lastName}` || '';
    return result;
  };
  const sortByGoalsScored = ( p1:IPlayer, p2:IPlayer ):number => {
    // console.log(getFullName(p1), ': ',p1.goals, getFullName(p2), ': ', p2.goals );
    // console.log('returning : ', p1.goals - p2.goals);
    return p2.goals - p1.goals;
  }
  const teamNameById = (id:string|number):string => {
    const t: ITeam = teams.find((t: ITeam) => t.id === id);
    return t ? t.name : '';
  }
  return (
    <div className='PlayersPage page'>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Goals Scored</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {players.sort(sortByGoalsScored).map((p: IPlayer, index: number) => {
            return (
              <tr key={p.id}>
                <td>{index + 1}</td>
                <td>{getFullName(p)}</td>
                <td>{p.goals || 0}</td>
                <td>{teamNameById(p.teamId)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
