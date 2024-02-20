import React, { useContext } from 'react';
import { StateContext } from '../context/StateContext';
import { ITeam } from '../types';

export default function HomePage() {
  const { teams } = useContext(StateContext);
  return (
    <div className='HomePage page'>
      <h1>23/24 Teams</h1>
      <ul className='teamGrid'>
        { teams.sort( (t1:ITeam, t2:ITeam) => t1?.name < t2?.name).map( (t:ITeam) => {
          return (
            <li key={t.id}>
              <a href={`/teams/${t.id}`}>
                <img src={t.badge} alt={t.name} />
              </a>
              {/* <h3>{t.name || t.id}</h3> */}
            </li>
          );
        })}
      </ul>
      {/* <ul className='teamGrid'>
        <li>
          <a
            href='https://resources.premierleague.com/premierleague/badges/100/t3@x2.png'
            download
          >
            <img
              src='https://resources.premierleague.com/premierleague/badges/100/t3@x2.png'
              alt='Arsenal'
            />
          </a>
        </li>
        <li>
          <a
            href='https://resources.premierleague.com/premierleague/badges/100/t7@x2.png'
            download
          >
            <img
              src='https://resources.premierleague.com/premierleague/badges/100/t7@x2.png'
              alt='Aston Villa'
            />
          </a>
        </li>
        <li>
          <a
            href='https://resources.premierleague.com/premierleague/badges/100/t91@x2.png'
            download
          >
            <img
              src='https://resources.premierleague.com/premierleague/badges/100/t91@x2.png'
              alt='AFC Bournemouth'
            />
          </a>
        </li>
        <li>
          <a
            href='https://resources.premierleague.com/premierleague/badges/100/t94@x2.png'
            download
          >
            <img
              src='https://resources.premierleague.com/premierleague/badges/100/t94@x2.png'
              alt='Brentford'
            />
          </a>
        </li>
        <li>
          <a
            href='https://resources.premierleague.com/premierleague/badges/100/t36@x2.png'
            download
          >
            <img
              src='https://resources.premierleague.com/premierleague/badges/100/t36@x2.png'
              alt='Brighton &amp; Hove Albion'
            />
          </a>
        </li>
        <li>
          <a
            href='https://resources.premierleague.com/premierleague/badges/100/t90@x2.png'
            download
          >
            <img
              src='https://resources.premierleague.com/premierleague/badges/100/t90@x2.png'
              alt='Burnley'
            />
          </a>
        </li>
        <li>
          <a
            href='https://resources.premierleague.com/premierleague/badges/100/t8@x2.png'
            download
          >
            <img
              src='https://resources.premierleague.com/premierleague/badges/100/t8@x2.png'
              alt='Chelsea'
            />
          </a>
        </li>
        <li>
          <a
            href='https://resources.premierleague.com/premierleague/badges/100/t31@x2.png'
            download
          >
            <img
              src='https://resources.premierleague.com/premierleague/badges/100/t31@x2.png'
              alt='Crystal Palace'
            />
          </a>
        </li>
        <li>
          <a
            href='https://resources.premierleague.com/premierleague/badges/100/t11@x2.png'
            download
          >
            <img
              src='https://resources.premierleague.com/premierleague/badges/100/t11@x2.png'
              alt='Everton '
            />
          </a>
        </li>
        <li>
          <a
            href='https://resources.premierleague.com/premierleague/badges/100/t54@x2.png'
            download
          >
            <img
              src='https://resources.premierleague.com/premierleague/badges/100/t54@x2.png'
              alt='Fulham'
            />
          </a>
        </li>
        <li>
          <a
            href='https://resources.premierleague.com/premierleague/badges/100/t14@x2.png'
            download
          >
            <img
              src='https://resources.premierleague.com/premierleague/badges/100/t14@x2.png'
              alt='Liverpool'
            />
          </a>
        </li>
        <li>
          <a
            href='https://resources.premierleague.com/premierleague/badges/100/t102@x2.png'
            download
          >
            <img
              src='https://resources.premierleague.com/premierleague/badges/100/t102@x2.png'
              alt='Luton Town'
            />
          </a>
        </li>
        <li>
          <a
            href='https://resources.premierleague.com/premierleague/badges/100/t43@x2.png'
            download
          >
            <img
              src='https://resources.premierleague.com/premierleague/badges/100/t43@x2.png'
              alt='Manchester City'
            />
          </a>
        </li>
        <li>
          <a
            href='https://resources.premierleague.com/premierleague/badges/100/t1@x2.png'
            download
          >
            <img
              src='https://resources.premierleague.com/premierleague/badges/100/t1@x2.png'
              alt='Manchester United'
            />
          </a>
        </li>
        <li>
          <a
            href='https://resources.premierleague.com/premierleague/badges/100/t4@x2.png'
            download
          >
            <img
              src='https://resources.premierleague.com/premierleague/badges/100/t4@x2.png'
              alt='Newcastle United'
            />
          </a>
        </li>
        <li>
          <a
            href='https://resources.premierleague.com/premierleague/badges/100/t17@x2.png'
            download
          >
            <img
              src='https://resources.premierleague.com/premierleague/badges/100/t17@x2.png'
              alt='Nottingham Forest'
            />
          </a>
        </li>
        <li>
          <a
            href='https://resources.premierleague.com/premierleague/badges/100/t49@x2.png'
            download
          >
            <img
              src='https://resources.premierleague.com/premierleague/badges/100/t49@x2.png'
              alt='Sheffield United'
            />
          </a>
        </li>
        <li>
          <a
            href='https://resources.premierleague.com/premierleague/badges/100/t6@x2.png'
            download
          >
            <img
              src='https://resources.premierleague.com/premierleague/badges/100/t6@x2.png'
              alt='Tottenham Hotspur'
            />
          </a>
        </li>
        <li>
          <a
            href='https://resources.premierleague.com/premierleague/badges/100/t21@x2.png'
            download
          >
            <img
              src='https://resources.premierleague.com/premierleague/badges/100/t21@x2.png'
              alt='West Ham United'
            />
          </a>
        </li>
        <li>
          <a
            href='https://resources.premierleague.com/premierleague/badges/100/t39@x2.png'
            download
          >
            <img
              src='https://resources.premierleague.com/premierleague/badges/100/t39@x2.png'
              alt='Wolverhampton Wanderers'
            />
          </a>
        </li>
      </ul> */}
    </div>
  );
}
