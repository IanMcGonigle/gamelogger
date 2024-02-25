import React, { useContext } from 'react';
import { Link} from 'react-router-dom';
import { format } from 'date-fns';
import { StateContext } from '../context/StateContext';
import { Team, ITeam, IGame, IGoal } from '../types';
import { useSelectedTeam } from '../hooks/useSelectedTeam';
import { DocumentReference } from 'firebase/firestore';

export default function TeamPage() {
  const { teams:teamData, games } = useContext(StateContext);
  const teams = teamData.map((t: ITeam) => new Team(t, games));
  const selectedTeam = useSelectedTeam();
  teams.sort( (t1:Team, t2:Team) => t2.getPoints() - t1.getPoints() );

  const renderGoals = (goals:IGoal[]): React.ReactElement => {
    return (
      <ul className='goalList'>
        {goals?.map((g:IGoal)=>{
          const { ownGoal, penaltyKick, player} = g;
          const { jerseyNumber, firstName, lastName } = player;
          let display = `#${jerseyNumber} ${firstName} ${lastName}`;
          if(ownGoal) display += ' (OG)';
          if (penaltyKick) display += ' (P)';
          return <li>{display}</li>;
        })}
      </ul>
    )
  }

  return (
    <div className='Team page'>
      {selectedTeam && (
        <>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Versus</th>
                <th>score</th>
                <th>Outcome</th>
                <th>{selectedTeam.name} goals</th>
                <th>Opposing goals</th>
                <th>Location</th>
                <th>Points</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {selectedTeam?.matches.map((gameId:string) => {
                const gameDoc:any = games.find( (doc:any) => doc.id === gameId);
                const g:IGame = gameDoc?.data() as IGame;
                const selId = selectedTeam?.id;
                const { home, homeGoals, awayGoals, winner, draw } = g;
                const location = g.home?.id === selId ? 'Home' : 'Away';
                const opponent = g.home?.id === selId ? g.away : g.home;
                let points = '0';
                let outcome;
                if (draw) {
                  outcome = 'Draw';
                  points = '1';
                } else if (winner?.id === selId) {
                  outcome = 'Win';
                  points = '3';
                } else {
                  outcome = 'Loss';
                }
                return (
                  <tr key={g.id}>
                    <td>{format(new Date(g.date.split('-').join('/')), 'PP')}</td>
                    <td>
                      <Link to={`../teams/${opponent.id}`}>
                        {opponent?.badge && (
                          <img
                            src={opponent?.badge}
                            width='30px'
                            alt={opponent?.name}
                          />
                        )}
                        {opponent?.name}
                      </Link>
                    </td>
                    <td>
                      {homeGoals?.length} : {awayGoals?.length}
                    </td>
                    <td>{outcome}</td>
                    <td>
                      {home?.id === selId
                        ? renderGoals(homeGoals)
                        : renderGoals(awayGoals)}
                    </td>
                    <td>
                      {home?.id === selId
                        ? renderGoals(awayGoals)
                        : renderGoals(homeGoals)}
                    </td>
                    <td>{location}</td>
                    <td>{points}</td>
                    <td>
                      <Link className='btn' to={`../games/edit/${g.id}`}>
                        &#x270E;
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
