import React, { Component } from 'react';
import styles from './styles.scss';

class Product extends Component {
  render() {
    const { title, imageUrl, price } = this.props.productData;
    return (
      <div className={styles.product}>
        <img src={imageUrl} alt={title} />
        <span>{title}</span>
        <span>R$ {price}</span>
      </div>
    );
  }
}

export default Product;
