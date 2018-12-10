import { connect } from 'react-redux';
import Counter from '../components/Counter';

const mapStateToProps = state => {
  return { values: state };
};

const add20scoops = text => {
  return {
    type: '20scoops',
    value: text
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIncrement: () =>
      dispatch({
        type: 'INCREMENT'
      }),
    onDecrement: () =>
      dispatch({
        type: 'DECREMENT'
      }),
    on20scoops: value => {
      dispatch(add20scoops(value));
    }
  };
};

const CounterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
export default CounterLink;
