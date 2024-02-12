import React, { useContext } from 'react';
import { StateContext } from '../context/StateContext';

export default function TeamsPage() {
  const state = useContext(StateContext);
  return (
    <div className='Teams'>
      <h1>Teams</h1>
    </div>
  );
}
