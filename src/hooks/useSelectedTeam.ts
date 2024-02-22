import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { StateContext } from '../context/StateContext';
import { ITeam } from '../types';

export function useSelectedTeam():ITeam {
  const { teamId } = useParams();
  const { teams: teamData } = useContext(StateContext);
  const selectedTeam = teamData.find((t: ITeam) => t.id === teamId);
  return selectedTeam;
}
