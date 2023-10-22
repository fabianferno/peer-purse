import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import { useAccountAbstraction } from "@/store/accountAbstractionContext";
import getUserAccountData from "@/utils/calls/getUserAccountData";

import Image from "next/image";
import Chat from "@/components/Chat";
import SismoApp from "@/components/Sismo";
import borrow from "@/utils/calls/borrow";
import approveDelegation from "@/utils/calls/approveDelegation";
import { formatEther, parseEther } from "viem";
import { shortAddress } from "@/utils/shortAddress";
import { de } from "date-fns/locale";
import { parse } from "path";

function LenderCard({ address, index }: any) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>({});

  const { web3Provider } = useAccountAbstraction();

  useEffect(() => {
    (async () => {
      let provider: any = web3Provider;
      await getUserAccountData(provider, address).then((_data: any) => {
        setData(_data);
        setLoading(false);
      });
    })();
  }, [address, data, web3Provider]);

  return (
    <div className="overflow-hidden rounded-xl">
      <div className="flex text-zinc-50 items-center justify-between gap-x-4 border-b border-gray-900/5 bg-zinc-800  p-6">
        <div className="flex items-center">
          <Image
            height={48}
            width={48}
            src={`https://api.dicebear.com/7.x/identicon/png?seed=${index}`}
            alt="images"
            className="h-12 w-12 flex-none rounded-lg bg-zinc-800 object-cover ring-1 ring-gray-900/10"
          />
          <div className="ml-5 text-xl font-medium leading-6">{address}</div>
        </div>
        <div>
          Health Factor:{" "}
          <span className="bg-zinc-700 p-2 rounded-xl">
            {parseFloat(data.healthFactor) * (10 ^ 18)} HF
          </span>
        </div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="-my-2  flex bg-zinc-900 px-2 py-2  text-sm leading-6">
          <div className="bg-zinc-700 m-1 w-full p-2 rounded-xl gap-x-4 flex flex-col justify-between">
            <dt className="text-zinc-200">Total Collateral Base</dt>
            <dd className="text-white text-2xl font-bold">
              <p>
                {JSON.stringify(
                  parseFloat(data.totalCollateralBase) * (10 ^ 8)
                )}{" "}
                DAI
              </p>
            </dd>
          </div>
          <div className="bg-zinc-700 m-1 w-full p-2 rounded-xl gap-x-4 flex flex-col justify-between">
            <dt className="text-zinc-200">Total Debt</dt>
            <dd className="text-white text-2xl font-bold">
              <p>
                {JSON.stringify(parseFloat(data.totalDebtBase) * (10 ^ 8))} DAI
              </p>
            </dd>
          </div>
          <div className="bg-zinc-700 m-1 w-full p-2 rounded-xl gap-x-4 flex flex-col justify-between">
            <dt className="text-zinc-200">Available Borrows</dt>
            <dd className="text-white text-2xl font-bold">
              <p>
                {JSON.stringify(
                  parseFloat(data.availableBorrowsBase) * (10 ^ 8)
                )}{" "}
                DAI
              </p>
            </dd>
          </div>
          <div className="bg-zinc-700 m-1 w-full p-2 rounded-xl gap-x-4 flex flex-col justify-between">
            <dt className="text-zinc-200">Current Liquidation Threshold</dt>
            <dd className="text-white text-2xl font-bold">
              <p>
                {JSON.stringify(
                  parseFloat(data.currentLiquidationThreshold) * (10 ^ 8)
                )}
                %
              </p>
            </dd>
          </div>
          <div className="bg-zinc-700 m-1 w-full p-2 rounded-xl gap-x-4 flex flex-col justify-between">
            <dt className="text-zinc-200">Loan to Value</dt>
            <dd className="text-white text-2xl font-bold">
              <p>{JSON.stringify(parseFloat(data.ltv) * (10 ^ 4))}%</p>
            </dd>
          </div>
        </div>
      )}
    </div>
  );
}

