import { action } from 'typesafe-actions';
import { UserData } from 'blockstack/lib/auth/authApp';

import {
  UserActionTypes,
  Settings,
  Profile,
  UpdateDataActionPayload,
} from './types';
import { ActivityFilterTypes, Statuses } from '../../dictionaries';

export const setUserData = (userData: UserData) =>
  action(UserActionTypes.SET_USER_DATA, userData);
export const getSettings = () => action(UserActionTypes.GET_SETTINGS);
export const setSettings = (settings: Settings) =>
  action(UserActionTypes.SET_SETTINGS, settings);
export const getProfileData = () => action(UserActionTypes.GET_PROFILE_DATA);
export const setProfileData = (data: Profile) =>
  action(UserActionTypes.SET_PROFILE_DATA, data);
export const updateProfile = (payload: UpdateDataActionPayload) =>
  action(UserActionTypes.UPDATE_PROFILE, payload);
export const updateSettings = (payload: UpdateDataActionPayload) =>
  action(UserActionTypes.UPDATE_SETTINGS, payload);
export const subscribeOnNews = (email: string) =>
  action(UserActionTypes.SUBSCRIBE_ON_NEWS, email);
export const setSubscribeOnNewsStatus = (payload: {
  status?: Statuses;
  email?: string;
}) => action(UserActionTypes.SET_SUBSCRIBE_ON_NEWS_STATUS, payload);
export const setActivityFilterType = (update: {
  type: ActivityFilterTypes;
  value?: string;
}) => action(UserActionTypes.SET_ACTIVITY_FILTER_TYPE, update);
