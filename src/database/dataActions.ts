import { setDoc, getDoc, doc, updateDoc, increment } from 'firebase/firestore';
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
    console.log('updateGame error ', error);
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

export const incrementGoalsScored = async (playerData: IPlayer, count:number) => {
  try {
    const playerDocRef = doc(db, 'players', playerData.id);
    await updateDoc(playerDocRef, { goals: increment(count) });
  } catch (error) {
    console.log('error adding goal');
  }
};

const updateTeamStats = async (gameId: string, team:ITeam) => {
  const teamRef = doc(db, 'teams', team.id);
  const teamSnap = await getDoc(teamRef);
  const matches = teamSnap
    .data()
    ?.matches.filter((g: IGame) => g?.id !== gameId);
  const gameRef = doc(db, 'games', gameId);
  const docSnap = await getDoc(gameRef);

  await updateDoc(teamRef, {
    matches: [...matches, { id:gameId, ...docSnap.data()}],
  });

  return;
};