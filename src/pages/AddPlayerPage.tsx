import React, { useContext } from 'react';
import { StateContext } from '../context/StateContext';
import AddPlayer from '../components/AddPlayer';
import { IPlayer } from '../types'

export default function AddPlayerPage() {
  const { teams } = useContext(StateContext);
  return (
    <div className='AddPlayerPage page'>
      <div className='AddPlayer__wrapper'>
        <AddPlayer
          teams={teams}
          onComplete={(p: IPlayer) => {}}
          onCancel={() => {
            // dispatch({ type: AddGoalActions.addNewPlayer, payload: false });
          }}
        />
      </div>
    </div>
  );
}
