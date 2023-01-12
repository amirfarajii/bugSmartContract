# Attack to smart contract 

This bug is logic contract on bridge not initialized and anybody can initialize that and because on logic contract use delegatecall owner can use slefdestruct function
therefor all funds lock on contract


```shell
npm init and install package
Run "npx hardhat test test/Attack.js"
 ```