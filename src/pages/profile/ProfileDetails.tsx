import React from 'react';
import { Smile as SmileIcon } from 'react-feather';
import { Form, Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';

import blockStackIcon from '../../images/blockstack-icon.svg';

import {
  getUserData,
  getProfileData,
  getGendersList,
} from '../../store/user/selectors';
import { updateProfile } from '../../store/user/actions';

import Avatar from './Avatar/Avatar';
import LabeledText from '../../components/shared/LabeledText/LabeledText';
import WhiteBlock from '../../components/shared/WhiteBlock';
import FormGroup from '../../components/forms/FormGroup/FormGroup';
import DropDown from '../../components/forms/DropDown/DropDown';
import PageContent from '../../components/layout/PageContent/PageContent';
import UserNameInput from './UserNameInput';
import CopyText from '../../components/shared/CopyText/CopyText';

const ProfileDetails: React.FC = () => {
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();
  const { gender, username } = useSelector(getProfileData);
  const genders = useSelector(getGendersList);

  if (!userData) {
    return null;
  }

  const {
    username: blockStackUsername,
    identityAddress,
    profile: { name },
  } = userData;

  return (
    <PageContent
      headerText="Profile"
      footerText="Use emoji by default or upload an avatar."
      FooterIcon={SmileIcon}
    >
      <Avatar />
      <LabeledText label="Blockstack ID" iconUrl={blockStackIcon}>
        {blockStackUsername}
        <br />
        ID-{identityAddress}
      </LabeledText>
      <LabeledText label="Blockstack name">
        <CopyText value={name}>{name}</CopyText>
      </LabeledText>
      <WhiteBlock>
        <Formik
          initialValues={{
            username: username || '',
            gender: genders.filter((g) => g.id === gender),
          }}
          onSubmit={() => {}}
          enableReinitialize
        >
          {() => (
            <Form>
              <FormGroup label="Cerebro username">
                <UserNameInput />
              </FormGroup>
              <FormGroup label="Gender (for emoji)">
                <DropDown
                  name="gender"
                  options={genders}
                  onChange={({ id }) =>
                    dispatch(
                      updateProfile({
                        update: {
                          gender: id,
                        },
                      })
                    )
                  }
                />
              </FormGroup>
            </Form>
          )}
        </Formik>
      </WhiteBlock>
    </PageContent>
  );
};

export default ProfileDetails;