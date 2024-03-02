import {
  setDoc,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  increment,
  runTransaction,
  DocumentReference,
  writeBatch,
  query,
  collection,
  where,
  deleteDoc,
} from 'firebase/firestore';
import { db, colletionPlayers, colletionGoals } from '../database/firebase';
import { GameState } from '../reducers/GameRecorderReducer';
import { IMatch, IPlayer, ITeam, IGoal, Goal, Player } from '../types';

export const updateGame = async (id: string, gameData: GameState) => {
  console.log('updating game .... ', gameData, id);
  try{
    const docRef = doc(db, 'games', id);
    await setDoc(docRef, gameData);
    return docRef.id;
  }catch(error){
    console.log('updateGame error ', error);
    return error;
  }
};

export const deleteGame = async (id:string) => {
  try{
    const gameRef = doc(db, 'games', id);
    const docSnap = await getDoc(gameRef);
    const { goals } = docSnap.data() as IMatch;
    const batch = writeBatch(db);
    console.log('goals ', goals);

    goals.forEach( (id:string) => {
      const goalRef = doc(db, 'goals', id);
      console.log('deleting ', goalRef);
      batch.delete(goalRef);
    });

    batch.delete(gameRef);

    await batch.commit();

    console.log('game and goals deleted....');
  }catch(error){
    console.log('error deleteing game and goals.... ', error);
  }
}

export const deleteGameBADGAMES = async (id:string) => {
  try{
    const q = query(collection(db, 'games'), where('date', '==', '2024-03-07'));
    const querySnapshot = await getDocs(q);
    const batch = writeBatch(db);
    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
     await batch.commit();
  }catch(error){
    console.log('error deleteing game and goals.... ', error);
  }
}

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

export const incrementGoalsScored = async (playerData: Player, count:number) => {
  try {
    const playerDocRef = doc(db, 'players', playerData.id);
    await updateDoc(playerDocRef, { goals: increment(count) });
  } catch (error) {
    console.log('error adding goal');
  }
};

export const deletePlayer = async (id:string) => {
  console.log('deleting player...');
  try{
    const playerRef = doc(db, 'players', id);
    // const docSnap = await getDoc(playerRef);
    await deleteDoc(playerRef);
    return true;
  }catch(error){
    return false;
  }
}

export const addGoalScored = async (goal:IGoal) => {
  console.log('Adding New Goal... ', goal)

  try {
    const docRef = doc(colletionGoals);
    await setDoc(docRef, goal);
    return docRef.id;
  } catch (error) {
    console.error(error);
    return error;
  }
}