// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import MyNFT from "../artifacts/contracts/NFT.sol/MyNFT.json";
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

async function main() {
  const MyNFTContract = await ethers.getContractFactory("MyNFT");
  const myNFTContract = await MyNFTContract.deploy();
  await myNFTContract.deployed();

  console.log("NFT deployed to:", myNFTContract.address);

  const [owner] = await ethers.getSigners();

  // console.log(owner)
  const contract = new ethers.Contract(myNFTContract.address, MyNFT.abi, owner);
  // console.log({ provider, signer, contract });
  await contract.mintNFT(owner.address, "http://example.com");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
