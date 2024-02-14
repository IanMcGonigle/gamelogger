import React from 'react';
import { Link } from 'react-router-dom';


export default function MainNavigation() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/games'>Games</Link>
          </li>
          <li>
            <Link to='/teams'>Teams</Link>
          </li>
          <li>
            <Link to='/players'>Players</Link>
          </li>
          <li>
            <Link to='/add-player'>Add Player</Link>
          </li>
          <li>
            <Link to='/add-game'>Add Game</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}