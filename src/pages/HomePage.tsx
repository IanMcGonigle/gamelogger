import React, { useContext } from 'react';
import { StateContext } from '../context/StateContext';
import { ITeam } from '../types';
import Header from '../components/Header';

export default function HomePage() {
  const { teams } = useContext(StateContext);
  return (
    <div className='HomePage page'>
      <ul className='teamGrid'>
        {teams
          .sort((t1: ITeam, t2: ITeam) => t1?.name < t2?.name)
          .map((t: ITeam) => {
            return (
              <li key={t.id}>
                <a href={`#/teams/${t.id}`}>
                  <img src={t.badge} alt={t.name} />
                </a>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
