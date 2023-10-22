import Image from "next/image";
import { shortAddress } from "@/utils/shortAddress";
import { useAccountAbstraction } from "@/store/accountAbstractionContext";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Link from "next/link";

const lenders = [
  "0x64574dDbe98813b23364704e0B00E2e71fC5aD17",
  "0x64574dDbe98813b23364704e0B00E2e71fC5aD17",
  "0x64574dDbe98813b23364704e0B00E2e71fC5aD17",
  "0x64574dDbe98813b23364704e0B00E2e71fC5aD17",
  "0x64574dDbe98813b23364704e0B00E2e71fC5aD17",
  "0x64574dDbe98813b23364704e0B00E2e71fC5aD17",
  "0x64574dDbe98813b23364704e0B00E2e71fC5aD17",
  "0x64574dDbe98813b23364704e0B00E2e71fC5aD17",
];

function LenderCard({ address, index }: any) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>({});

  const { web3Provider } = useAccountAbstraction();

  useEffect(() => {
    (async () => {
      let provider: any = web3Provider;
      let pool = new ethers.Contract(
        "0xe7ea57b22d5f496bf9ca50a7830547b704ecb91f",
        [
          "function getUserAccountData(address) view returns (uint256 totalCollateralETH, uint256 totalDebtETH, uint256 availableBorrowsETH, uint256 currentLiquidationThreshold, uint256 ltv, uint256 healthFactor)",
        ],
        provider
      );
      await pool.getUserAccountData(address).then((data: any) => {
        setData(data);
        setLoading(false);
      });
    })();
  }, [address, data, web3Provider]);

  return (
    <li className="overflow-hidden rounded-xl shadow-indigo-500 hover:shadow-xl hover:shadow-[#454545aa] transition-shadow duration-200 ease-in-out">
      <div className="flex text-zinc-50 items-center gap-x-4 border-b border-gray-900/5 bg-zinc-800  p-6">
        <Image
          height={48}
          width={48}
          src={`https://api.dicebear.com/7.x/identicon/png?seed=${index}`}
          alt="images"
          className="h-12 w-12 flex-none rounded-lg bg-zinc-800 object-cover ring-1 ring-gray-900/10"
        />
        <div className="text-sm font-medium leading-6">
          {shortAddress(address)}
        </div>
        <div className="relative ml-auto">
          <Link
            href={`lender?lender=${address}`}
            className="border-t border-zinc-100 text-xs text-white font-bold px-3 p-2 rounded-md hover:bg-zinc-600"
          >
            Borrow
          </Link>
        </div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <dl className="-my-2 divide-y bg-zinc-900 divide-zinc-700 px-5 py-2  text-sm leading-6">
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">Total Collateral Base</dt>
            <dd className="text-gray-300">
              <p>{JSON.stringify(parseFloat(data.totalCollateralETH))}</p>
            </dd>
          </div>
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">Total Debt Base</dt>
            <dd className="text-gray-300">
              <p>{JSON.stringify(parseFloat(data.totalDebtETH))}</p>
            </dd>
          </div>
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">Available Borrow Base</dt>
            <dd className="text-gray-300">
              <p>{JSON.stringify(parseFloat(data.availableBorrowsETH))}</p>
            </dd>
          </div>
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">Liquidation Threshold</dt>
            <dd className="text-gray-300">
              <p>
                {JSON.stringify(parseFloat(data.currentLiquidationThreshold))}
              </p>
            </dd>
          </div>
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">Loan to Value</dt>
            <dd className="text-gray-300">
              <p>{JSON.stringify(parseFloat(data.ltv))}</p>
            </dd>
          </div>
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">Health Factor</dt>
            <dd className="flex items-start gap-x-2">
              <p>{parseFloat(data.healthFactor)}</p>
            </dd>
          </div>
        </dl>
      )}
    </li>
  );
}

export default function LendersList() {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
    >
      {lenders.map((lender, index) => (
        <LenderCard key={index} address={lender} />
      ))}
    </ul>
  );
}
