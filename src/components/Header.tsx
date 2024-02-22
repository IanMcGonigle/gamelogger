import React from 'react';
import logo from '../images/logo.png';
import { useSelectedTeam } from '../hooks/useSelectedTeam';

type HeaderProps = {
  title: string;
};

function Header(props:HeaderProps) {
  const { title } = props;
  const team = useSelectedTeam();
  if( team ){
    console.log('team name ', team.name)
  }
  return (
    <header className='Header'>
      <div className='container'>
        <img className='logo' src={team?.badge || logo} alt='epl logo' />
        <h1>{team?.name || title}</h1>
      </div>
    </header>
  );
}

export default Header