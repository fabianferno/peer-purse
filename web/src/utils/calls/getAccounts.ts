import { ethers } from "ethers";
import { PEER_PURSE_ADDRESS, PEER_PURSE_ABI } from "../constants";

export default async function getAccounts(provider: any) {
  let contract = new ethers.Contract(
    PEER_PURSE_ADDRESS,
    PEER_PURSE_ABI,
    provider
  );

  let accounts = await contract.getAllAccounts().catch((err: any) => {
    console.log(err);
  });
  console.log("Accounts:", accounts);
  return accounts;
}
