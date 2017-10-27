import React, { Component } from 'react';
import styles from './styles.scss';

class Product extends Component {
  state = {
    qtd: 0
  }

  increaseQtd = () => {
    const { price } = this.props.productData;
    this.setState({ qtd: this.state.qtd + 1 });
    this.props.increasePrice(price);
  }

  decreaseQtd = () => {
    const { price } = this.props.productData;
    this.setState({ qtd: this.state.qtd - 1 });
    this.props.decreasePrice(price);
  }

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
        <div className={styles.addItems}>
          <button onClick={this.increaseQtd}>+</button>
          <span>{this.state.qtd}</span>
          <button onClick={this.decreaseQtd}>-</button>
        </div>
      </div>
    );
  }
}

export default Product;
