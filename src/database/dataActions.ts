import {
  setDoc,
  getDoc,
  doc,
  updateDoc,
  increment,
  runTransaction,
  DocumentReference
} from 'firebase/firestore';
import { db, colletionPlayers } from '../database/firebase';
import { GameState } from '../reducers/GameRecorderReducer';
import { IGame, IPlayer, ITeam, IGoal} from '../types';

export const updateGame = async (id: string, gameData: GameState) => {
  console.log('updating game ....');
  try{
    const docRef = doc(db, 'games', id);
    await setDoc(docRef, gameData);
    console.log(gameData?.home?.name, ' updating team with game ....');
    await updateTeamStats(id, gameData.home as ITeam);
    console.log(gameData?.away?.name, ' updating team with game ....');
    await updateTeamStats(id, gameData.away as ITeam);
    return docRef.id;
  }catch(error){
    console.log('updateGame error ', error);
    return error;
  }
};

export const deleteGame = async (id:string) => {
  const gameRef = doc(db, 'games', id);
  const docSnap = await getDoc(gameRef);
  console.log(docSnap.data());
  const { home, away, date, homeGoals, awayGoals } = docSnap.data() as IGame;
  const message = `Are you sure you want to delete the following match: ${home.name} vs. ${away.name} from ${date}?`;
  if(window.confirm(message)){

    try {
      const homeTeamRef = doc(db, 'teams', home.id);
      const awayTeamRef = doc(db, 'teams', away.id);

      interface playerStat {
        ref: DocumentReference;
        count: number;
      }

      await runTransaction(db, async (transaction) => {
        console.log('running transaction')
        const homeTeamDoc = await transaction.get(homeTeamRef);
        const awayTeamDoc = await transaction.get(awayTeamRef);
        const homeMatches = homeTeamDoc?.data()?.matches || [];
        const awayMatches = awayTeamDoc?.data()?.matches || [];
        const newHomeMatches = homeMatches.filter((g: IGame) => g?.id !== id);
        const newAwayMatches = awayMatches.filter((g: IGame) => g?.id !== id);

        // collect all goals to be removed from player counts
        const goalsToRemove: IGoal[] = [...homeGoals, ...awayGoals].filter(
          (g: IGoal) => !g.ownGoal
        );

        // Determine how many goals to remove from each player
        // store in an object with player id as the key, and increment count value
        const goalsHash: Record<string, playerStat> = goalsToRemove.reduce((result:Record<string, playerStat>, g: IGoal) => {
            const { player } = g;
            try {
              const playerRef = doc(db, 'players', player?.id);
              if (result[player?.id]) {
                result[player?.id].count++;
              } else {
                result[player?.id] = { ref: playerRef, count: 1 };
              }
            } catch (error) {
              console.log('player ref error: ', error);
            }
            return result;
          },
          {}
        );

        // Now that we have the counts to remove,
        // get the goals scored by each player, and remove the count in the goal hash
        // ensure player cannot have negative goals
        const playerUpdates: playerStat[] = await  Promise.all(Object.keys(goalsHash).map(
          async (key: string) => {
            console.log({ key });
            const { ref, count } = goalsHash[key] as playerStat;
            const playerDoc = await transaction.get(ref);
            const player: IPlayer = playerDoc?.data() as IPlayer;
            let newGoalCount = player?.goals - count;
            console.log('was ', player?.goals, ' is now ', newGoalCount);
            goalsHash[key].count = Math.max(newGoalCount, 0);
            return { ref, count: newGoalCount };
          }
        ));

        playerUpdates.forEach((item: playerStat) => {
          const { ref, count } = item;
          transaction.update(ref, { goals: count });
          console.log(ref.id, ' updating to count ', count)
        });

        // run the update and deletes after all reads are complete
        if( homeTeamDoc.exists() ) transaction.update(homeTeamRef, { matches: newHomeMatches });
        if (awayTeamDoc.exists()) transaction.update(awayTeamRef, { matches: newAwayMatches });

        transaction.delete(gameRef);

      });
      console.log('Transaction successfully committed!');
    } catch (e) {
      console.log('Transaction failed: ', e);
    }

    console.log('deleting game....');
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
  const matchesArr = teamSnap.data()?.matches || [];
  const matches = matchesArr.filter((g: IGame) => g?.id !== gameId);
  const gameRef = doc(db, 'games', gameId);
  const docSnap = await getDoc(gameRef);

  await updateDoc(teamRef, {
    matches: [...matches, { id:gameId, ...docSnap.data()}],
  });

  return;
};