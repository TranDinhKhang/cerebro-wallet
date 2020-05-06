import React from 'react';
import { useSelector } from 'react-redux';
import { Shield as ShieldIcon } from 'react-feather';
import { Formik, Form } from 'formik';

import { getCoinsList } from '../../../store/user/selectors';

import PageContent from '../../../components/layout/PageContent/PageContent';
import CoinDropDown from '../../../components/forms/DropDown/CoinDropDown';
import FormGroup from '../../../components/forms/FormGroup/FormGroup';
import Input from '../../../components/forms/Input/Input';
import Button from '../../../components/forms/Button/Button';
import WhiteBlock from '../../../components/shared/WhiteBlock';

const ImportPrivateKey: React.FC = () => {
  const coins = useSelector(getCoinsList);

  return (
    <PageContent
      headerText="Import Private Key"
      footerText="All your keys securely stored via Decentralized Storage Gaia by Blockstack. Keys cannot be used to store or transfer your funds by anyone except you. Available features: check balance, charts, transactions history, send, receive and in-app exchange service."
      FooterIcon={ShieldIcon}
    >
      <Formik
        initialValues={{ account: coins[0], key: '', accountName: '' }}
        onSubmit={() => {}}
      >
        {() => (
          <Form>
            <WhiteBlock>
              <FormGroup label="Choose a coin">
                <CoinDropDown name="account" options={coins} />
              </FormGroup>
              <FormGroup label="Private Key, Mnemonic, WIF or XPRV">
                <Input
                  name="key"
                  type="textarea"
                  required
                  rows={3}
                  placeholder="Write here your mnemonic, private key, WIF, or anything you've got. Cerebro will do its best to guess the correct format and import your wallet"
                />
              </FormGroup>
              <FormGroup label="Account name">
                <Input name="accountName" placeholder="My Bitcoin (optional)" />
              </FormGroup>
              <Button type="submit">Import</Button>
            </WhiteBlock>
          </Form>
        )}
      </Formik>
    </PageContent>
  );
};

export default ImportPrivateKey;