export default (state = 'Express Beer', action = {}) => {
  switch (action.type) {
    case 'HOME':
      return 'Express Beer - Home';
    case 'Products':
      return 'Express Beer - Produtos';
    default:
      return state;
  }
};

const capitalize = str =>
  str.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
