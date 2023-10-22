import { ethers } from "ethers";
import { WSTETH_TOKEN_ADDRESS, POOL_ABI, POOL_ADDRESS } from "../constants";

export default async function supply(
  provider: any,
  aaWallet: string,
  amount: any
) {
  let contract = new ethers.Contract(POOL_ADDRESS, POOL_ABI, provider);

  console.log("supplying: ", aaWallet, amount);

  let tx = await contract.supply(WSTETH_TOKEN_ADDRESS, amount, aaWallet, 0, {
    // gasLimit: 100000,
  });

  console.log(tx);

  return tx;
}
