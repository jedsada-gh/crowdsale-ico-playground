pragma solidity ^0.4.4;

interface TokenRecipient { 
    function receiveApproval(address _from, uint256 _value, address _token, bytes calldata) external; 
}

contract TokenERC20 {

    mapping (address => uint256) balances;
    mapping (address => mapping (address => uint256)) allowed;
    uint256 public totalSupply;
    
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    function _transfer(address _from, address _to, uint _value) internal {
        require(_to != address(0x0));
        require(balances[_from] >= _value);
        require(balances[_to] + _value > balances[_to]);

        uint previousBalances = balances[_from] + balances[_to];
        balances[_from] -= _value;
        balances[_to] += _value;
        emit Transfer(_from, _to, _value);
        assert(balances[_from] + balances[_to] == previousBalances);
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        _transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        if (balances[_from] >= _value && allowed[_from][msg.sender] >= _value && _value > 0) {
            balances[_to] += _value;
            balances[_from] -= _value;
            allowed[_from][msg.sender] -= _value;
            emit Transfer(_from, _to, _value);
            return true;
        } else { return false; }
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender) public constant returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }
    
    function approveAndCall(address _spender, uint256 _value, bytes memory _extraData) public
    returns (bool success) {
        TokenRecipient spender = TokenRecipient(_spender);
        if (approve(_spender, _value)) {
            spender.receiveApproval(msg.sender, _value, address(this), _extraData);
            return true;
        }
    }
}

contract MaxTokenV1 is TokenERC20 {

    string public name;
    uint8 public decimals;
    string public symbol;
    uint256 public unitsOneEthCanBuy;
    uint256 public totalEthInWei;
    address public fundsWallet;

    constructor() public {
        balances[msg.sender] = 1000000000000000000000;
        totalSupply = 1000000000000000000000;               // Update total supply (1000 for example) (CHANGE THIS)
        name = "MaxToken";                                  // Set the name for display purposes (CHANGE THIS)
        decimals = 18;                                      // Amount of decimals for display purposes (CHANGE THIS)
        symbol = "MTC";                                     // Set the symbol for display purposes (CHANGE THIS)
        unitsOneEthCanBuy = 10;                             // Set the price of your token for the ICO (CHANGE THIS)
        fundsWallet = msg.sender;                           // The owner of the contract gets ETH
    }
    
    function buy() public payable {
        totalEthInWei = totalEthInWei + msg.value;
        uint256 amount = msg.value * unitsOneEthCanBuy;
        require(balances[fundsWallet] >= amount);

        balances[fundsWallet] = balances[fundsWallet] - amount;
        balances[msg.sender] = balances[msg.sender] + amount;
    
        fundsWallet.transfer(msg.value);
        emit Transfer(fundsWallet, msg.sender, amount);
    }
}