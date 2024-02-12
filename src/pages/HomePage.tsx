import React, { useContext } from 'react';
import { StateContext } from '../context/StateContext';

export default function HomePage() {
  const state = useContext(StateContext);
  return (
    <div className='HomePage'>
      <h1>Home</h1>
    </div>
  );
}
