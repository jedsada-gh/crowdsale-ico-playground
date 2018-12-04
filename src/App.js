import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import './App.css';
import token from './maxToken';
import moment from 'moment';
import Countdown from './Countdown.js';
const { web3 } = window;

const FormItem = Form.Item;
const unitMaxTokenPerEth = 10;
const contract = web3.eth.contract(token.abi);
const maxToken = contract.at(token.address);

class App extends Component {
  state = {
    myAddress: '',
    clickAble: false,
    isLoading: false,
    amount: '',
    totalEther: 0,
    startDateSale: this.formatDateCounter(Date.now())
  };

  formatDateCounter(mills) {
    return moment(mills).format('DD/MM/YYYY HH:mm:ss');
  }

  componentDidMount() {
    web3.eth.getAccounts((err, response) => {
      if (!err) {
        this.setState({ myAddress: response[0] });
      }
    });
    maxToken.startSale((err, response) => {
      if (!err) {
        console.log('date: ', moment(response.c[0] * 1000).format());
        this.setState({ startDateSale: moment(response.c[0] * 1000).format() });
      }
    });
    maxToken.deadline((err, response) => {
      console.log('error: ', err);
      console.log('response: ', response.c[0]);
    });
  }

  onAmountChange = event => {
    const amount = event.target.value;
    const totalEther = amount / unitMaxTokenPerEth;
    this.setState({ amount, totalEther, clickAble: amount > 0 });
  };

  onSubmitForm = event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    maxToken.buy(
      {
        form: this.state.myAddress,
        value: web3.toWei(this.state.totalEther, 'ether')
      },
      err => {
        this.setState({ isLoading: false });
        if (!err) {
          message.success('Transaction successfully', 2);
          this.setState({ amount: '', totalEther: 0, clickAble: false });
        } else {
          message.error('Transaction failed', 2);
        }
      }
    );
  };

  render() {
    return (
      <div className="App">
        <Countdown date={this.state.startDateSale} />
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
              disabled={!this.state.clickAble}
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
