import React, { useContext } from 'react';
import { Link} from 'react-router-dom';
import { format } from 'date-fns';
import { StateContext, State } from '../context/StateContext';
import { Team, Match, Goal, Player } from '../types';
import { useSelectedTeam } from '../hooks/useSelectedTeam';

export default function TeamPage() {
  const { teams, games, players} = useContext(StateContext) as State;;
  const selectedTeam:Team = useSelectedTeam();
  const renderGoals = (teamGoals: Goal[]): React.ReactElement => {
    return (
      <ul className='goalList'>
        {teamGoals?.map((g: Goal) => {
          const { ownGoal, penaltyKick, playerId } = g;
          const player = players.find((p: Player) => p.id === playerId);
          let display = `#${player?.fullName}`;
          if (ownGoal) display += ' (OG)';
          if (penaltyKick) display += ' (P)';
          return <li>{display}</li>;
        })}
      </ul>
    );
  };
  const teamGames = games.filter((match: Match) =>
      match.homeId === selectedTeam.id || match.awayId === selectedTeam.id
  ).sort((a:Match, b:Match) => {
    return new Date(b.date).valueOf() - new Date(a.date).valueOf();
  });

  teams.sort((t1: Team, t2: Team) => t2.getPoints() - t1.getPoints());
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
              {teamGames.map((match: Match, index: number) => {
                const selId = selectedTeam?.id;
                const g: Match = match;
                const { homeId, homeGoals, awayGoals, draw } = g;
                const location = homeId === selId ? 'Home' : 'Away';
                const opponentId = homeId === selId ? g.awayId : g.homeId;
                const opponent = teams.find((t: Team) => {
                  return t.id === opponentId;
                });
                let points = '0';
                let outcome;
                if (draw) {
                  outcome = 'Draw';
                  points = '1';
                } else if (g.winner === selId) {
                  outcome = 'Win';
                  points = '3';
                } else {
                  outcome = 'Loss';
                }
                return (
                  <tr key={g.id}>
                    <td>
                      {format(new Date(g.date.split('-').join('/')), 'PP')}
                    </td>
                    <td>
                      <Link to={`../teams/${opponent?.id}`}>
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
                      {homeId === selId
                        ? renderGoals(g?.homeGoals)
                        : renderGoals(g?.awayGoals)}
                    </td>
                    <td>
                      {homeId === selId
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
