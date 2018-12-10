import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.incrementAsync = this.incrementAsync.bind(this);
    this.incrementIfOdd = this.incrementIfOdd.bind(this);
  }

  incrementIfOdd() {
    if (this.props.values.number % 2 !== 0) {
      this.props.onIncrement();
    }
  }

  incrementAsync() {
    setTimeout(this.props.onIncrement, 1000);
  }

  render() {
    const { values, onIncrement, onDecrement, on20scoops } = this.props;
    console.log('values: ', values);
    return (
      <p>
        Clicked: {values.number} times <button onClick={onIncrement}>+</button>{' '}
        <button onClick={onDecrement}>-</button>{' '}
        <button onClick={this.incrementIfOdd}>Increment if odd</button>{' '}
        <button onClick={this.incrementAsync}>Increment async</button>
        <button
          onClick={() => {
            on20scoops('20scoops');
          }}
        >
          20scoops
        </button>
      </p>
    );
  }
}

Counter.propTypes = {
  values: PropTypes.object.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  on20scoops: PropTypes.func.isRequired
};

export default Counter;
