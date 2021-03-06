import React from 'react';
import {
  Info as InfoIcon,
  Plus as PlusIcon,
  Navigation as NavigationIcon,
  Repeat as RepeatIcon,
  List as ListIcon,
  Edit3 as EditIcon,
  Link as LinkIcon,
  Key as KeyIcon,
  Trash as TrashIcon,
} from 'react-feather';
import { RouteComponentProps, withRouter } from 'react-router';
import { useSelector } from 'react-redux';

import { Breakpoints } from '../../../dictionaries';
import { useWindowSize } from '../../../utils/hooks';
import { ActionButton } from './styled';
import { config } from '../../../config';
import { Account } from '../../../store/account/types';
import { getAccountTxs } from '../../../store/account/selectors';

interface Props extends RouteComponentProps {
  account: Account;
}

const AccountActions: React.FC<Props> = ({ match, account }) => {
  const windowSize = useWindowSize();
  const accountTxs = useSelector(getAccountTxs(account.id));

  if (windowSize.width < Breakpoints.md && !match.isExact) {
    return null;
  }

  return (
    <nav>
      <ActionButton
        link={`${match.url}/details`}
        icon={<InfoIcon />}
        text="Details"
        descText="About account"
      />
      {account.keyType !== null && (
        <>
          <ActionButton
            link={`${match.url}/receive`}
            icon={<PlusIcon />}
            text="Receive"
            descText="Top up my account"
          />
          <ActionButton
            link={`${match.url}/send`}
            icon={<NavigationIcon />}
            text="Send"
            descText="Transfer to others"
          />
          <ActionButton
            link={`${match.url}/exchange`}
            icon={<RepeatIcon />}
            text="Exchange"
            descText="Trade your funds instantly"
          />
        </>
      )}
      <ActionButton
        link={`/activity/${account.id}/${accountTxs?.allIds[0] || ''}`}
        icon={<ListIcon />}
        text="Transactions"
        descText="Your funds flow"
      />
      <ActionButton
        link={`${match.url}/rename`}
        icon={<EditIcon />}
        text="Rename"
        descText="Unique account name"
      />
      <ActionButton
        link={`${config.coins[account.coin].explorerUrl}/address/${
          account.address
        }`}
        icon={<LinkIcon />}
        text="Blockexplorer"
        descText="Show public information"
      />
      {account.keyType !== null && (
        <ActionButton
          link={`${match.url}/export-private-key`}
          icon={<KeyIcon />}
          text="Private Key"
          descText="Not for prying eyes"
        />
      )}
      <ActionButton
        link={`${match.url}/delete`}
        icon={<TrashIcon />}
        text="Delete"
        descText="Be careful"
      />
    </nav>
  );
};

export default withRouter(AccountActions);
