import { IPlayer } from "../types"

export type AddGoalState = {
  addingGoal: boolean;
  addingNewPlayer: boolean;
  time: string;
  goalScorer: IPlayer | null;
  teamMates: IPlayer[];
  ownGoal: boolean;
  playerSelectValue: string;
  penaltyKick: boolean;
};

export const initialState: AddGoalState = {
  addingGoal: false,
  addingNewPlayer: false,
  time: '',
  goalScorer: null,
  teamMates: [],
  ownGoal: false,
  playerSelectValue: '-1',
  penaltyKick: false,
};

export interface IAction {
  type:string;
  payload?:any
}

export enum AddGoalActions {
  addGoal = 'addGoal',
  addNewPlayer = 'addNewPlayer',
  addNewGoalScorer = 'addNewGoalScorer',
  addGoalScorer = 'addGoalScorer',
  selectPlayer = 'selectPlayer',
  setTime = 'setTime',
  ownGoal = 'ownGoal',
  penaltyKick = 'penaltyKick',
  reset = 'reset',
}

export function AddGoalReducer(state:AddGoalState = initialState, action:IAction) {
  const { type, payload } = action;

  switch (type) {
    case AddGoalActions.addGoal:
      return { ...state, addingGoal: true };

    case AddGoalActions.penaltyKick:
      return { ...state, penaltyKick: payload };

    case AddGoalActions.setTime:
      return { ...state, time: payload };

    case AddGoalActions.ownGoal:
      return {
        ...state,
        ownGoal: payload,
        goalScorer: payload ? null : state.goalScorer,
      };

    case AddGoalActions.addNewPlayer:
      return { ...state, addingNewPlayer: payload, playerSelectValue: '-1' };

    case AddGoalActions.addNewGoalScorer:
      const { teamMates } = state;
      return {
        ...state,
        teamMates: [...teamMates, payload.goalScorer],
        addingNewPlayer: false,
        goalScorer: payload.goalScorer,
        playerSelectValue: payload.playerSelectValue,
      };

    case AddGoalActions.selectPlayer:
      return { ...state, playerSelectValue: payload };

    case AddGoalActions.addGoalScorer:
      return {
        ...state,
        addingNewPlayer: false,
        goalScorer: payload.goalScorer,
        playerSelectValue: payload.playerSelectValue,
      };

    case AddGoalActions.reset:
      return { ...initialState, teamMates: state.teamMates };

    default:
      return state;
  }
}
