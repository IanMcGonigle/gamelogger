import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StateContext } from '../context/StateContext';
import { Team, ITeam, IMatch } from '../types';
import { DocumentReference, QueryDocumentSnapshot } from 'firebase/firestore';

export default function TeamsPage() {
  const { teams, games } = useContext(StateContext);
  teams.sort( (t1:Team, t2:Team) => t2.getPoints() - t1.getPoints() );

  return (
    <div className='Teams page'>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Points</th>
            <th>Matches</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Draws</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((t: Team) => {
            const wins = t.getWins().length;
            const loss = t.getLosses().length;
            const draws = t.getDraws().length;
            // console.log(t)
            return (
              <tr key={t.id}>
                <td>
                  <Link to={`/teams/${t.id}`}>
                    <img src={t.badge} alt={t.name} width='50px' />
                    {t.name}
                  </Link>
                </td>
                <td>{wins * 3 + draws}</td>
                <td>{t.matches.length}</td>
                <td>{wins}</td>
                <td>{loss}</td>
                <td>{draws}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
