# Attack to smart contract 

The cross-chain staking protocol interacts with the bridge, which is a part of the cross-chain staking process. All funds for cross-chain staking are transferred and stored in the bridge. However, if an attacker were to destroy the bridge smart contract, all funds would be locked and the cross-chain staking would not function correctly. When the deposit function from staking is called, all transferred tokens will be locked, and cross-chain staking contract not work correctly.
The bridge uses a proxy and logic contract, but the logic contract has not been initialized. As a result, an attacker could call the initialize function, becoming the owner of the bridge logic contract. The attacker could then set the parameters in the bridgerouter.

In the bridge, there is a factoryPeggedBond function, which uses delegatecall to set the _bridgerouter parameter. In the bridgerouter, the attacker could set a "selfdestruct". If the attacker then calls the factoryPeggedBond function, the logic contract of the bridge will be destroyed.
This bug in Ethereum and  polygon 
logic bridge on ethereum: 0x868964B90589D1695C08CD54dCD44092929662F9
staking contract: 0xad0dCC6635a5c38be6B87007210797Ad94AdB4B7


```shell
npm init and install package
Run "npx hardhat test test/Attack.js"
 ```