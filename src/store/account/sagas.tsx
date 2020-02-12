import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { produce } from 'immer';

import { AccountActionTypes, Accounts } from './types';
import { getFile, putFile } from '../../utils/blockstack';
import { callApi } from '../../utils/api';
import {
  createAccount as createAccountAction,
  updateAccount as updateAccountAction,
} from './actions';
import { config } from '../../config';
import { createWallet } from '../../utils/wallets';
import { setAccounts, setExchangeRates } from './actions';
import { getAccounts as getAccountsSelector } from './selectors';
import { getCoinsList, getCurrenciesList } from '../user/selectors';
import { Value } from '../../components/forms/DropDown/DropDown';
import { showNotification } from '../layout/actions';
import { NotificationTypes } from '../../dictionaries';

function* getAccounts() {
  try {
    let accounts: Accounts = yield call(getFile, config.gaia.files.accounts);

    if (!accounts) {
      accounts = {
        byIds: {},
        allIds: [],
      };

      yield call(putFile, {
        fileName: config.gaia.files.accounts,
        file: accounts,
      });
    }

    yield put(setAccounts(accounts));
  } catch (e) {
    yield put(
      showNotification({
        type: NotificationTypes.Error,
        text: 'Error while getting accounts',
      })
    );

    console.error(e);
  }
}

function* createAccount({ payload }: ReturnType<typeof createAccountAction>) {
  try {
    yield put(
      showNotification({
        type: NotificationTypes.Default,
        text: 'Creating account...',
      })
    );

    const account = yield call(createWallet, payload);

    const existingAccounts: Accounts = yield select(getAccountsSelector);
    const accounts = {
      byIds: {
        ...existingAccounts.byIds,
        [account.id]: account,
      },
      allIds: [...existingAccounts.allIds, account.id],
    };

    yield call(putFile, {
      fileName: config.gaia.files.accounts,
      file: accounts,
    });

    yield put(setAccounts(accounts));

    yield put(
      showNotification({
        type: NotificationTypes.Success,
        text: 'Account was successfully created',
      })
    );
  } catch (e) {
    yield put(
      showNotification({
        type: NotificationTypes.Error,
        text: 'Error while creating account',
      })
    );

    // TODO log error
    console.error(e);
  }
}

function* updateAccount({
  payload: { accountId, update },
}: ReturnType<typeof updateAccountAction>) {
  try {
    yield put(
      showNotification({
        type: NotificationTypes.Default,
        text: 'Saving changes...',
      })
    );

    const existingAccounts: Accounts = yield select(getAccountsSelector);
    const accounts: Accounts = produce(existingAccounts, (draft: Accounts) => {
      draft.byIds[accountId] = {
        ...draft.byIds[accountId],
        ...update,
      };
    });

    yield call(putFile, {
      fileName: config.gaia.files.accounts,
      file: accounts,
    });

    yield put(setAccounts(accounts));

    yield put(
      showNotification({
        type: NotificationTypes.Success,
        text: 'Account was successfully updated',
      })
    );
  } catch (e) {
    yield put(
      showNotification({
        type: NotificationTypes.Error,
        text: 'Error while updating account',
      })
    );

    // TODO log error
    console.error(e);
  }
}

function* getExchangeRates() {
  try {
    const coins = yield select(getCoinsList);
    const currencies = yield select(getCurrenciesList);

    const rates = yield call(callApi, {
      method: 'get',
      url: `${config.coursesApiUrl}`,
      queryParams: {
        fsyms: coins.map((coin: Value) => coin.id).join(','),
        tsyms: currencies.map((currency: Value) => currency.id),
      },
    });

    yield put(setExchangeRates(rates));
  } catch (e) {
    yield put(
      showNotification({
        type: NotificationTypes.Error,
        text: 'Error while getting exchange rates',
      })
    );

    // TODO log error
    console.error(e);
  }
}

function* accountSaga() {
  yield all([
    takeLatest(AccountActionTypes.GET_ACCOUNTS, getAccounts),
    takeLatest(AccountActionTypes.CREATE_ACCOUNT, createAccount),
    takeLatest(AccountActionTypes.GET_EXCHANGE_RATES, getExchangeRates),
    takeLatest(AccountActionTypes.UPDATE_ACCOUNT, updateAccount),
  ]);
}

export default accountSaga;
