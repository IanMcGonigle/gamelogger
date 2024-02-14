import { setDoc, getDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db, colletionPlayers } from '../database/firebase';
import { GameState } from '../reducers/GameRecorderReducer';
import { IGame, IPlayer, ITeam } from '../types';

export const updateGame = async (id: string, gameData: GameState) => {
  try{
    const docRef = doc(db, 'games', id);
    await setDoc(docRef, gameData);
    await updateTeamStats(id, gameData.home as ITeam);
    await updateTeamStats(id, gameData.away as ITeam);
    return docRef.id;
  }catch(error){
    return error;
  }
};

export const addNewPlayer = async ( playerData:IPlayer ) => {
  try {
    const docRef = doc(colletionPlayers);
    await setDoc(docRef, playerData);
    return docRef.id
  } catch (error) {
    console.error(error);
    return error;
  }
}

const updateTeamStats = async (gameId: string, team:ITeam) => {
  const teamRef = doc(db, 'teams', team.id);
  const teamSnap = await getDoc(teamRef);
  const matches = teamSnap.data()?.matches || [];
  const matchExists = matches.some((g: IGame) => g?.id === gameId);

  if (matchExists) return;

  const gameRef = doc(db, 'games', gameId);
  const docSnap = await getDoc(gameRef);

  await updateDoc(teamRef, {
    matches: arrayUnion({ id:gameId, ...docSnap.data()}),
  });

  return;
};