function ApproveDelegation() {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { web3Provider } = useAccountAbstraction();
  const [txHash, setTxHash] = useState(null);
  const [address, setAddress] = useState(formatEther(parseEther("0x0")));

  const handle = async (e: any) => {
    console.log("Amount:", amount);
    setLoading(true);
    let provider: any = web3Provider;
    let signer = provider.getSigner();
    try {
      let tx: any = await approveDelegation(
        signer,
        address,
        parseEther(String(amount))
      );
      console.log(tx);
      setTxHash(tx.hash);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
    e.preventDefault();
  };

  return (
    <section>
      <div className="bg-zinc-800 shadow sm:rounded-lg mt-2">
        <div className="px-4 py-5 sm:p-6 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-semibold leading-4 text-gray-100">
              Lend to borrower
            </h3>
            <div className="mt-3 text-md text-gray-500">
              <p>Set the amount you would like to lend to the borrower.</p>
            </div>
          </div>
          <div className="mt-5 sm:flex sm:items-center">
            <div className=" ">
              <label htmlFor="email" className="sr-only">
                Amount
              </label>
              <input
                type="number"
                name="number"
                id="number"
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg"
                placeholder="Amt. in DAI"
              />
            </div>
            <div className=" ">
              <label htmlFor="email" className="sr-only">
                Delegatee&apos;s address
              </label>
              <input
                type="text"
                name="text"
                id="text"
                onChange={(e) => setAddress(e.target.value)}
                className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg"
                placeholder="Delegatee"
              />
            </div>
            <button
              onClick={handle}
              className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto "
            >
              {loading
                ? "Loading..."
                : txHash
                ? `${shortAddress(txHash)}`
                : "Lend"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Borrow({ delegator }: any) {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { web3Provider } = useAccountAbstraction();
  const [txHash, setTxHash] = useState(null);

  const handle = async (e: any) => {
    console.log("Amount:", amount);
    setLoading(true);
    let provider: any = web3Provider;
    let signer = provider.getSigner();
    let address = await signer.getAddress();
    try {
      let tx: any = await borrow(
        signer,
        delegator,
        address,
        parseEther(String(amount))
      );
      setTxHash(tx.hash);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
    e.preventDefault();
  };

  return (
    <section>
      <div className="bg-zinc-800 shadow sm:rounded-lg mt-2">
        <div className="px-4 py-5 sm:p-6 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-semibold leading-4 text-gray-100">
              Borrow from lender
            </h3>
            <div className="mt-3 text-md text-gray-500">
              <p>Set the amount you would like to borrow to the borrower.</p>
            </div>
          </div>
          <div className="mt-5 sm:flex sm:items-center">
            <div className=" ">
              <label htmlFor="email" className="sr-only">
                Amount
              </label>
              <input
                type="number"
                name="number"
                id="number"
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg"
                placeholder="Amt. in DAI"
              />
            </div>
            <button
              onClick={handle}
              className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto "
            >
              {loading
                ? "Loading..."
                : txHash
                ? `${shortAddress(txHash)}`
                : "Borrow"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Lenders() {
  const router = useRouter();
  const { lender } = router.query;
  const { ownerAddress } = useAccountAbstraction();

  useEffect(() => {
    console.log("lender", lender);
  }, [lender, router]);

  return (
    <Layout>
      <main
        className={`min-h-screen flex-col items-center justify-between my-24 pt-10 px-24 mx-24`}
      >
        {lender ? (
          <>
            <LenderCard address={lender} index={0} />
            <div className="mt-6">
              <h3 className="text-2xl font-bold">Chat with the Lender</h3>{" "}
              <p className="text-zinc-400">powered by XMTP</p>
            </div>
            <Chat address={lender} />
            <div className="mt-6">
              <h3 className="text-2xl font-bold">Send Proofs</h3>{" "}
              <p className="text-zinc-400">powered by Sismo</p>
            </div>
            <SismoApp />

            {lender != ownerAddress ? <Borrow /> : <ApproveDelegation />}
          </>
        ) : (
          <div>Loading...</div>
        )}
      </main>
    </Layout>
  );
}
