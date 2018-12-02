import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import './App.css';
import token from './maxToken';
const { web3 } = window;

const FormItem = Form.Item;
const unitMaxTokenPerEth = 10;

class App extends Component {
  state = {
    isLoading: false,
    amount: '',
    totalEther: 0
  };

  onAmountChange = event => {
    const amount = event.target.value;
    const totalEther = amount / unitMaxTokenPerEth;
    this.setState({ amount, totalEther });
  };

  onSubmitForm = event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const contract = web3.eth.contract(token.abi);
    const maxToken = contract.at(token.address);
    var address = web3.eth.accounts[0];
    maxToken.buy(
      {
        form: address,
        value: web3.toWei(this.state.totalEther, 'ether')
      },
      err => {
        this.setState({ isLoading: false });
        if (!err) {
          this.setState({ amount: 0, totalEther: 0 });
        }
      }
    );
  };

  render() {
    return (
      <div className="App">
        <h2>
          Exchange (1 ETH == {unitMaxTokenPerEth} {token.symbol})
        </h2>
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
              addonAfter="ETH"
              disabled="true"
              value={this.state.totalEther}
            />
          </FormItem>
          <FormItem>
            <Button
              loading={this.state.isLoading}
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
