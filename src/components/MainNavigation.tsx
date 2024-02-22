import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';


export default function MainNavigation() {

  const [open, setOpen] = useState(false);

  const highlightSelected = (args:any) => {
    const { isPending, isActive } = args;
    return isPending ? 'pending' : isActive ? 'active' : '';
  };
  const closeNav = () => setOpen(false);
  return (
    <div className='MainNavigation'>
      <nav className={open ? 'open' : ''}>
        <button className='navToggle' onClick={(e) => setOpen(!open)}>
          {open ? <span>&times;</span> : <span>&equiv;</span>}
        </button>
        <ul>
          <li>
            <NavLink className={highlightSelected} to='/' onClick={closeNav}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={highlightSelected} to='/games' onClick={closeNav}>
              Games
            </NavLink>
          </li>
          <li>
            <NavLink className={highlightSelected} to='/teams' onClick={closeNav}>
              Leader Board
            </NavLink>
          </li>
          <li>
            <NavLink className={highlightSelected} to='/players' onClick={closeNav}>
              Goal Leaders
            </NavLink>
          </li>
          <li>
            <NavLink className={highlightSelected} to='/add-player' onClick={closeNav}>
              Add Player
            </NavLink>
          </li>
          <li>
            <NavLink className={highlightSelected} to='/add-game' onClick={closeNav}>
              Add Game
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}