import { ethers } from "ethers";
import { POOL_ADDRESS, POOL_ABI } from "../constants";

export default async function getUserAccountData(
  provider: any,
  address: string
) {
  let contract = new ethers.Contract(POOL_ADDRESS, POOL_ABI, provider);

  let userAccountData = await contract
    .getUserAccountData(address)
    .catch((err: any) => {
      console.log(err);
    });

  return userAccountData;
}
