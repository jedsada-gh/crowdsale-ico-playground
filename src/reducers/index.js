export default (
  state = {
    text: 'test',
    number: 0
  },
  action
) => {
  switch (action.type) {
    case '20scoops':
      state.text = action.value;
      return {
        text: state.text,
        number: state.number
      };
    case 'INCREMENT':
      state.number += 1;
      return {
        text: state.text,
        number: state.number
      };
    case 'DECREMENT':
      state.number -= 1;
      return {
        text: state.text,
        number: state.number
      };
    default:
      return state;
  }
};
