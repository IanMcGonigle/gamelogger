import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StateContext } from '../context/StateContext';
import { Team, ITeam, IGame } from '../types';
import { DocumentReference } from 'firebase/firestore';

export default function TeamsPage() {
  const { teams:teamData, games:gameData } = useContext(StateContext);
  const teams = teamData.map((t: ITeam) => new Team(t, gameData));
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
            const matches = t.matches;

            if( t.name === 'Liverpool' || t.name === 'Luton Town'){
                const gdWins = gameData.filter( (g:any) => {
                  console.log({g})
                  console.log(g.data())
                  const data = g?.data() as IGame;
                  console.log('winner is: ', data?.winner?.id, 'team is ', t.id);
                  return data?.winner?.id === t.id;
                })

                console.log('')
                console.log('-------------------------------')
                console.log('')
                console.log(t.name);
                console.log('t.id ', t.id);
                console.log({wins})
                console.log({loss})
                console.log({draws})
                console.log({ gdWins });
                console.log({ matches });
                console.log('')
                console.log('-------------------------------')
                console.log('')
            }
            return (
              <tr>
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
