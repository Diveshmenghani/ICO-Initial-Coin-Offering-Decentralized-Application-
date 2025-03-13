// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function symbol() external pure returns (string memory);
    function balanceOf(address account) external view returns (uint256);
    function name() external pure returns (string memory);
    function transfer(address to, uint256 value) external returns (bool);
}

contract ICOMarketplace {
    struct TokenDetails {
        address token;
        bool supported;
        uint price;
        address creator;
        string name;
        string symbol;
    }
    
    mapping(address => TokenDetails) public tokenDetails;
    address[] public allSupportedToken;
    address public owner;

    event TokenReceived(address indexed token, address indexed from, uint amount);
    event TokenTransferred(address indexed token, address indexed to, uint amount);
    event TokenWithdrawn(address indexed token, address indexed from, uint amount);
    event TokenAdded(address indexed token, uint price, address indexed creator, string name, string symbol);

    modifier supportedToken(address _token) {
        require(tokenDetails[_token].supported, "Token not supported");
        _;
    }

    modifier OnlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    modifier OnlyCreator(address _token) {
        require(msg.sender == tokenDetails[_token].creator, "Caller is not the token creator");
        _;
    }

    receive() external payable {
        revert("Contract does not receive Ether directly");
    }

    constructor() {
        owner = msg.sender;
    }

    function createICO(address _token, uint _price) external {
        IERC20 token = IERC20(_token);
        string memory tokenName = token.name();
        string memory tokenSymbol = token.symbol();

        tokenDetails[_token] = TokenDetails({
            token: _token,
            supported: true,
            price: _price,
            creator: msg.sender,
            name: tokenName,
            symbol: tokenSymbol
        });
        allSupportedToken.push(_token);
        emit TokenAdded(_token, _price, msg.sender, tokenName, tokenSymbol);
    }

    function multiply(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x, "Math error");
    }

    function buyToken(address _token, uint _amount) external payable supportedToken(_token) {
        require(_amount > 0, "Amount must be greater than zero");
        TokenDetails memory details = tokenDetails[_token];
        uint totalCost = multiply(details.price, _amount);
        require(msg.value == totalCost, "Ether sent is less than required");
        (bool sent, ) = details.creator.call{value: msg.value}("");
        require(sent, "Failed to transfer Ether to token creator");
        IERC20 token = IERC20(_token);
        require(token.transfer(msg.sender, _amount * 10**18), "Transfer failed");
        emit TokenTransferred(_token, msg.sender, _amount);
    }

    function getBalance(address _token) external view returns (uint) {
        require(tokenDetails[_token].supported, "Token not supported");
        IERC20 token = IERC20(_token);
        return token.balanceOf(address(this));
    }

    function getSupportedToken() external view returns (address[] memory) {
        return allSupportedToken;
    }

    function withdraw(address _token, uint _amount) external OnlyCreator(_token) supportedToken(_token) {
        require(_amount > 0, "Amount must be greater than 0");
        IERC20 token = IERC20(_token);
        uint balance = token.balanceOf(address(this));
        require(balance >= _amount, "Insufficient token balance");
        require(token.transfer(msg.sender, _amount), "Token transfer failed");
        emit TokenWithdrawn(_token, msg.sender, _amount);
    }

    function getTokenDetails(address _token) external view returns (TokenDetails memory) {
        require(tokenDetails[_token].supported, "Token not supported");
        return tokenDetails[_token];
    }

    function getTokenCreatedBy(address _creator) external view returns (TokenDetails[] memory) {
        uint count = 0;
        for (uint i = 0; i < allSupportedToken.length; i++) {
            if (tokenDetails[allSupportedToken[i]].creator == _creator) {
                count++;
            }
        }
        TokenDetails[] memory tokens = new TokenDetails[](count);
        uint index = 0;
        for (uint i = 0; i < allSupportedToken.length; i++) {
            if (tokenDetails[allSupportedToken[i]].creator == _creator) {
                tokens[index] = tokenDetails[allSupportedToken[i]];
                index++;
            }
        }
        return tokens;
    }

    function getAllTokens() external view returns (TokenDetails[] memory) {
        uint length = allSupportedToken.length;
        TokenDetails[] memory tokens = new TokenDetails[](length);
        for (uint i = 0; i < length; i++) {
            tokens[i] = tokenDetails[allSupportedToken[i]];
        }
        return tokens;
    }
}
