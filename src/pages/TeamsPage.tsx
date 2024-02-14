import React, { useContext } from 'react';
import { StateContext } from '../context/StateContext';
import { Team } from '../types';

export default function TeamsPage() {
  const { teams } = useContext(StateContext);
  teams.sort( (t1:Team, t2:Team) => t2.getPoints() - t1.getPoints() );

  return (
    <div className='Teams'>
      <h1>Teams</h1>
      <table>
        <thead>
          <td>Name</td>
          <td>Wins</td>
          <td>Losses</td>
          <td>Draws</td>
          <td>Points</td>
        </thead>
        <tbody>
          {teams.map((t: Team) => {
            const wins = t.getWins().length;
            const loss = t.getLosses().length;
            const draws = t.getDraws().length;
            return (
              <tr>
                <td>{t.name}</td>
                <td>{wins}</td>
                <td>{loss}</td>
                <td>{draws}</td>
                <td>{(wins*3) + (draws)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
