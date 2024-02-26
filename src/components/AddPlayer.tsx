import { useState } from 'react';
import { addNewPlayer } from '../database/dataActions';
import { Team, IPlayer } from '../types';

type AddPlayerProps = {
  teams: Array<Team>;
  onComplete: Function;
  onCancel: Function;
};

function AddPlayer(props: AddPlayerProps) {
  const { teams, onComplete, onCancel } = props;
  const selectedTeam = teams.length === 1 ? teams[0].id : '-1';
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [jerseyNumber, setJerseyNumber] = useState<string>('');
  const [teamId, setTeamId] = useState<string>(selectedTeam);

  const getData = () => {
    return {
      firstName: firstName,
      lastName: lastName,
      jerseyNumber: jerseyNumber,
      teamId: teamId,
      goals: [],
    };
  }
  const reset = () =>{
    setFirstName('')
    setLastName('')
    setJerseyNumber('');
    setTeamId('');
  };
  return (
    <div className='AddPlayer'>
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
      <div className='buttonRow'>
        <button
          onClick={ async () => {
            const playerData = getData() as IPlayer;
            const playerId = await addNewPlayer(playerData)
            onComplete({ ...playerData, id: playerId });
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