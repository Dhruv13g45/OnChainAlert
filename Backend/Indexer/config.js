import { ethers } from "ethers";


export const RPC_URL = "https://polygon-amoy.gateway.tenderly.co";


export const provider = new ethers.JsonRpcProvider(
  RPC_URL,
  {
    name: "polygon-amoy",
    chainId: 80002
  },
  { staticNetwork: true }
);


export const TOKEN_ADDRESS = "0x0000000000000000000000000000000000001010";


export const ABI = [
  "event Transfer(address indexed from, address indexed to, uint256 value)"
];
