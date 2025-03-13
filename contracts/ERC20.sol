// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Token is ERC20 {
    constructor() ERC20("furry", "FRY") {
        _mint(msg.sender, 5000**18); //minting 1000 tokens to deployer address
    }
}