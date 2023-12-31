import Layout from "../components/Layout";
import Image from "next/image";
import { shortAddress } from "@/utils/shortAddress";
import { useAccountAbstraction } from "@/store/accountAbstractionContext";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Link from "next/link";
import getAccounts from "@/utils/calls/getAccounts";
import getUserAccountData from "@/utils/calls/getUserAccountData";

function LenderCard({ address, index }: any) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>({});

  const { web3Provider } = useAccountAbstraction();

  useEffect(() => {
    (async () => {
      let provider: any = web3Provider;
      if (provider) {
        await getUserAccountData(provider, address).then((_data: any) => {
          console.log(_data);
          setData(_data);
          setLoading(false);
        });
      }
    })();
  }, [address, loading]);

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
            href={`lender/${address}`}
            className="border-t border-zinc-100 text-xs text-white font-bold px-3 p-2 rounded-md hover:bg-zinc-600"
          >
            View Lender
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
              <p>
                {" "}
                {JSON.stringify(
                  parseFloat(data.totalCollateralBase) * (10 ^ 8)
                )}{" "}
                DAI
              </p>
            </dd>
          </div>
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">Total Debt Base</dt>
            <dd className="text-gray-300">
              <p>
                {" "}
                {JSON.stringify(parseFloat(data.totalDebtBase) * (10 ^ 8))} DAI
              </p>
            </dd>
          </div>
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">Available Borrow Base</dt>
            <dd className="text-gray-300">
              <p>
                {JSON.stringify(
                  parseFloat(data.availableBorrowsBase) * (10 ^ 8)
                )}{" "}
                DAI
              </p>
            </dd>
          </div>
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">Liquidation Threshold</dt>
            <dd className="text-gray-300">
              <p>
                {JSON.stringify(
                  parseFloat(data.currentLiquidationThreshold) * (10 ^ 8)
                )}
                %
              </p>
            </dd>
          </div>
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">Loan to Value</dt>
            <dd className="text-gray-300">
              <p>{JSON.stringify(parseFloat(data.ltv) * (10 ^ 4))}%</p>
            </dd>
          </div>
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">Health Factor</dt>
            <dd className="flex items-start gap-x-2">
              <p>{JSON.stringify(parseFloat(data.ltv) * (10 ^ 8))}%</p>
            </dd>
          </div>
        </dl>
      )}
    </li>
  );
}

export default function Lenders() {
  const [lenders, setLenders] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { web3Provider, isAuthenticated } = useAccountAbstraction();

  useEffect(() => {
    (async () => {
      let provider: any = web3Provider;
      console.log("getting accouns");
      let accounts = await getAccounts(provider);
      console.log(accounts);
      setLenders(accounts);
      setLoading(false);
    })();
  }, []);

  return (
    <Layout>
      <main
        className={`min-h-screen flex-col items-center justify-between my-24 pt-10 px-24 mx-24`}
      >
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul
            role="list"
            className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
          >
            {lenders &&
              lenders.map((lender: any, index: number) => (
                <LenderCard key={index} address={lender} />
              ))}
          </ul>
        )}
      </main>
    </Layout>
  );
}
