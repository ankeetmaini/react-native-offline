import * as actionTypes from './actionTypes';
import { FluxAction, FluxActionWithPreviousIntent, FluxActionForRemoval, FluxActionForDismissal } from '../types';


type EnqueuedAction = FluxAction | Function;

export const connectionChange = (isConnected: boolean): FluxAction => ({
  type: actionTypes.CONNECTION_CHANGE,
  payload: isConnected,
});

export const fetchOfflineMode = (
  action: EnqueuedAction,
): FluxActionWithPreviousIntent => {
  const { meta = {}, ...actionRest } = action;
  if (typeof action === 'object') {
    return {
      type: actionTypes.FETCH_OFFLINE_MODE,
      payload: {
        prevAction: {
          ...actionRest,
        },
      },
      meta,
    };
  }
  // Thunk
  return {
    type: actionTypes.FETCH_OFFLINE_MODE,
    payload: {
      prevThunk: action,
    },
    meta,
  };
};

export const removeActionFromQueue = (
  action: EnqueuedAction,
): FluxActionForRemoval => ({
  type: actionTypes.REMOVE_FROM_ACTION_QUEUE,
  payload: action,
});

export const dismissActionsFromQueue = (
  actionTrigger: string,
): FluxActionForDismissal => ({
  type: actionTypes.DISMISS_ACTIONS_FROM_QUEUE,
  payload: actionTrigger,
});
