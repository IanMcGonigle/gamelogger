import React, { useState } from 'react';
import { IPlayer, ITeam, GameRecorderProps } from '../types';
import TeamSelector from './TeamSelector';
import TeamCard from './TeamCard';



export default function GameRecorder (props: GameRecorderProps) {
  const { teams, players}  = props;
  const [homeTeam, setHomeTeam] = useState<ITeam>();
  const [awayTeam, setAwayTeam] = useState<ITeam>();

  return (
    <div className='GameRecorder'>
      <div className='team'>
        {homeTeam !== undefined ? (
          <>
            <p>Home:</p>
            <TeamCard us={homeTeam} them={awayTeam} players={players} />
          </>
        ) : (
          <>
            <p>Select home:</p>
            <TeamSelector
              teams={teams.filter((t: ITeam) => t.id !== awayTeam?.id)}
              setTeam={setHomeTeam}
            />
          </>
        )}
      </div>
      <div className='team'>
        {awayTeam !== undefined ? (
          <>
            <p>away</p>
            <TeamCard us={awayTeam} them={awayTeam} players={players} />
          </>
        ) : (
          <>
            <p>Select away:</p>
            <TeamSelector
              teams={teams.filter((t: ITeam) => t.id !== homeTeam?.id)}
              setTeam={setAwayTeam}
            />
          </>
        )}
      </div>
    </div>
  );
}
