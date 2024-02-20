import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { StateContext } from '../context/StateContext';
import { Team, ITeam, IGame, IGoal } from '../types';

export default function TeamPage() {
  const { teamId } = useParams();
  const { teams:teamData } = useContext(StateContext);
  const teams = teamData.map((t: ITeam) => new Team({...t}));
  const selectedTeam = teamData.find( (t:ITeam) => t.id === teamId);
  teams.sort( (t1:Team, t2:Team) => t2.getPoints() - t1.getPoints() );

  const renderGoals = (goals:IGoal[]): React.ReactElement => {
    return (
      <ul>
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
          <h1>
            <img src={selectedTeam.badge} alt={selectedTeam.name}/>
            {selectedTeam.name}
          </h1>
          <table>
            <thead>
              <td>Date</td>
              <td>Versus</td>
              <td>score</td>
              <td>Outcome</td>
              <td>{selectedTeam.name} goals</td>
              <td>Opposing goals</td>
              <td>Location</td>
              <td>Points</td>
            </thead>
            <tbody>
              {selectedTeam?.matches.map( (g:IGame) => {
                const selId = selectedTeam?.id;
                const { home, homeGoals, awayGoals, winner, draw } = g;
                const location = g.home?.id === selId ? 'Home' : 'Away';
                const opponent = g.home?.id === selId ? g.away : g.home;
                let points = '0';
                let outcome;
                if(draw){
                  outcome = 'Draw'
                  points = '1';
                }else if (winner?.id === selId) {
                  outcome = 'Win';
                  points = '3';
                } else {
                  outcome = 'Loss';
                }
                return (
                  <tr>
                    <td>{g.date}</td>
                    <td>{opponent?.name}</td>
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
      {/* <table>
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
      </table> */}
    </div>
  );
}
