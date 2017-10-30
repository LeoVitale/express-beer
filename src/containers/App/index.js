import React from 'react';
import Switcher from '../Switcher';
import styles from './styles.scss';
import Hedader from 'components/layout/header';
import Footer from 'components/layout/footer';

export default () => (
  <div className={styles.app}>
    <Hedader />
    <div className={styles.app}>
      <Switcher />
    </div>
  </div>
);
