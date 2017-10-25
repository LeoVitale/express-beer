import React from 'react';
import Switcher from '../Switcher';
import styles from './styles.scss';
import Hedader from 'components/layout/header';

export default () => (
  <div className={styles.app}>
    <Hedader />
    <Switcher />
  </div>
);
