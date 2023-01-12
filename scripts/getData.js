
const Web3 = require("web3");
//import * as Factory from "./FactoryNearProver.js";



//set provider with quick node
const provider =
  "https://withered-serene-breeze.discover.quiknode.pro/0dfc4cc7d1abf3ae7b12b83c1e12ae1ded57b9ab/";


const addressContract = "0x868964B90589D1695C08CD54dCD44092929662F9";

async function main() {
  var web3Provider = new Web3.providers.HttpProvider(provider);
  var web3 = new Web3(web3Provider);
  //slot replaceDuration is 5
  for(i=98;i<140; i++){
    let data = await web3.eth.getStorageAt(addressContract, i);
    console.log(data,i);
  }
} 
main()
