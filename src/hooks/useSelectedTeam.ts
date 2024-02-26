import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { StateContext } from '../context/StateContext';
import { Team } from '../types';

export function useSelectedTeam():Team {
  const { teamId } = useParams();
  const { teams: teamData } = useContext(StateContext);
  const selectedTeam = teamData.find((t: Team) => t.id === teamId);
  return selectedTeam;
}
