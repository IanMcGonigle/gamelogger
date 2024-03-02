import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { DocumentData } from 'firebase/firestore';
import { StateContext } from '../context/StateContext';
import { deleteGame } from '../database/dataActions';
import { Match, Team } from '../types'

export default function GamesPage() {
  const { games, teams } = useContext(StateContext);
  const navigate = useNavigate();

  games.sort((a: Match, b: Match) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  return (
    <div className='GamesPage page'>
      {games.length > 0 && (
        <>
            <button
              onClick={() => {
                navigate('/add-game');
              }}
            >
              Add New Game
            </button>

          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Home</th>
                <th>Away</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {games.map((g: Match) => {
                // const { date = '', home, away, homeGoals, awayGoals } = g.data();
                const date = g.date;
                const home = teams.find( (t:Team) => {
                  return g.homeId === t.id;
                });
                const away = teams.find((t: Team) => g.awayId === t.id);
                const homeGoals = g.homeGoals;
                const awayGoals = g.awayGoals;
                let formattedDate:string;
                formattedDate = date ? format(
                  new Date(date.split('-').join('/')),
                  'PP'
                ) : '';
                return (
                  <tr key={g.id}>
                    <td>{formattedDate}</td>
                    <td>
                      <Link to={`../teams/${home?.id}`}>
                        {home?.badge && (
                          <img
                            src={home?.badge}
                            alt={home?.name}
                            width='25px'
                          />
                        )}
                        {`${home?.name}: ${homeGoals?.length}`}
                      </Link>
                    </td>
                    <td>
                      <Link to={`../teams/${away?.id}`}>
                        {away?.badge && (
                          <img
                            src={away?.badge}
                            alt={away?.name}
                            width='25px'
                          />
                        )}
                        {`${away?.name}: ${awayGoals?.length}`}
                      </Link>
                    </td>
                    <td>
                      <Link
                        className='btn'
                        title='Edit Game'
                        to={`edit/${g.id}`}
                      >
                        &#x270E;
                      </Link>
                      <button
                        title='Delete game'
                        onClick={(e) => {
                          const message = `Are you sure you want to delete the following match: ${home.name} vs. ${away.name} from ${formattedDate}?`;
                          if (window.confirm(message)) {
                            deleteGame(g.id);
                          }
                        }}
                      >
                        &#x2716;
                      </button>
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
