import React from 'react';
import BannerImage from 'images/slider/photo-friends-making-barbecue.jpg';
import styles from './styles.scss';

const Slider = () => (
  <div className={styles.slider}>
    <img className={styles.banner} src={BannerImage} alt="banner" />
  </div>
);

export default Slider;
