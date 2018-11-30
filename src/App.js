import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import './App.css';
const FormItem = Form.Item;

class App extends Component {
  state = {
    isLoading: false,
    amount: '',
    totalEther: 0
  };

  onAmountChange = event => {
    const amount = event.target.value;
    const totalEther = amount / 5;
    this.setState({ amount, totalEther });
  };

  onSubmitForm = event => {
    event.preventDefault();
    console.log('submit');
  };

  render() {
    return (
      <div className="App">
        <h2>Exchange (1 eth == 5 mc)</h2>
        <Form
          style={{ width: '30%', height: 'auto' }}
          onSubmit={this.onSubmitForm}
        >
          <FormItem>
            <Input
              prefix={
                <Icon type="dollar" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              type="number"
              placeholder="Amount"
              value={this.state.amount}
              onChange={this.onAmountChange}
            />
          </FormItem>
          <FormItem>
            <Input
              addonAfter="eth"
              disabled="true"
              value={this.state.totalEther}
            />
          </FormItem>
          <FormItem>
            <Button
              icon="buy"
              style={{ width: '50%' }}
              type="primary"
              htmlType="submit"
            >
              Buy
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default App;
