import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from '@material-ui/core';
import { signInWithGoogleActionCreator } from '../../redux';

export const SignButtons = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleSignIn = () => {
    dispatch(signInWithGoogleActionCreator());
  };

  return <Button onClick={handleSignIn}>{t('auth:signButton.label')}</Button>;
};
