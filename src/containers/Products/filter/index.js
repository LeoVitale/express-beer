import React, { PureComponent } from 'react';
import styles from './styles.scss';

class Filter extends PureComponent {
  renderOptions = () => {
    const { categories } = this.props;
    if (categories) {
      return categories.map(category => (
        <option key={`categ_${category.id}`} value={category.id}>
          {category.title}
        </option>
      ));
    }
  }

  render() {
    return (
      <div className={styles.filter}>
        <div className={styles.selectStyle}>
          <select
            onChange={select =>
              this.props.filterByCategory(select.target.value)}
          >
            <option value="0">Selecionar Todos</option>
            {this.renderOptions()}
          </select>
        </div>
      </div>
    );
  }
}

export default Filter;
