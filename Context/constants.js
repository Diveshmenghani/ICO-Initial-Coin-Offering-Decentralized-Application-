import { ethers } from "ethers";
import Web3Modal from "web3modal";

import ERC20Generator from "./ERC20Generator.json";
import icoMarketplace from "./icoMarketplace.json";

export const ERC20Generator_ABI = ERC20Generator.abi;
export const ERC20Generator_BYTECODE = ERC20Generator.bytecode;

export const ICO_MARKETPLACE_ADDRESS = process.env.NEXT_PUBLIC_ICO_MARKETPLACE_ADDRESS;
export const ICO_MARKETPLACE_ABI = icoMarketplace.abi;

// Pinata keys
export const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
export const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY;

// Sepolia Test Network Configuration
const SEPOLIA_NETWORK = {
  chainId: `0x${Number(11155111).toString(16)}`,
  chainName: 'Sepolia Test Network',
  nativeCurrency: {
    name: 'SepoliaETH',
    symbol: 'SETH',
    decimals: 18,
  },
  rpcUrls: ["https://rpc.ankr.com/eth_sepolia"],
  blockExplorerUrls: ['https://sepolia.etherscan.io'],
};

export const shortenAddress = (address) => `${address?.slice(0, 5)}...${address?.slice(-4)}`;

// Contract interaction
const fetchContract = (address, abi, signer) => {
  return new ethers.Contract(address, abi, signer);
};

export const ICO_MARKETPLACE_CONTRACT = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(ICO_MARKETPLACE_ADDRESS, ICO_MARKETPLACE_ABI, signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

export const Token_Contract = async (TOKEN_ADDRESS) => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(TOKEN_ADDRESS, ERC20Generator_ABI, signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};
