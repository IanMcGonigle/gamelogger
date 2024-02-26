import React, { useContext } from 'react';
import { StateContext } from '../context/StateContext';
import { Player, ITeam } from '../types';


export default function PlayersPage() {
  const { players, teams } = useContext(StateContext);

  const sortByGoalsScored = ( p1:Player, p2:Player ):number => {
    return p2.goalsScoredCount - p1.goalsScoredCount;
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
          {players.sort(sortByGoalsScored).map((p: Player, index: number) => {
            return (
              <tr key={p.id}>
                <td>{index + 1}</td>
                <td>{p.fullName}</td>
                <td>{p.goalsScoredCount || 0}</td>
                <td>{teamNameById(p.teamId)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
