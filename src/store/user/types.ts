import { UserData } from 'blockstack/lib/auth/authApp';

import { Currencies, Genders, Statuses } from '../../enums';

export enum UserActionTypes {
  LOG_IN = '@@user/log_in',
  LOG_OUT = '@@user/log_out',
  SET_USER_DATA = '@@user/set_user_data',
  GET_SETTINGS = '@@user/get_settings',
  SET_SETTINGS = '@@user/set_settings',
  GET_PROFILE_DATA = '@@user/get_profile_data',
  SET_PROFILE_DATA = '@@user/set_profile_data',
  UPDATE_PROFILE = '@@user/update_profile',
  UPDATE_SETTINGS = '@@user/update_settings',
  SUBSCRIBE_ON_NEWS = '@@user/subscribe_on_news',
  SET_SUBSCRIBE_ON_NEWS_STATUS = '@@user/subscribe_on_news_status',
}

export interface Profile {
  username?: string;
  gender: Genders;
}

export interface Settings {
  currency?: Currencies;
  timeout?: number;
  email?: string;
  emailSubscribeStatus?: Statuses;
}

export interface UserState {
  userData?: UserData;
  profile: Profile;
  settings: Settings;
}

export interface UpdateDataActionPayload {
  update: { [name: string]: string | number };
  withoutNotifications?: boolean;
}