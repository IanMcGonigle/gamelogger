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
    return p1.goals - p2.goals;
  }
  const teamNameById = (id:string|number):string => {
    const t: ITeam = teams.find((t: ITeam) => t.id === id);
    return t ? t.name : '';
  }
  return (
    <div className='PlayersPage'>
      <h1>Goal leaders</h1>
      <table>
        <tr>
          <td>Rank</td>
          <td>Player</td>
          <td>Goals Scored</td>
          <td>Team</td>
        </tr>
        <tbody>
          {players.sort(sortByGoalsScored).map((p: IPlayer, index: number) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{getFullName(p)}</td>
                <td>{players.goals || 0}</td>
                <td>{teamNameById(p.teamId)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
