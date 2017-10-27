import React, { Component } from 'react';
import styles from './styles.scss';

class Product extends Component {
  render() {
    const { title, imageUrl, price } = this.props.productData;
    return (
      <div className={styles.product}>
        <div className={styles.imageContainer}>
          <img className={styles.productImage} src={imageUrl} alt={title} />
        </div>
        <div className={styles.textContainer}>
          <span className={styles.title}>{title}</span>
          <span className={styles.price}>R$ {price}</span>
        </div>
      </div>
    );
  }
}

export default Product;
