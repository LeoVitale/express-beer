import React from 'react';

import styles from './styles.scss';
import LogoImage from 'images/beer-logo.svg';

const Header = () => (
  <div className={styles.header}>
    <img className={styles.logo} src={LogoImage} alt="logo" />
  </div>
);

export default Header;
