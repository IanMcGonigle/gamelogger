import React, { useState }from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { colletionPlayers } from '../database/firebase';
import { AddPlayerProps } from '../types';

function AddPlayer(props: AddPlayerProps) {
  const { teams, onComplete, onCancel } = props;
  const selectedTeam = teams.length === 1 ? teams[0].id : '-1';
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [jerseyNumber, setJerseyNumber] = useState<string>('');
  const [teamId, setTeamId] = useState<number | string>(selectedTeam);

  const getData = () => {
    return {
      firstName: firstName,
      lastName: lastName,
      jerseyNumber: jerseyNumber,
      teamId: teamId,
      goals: 0,
    };
  }
  const reset = () =>{
    setFirstName('')
    setLastName('')
    setJerseyNumber('');
    setTeamId(-1);
  };
  return (
    <div>
      <h4>Add Player</h4>
      <div className='inputRow'>
        <label htmlFor='playerFirstName'>First Name</label>
        <input
          type='text'
          id='playerFirstName'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          autoFocus
        />
      </div>
      <div className='inputRow'>
        <label htmlFor='playerLastName'>Last Name</label>
        <input
          type='text'
          id='playerLastName'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className='inputRow'>
        <label htmlFor='playerJerseyNumber'>Jersey Number</label>
        <input
          type='text'
          id='playerJerseyNumber'
          value={jerseyNumber}
          onChange={(e) => setJerseyNumber(e.target.value)}
        />
      </div>
      <div className='inputRow'>
        <label htmlFor='teamSelect'>Team</label>
        <select
          id='teamSelect'
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
        >
          <option value='-1'>Select a team</option>
          {teams.map((team) => {
            return (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className='inputRow'>
        <button
          onClick={ async () => {
            const docRef = doc(colletionPlayers);
            const playerData = getData();
            try {
                await setDoc(docRef, playerData);
                onComplete( {...playerData, id:docRef.id});
            } catch (error) {
                console.error(error);
            }
            reset();
          }}
        >
          Add Player
        </button>
        <button
          onClick={() => {
            onCancel();
            reset();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddPlayer;