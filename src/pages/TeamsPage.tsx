import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StateContext } from '../context/StateContext';
import { Team, ITeam } from '../types';

export default function TeamsPage() {
  const { teams:teamData } = useContext(StateContext);
  const teams = teamData.map((t: ITeam) => new Team({...t}));
  teams.sort( (t1:Team, t2:Team) => t2.getPoints() - t1.getPoints() );

  return (
    <div className='Teams page'>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Matches</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Draws</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((t: Team) => {
            const wins = t.getWins().length;
            const loss = t.getLosses().length;
            const draws = t.getDraws().length;
            return (
              <tr>
                <td>
                  <Link to={`/teams/${t.id}`}>
                    <img src={t.badge} alt={t.name} width='50px' />
                    {t.name}
                  </Link>
                </td>
                <td>{t.matches.length}</td>
                <td>{wins}</td>
                <td>{loss}</td>
                <td>{draws}</td>
                <td>{wins * 3 + draws}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
