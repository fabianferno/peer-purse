import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { useAccountAbstraction } from "@/store/accountAbstractionContext";
import Image from "next/image";
import registerAccount from "@/utils/calls/registerAccount";
import getUserAccountData from "@/utils/calls/getUserAccountData";
import approve from "@/utils/calls/approve";
import { useClient } from "@/hooks/useClient";
import supply from "@/utils/calls/supply";
import { shortAddress } from "@/utils/shortAddress";
import { parseEther, formatEther } from "viem";
import { Link } from "next/link";

function ApproveCard() {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { web3Provider } = useAccountAbstraction();
  const [txHash, setTxHash] = useState("");

  const handleApprove = async (e: any) => {
    console.log("Amount:", amount);
    setLoading(true);
    let provider: any = web3Provider;
    let signer = provider.getSigner();
    let tx = await approve(signer, String(parseEther(String(amount))));
    setTxHash(tx.hash);
    console.log(tx);
    setLoading(false);
    e.preventDefault();
  };

  return (
    <section>
      <div className="bg-zinc-800 shadow sm:rounded-lg mt-2 ">
        <div className="px-4 py-5 sm:p-6 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-semibold leading-4 text-gray-100">
              Approve wstETH to Peer Purse
            </h3>
            <div className="mt-3 text-md text-gray-500">
              <p>
                Set the amount you would like to approve to the protocol. Earn
                yield on your assets.
              </p>
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
                placeholder="Amt. in wstETH"
              />
            </div>
            <button
              onClick={handleApprove}
              className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto "
            >
              {loading
                ? "Loading..."
                : txHash
                ? `${shortAddress(txHash)}`
                : "Approve"}
            </button>
          </div>
          {txHash && (
            <Link
              className="text-sm"
              href={`https://goerli.etherscan.io/tx/${txHash}`}
            >
              View on Etherscan
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

function SupplyCard() {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { web3Provider } = useAccountAbstraction();
  const [txHash, setTxHash] = useState(null);

  const handleSupply = async (e: any) => {
    console.log("Amount:", amount);
    setLoading(true);
    let provider: any = web3Provider;
    let signer = provider.getSigner();
    let address = await signer.getAddress();
    try {
      let tx = await supply(signer, address, parseEther(String(amount)));
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
              Supply to Peer Purse
            </h3>
            <div className="mt-3 text-md text-gray-500">
              <p>
                Set the amount you would like to supply to the protocol. Earn
                yield on your assets.
              </p>
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
              onClick={handleSupply}
              className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto "
            >
              {loading
                ? "Loading..."
                : txHash
                ? `${shortAddress(txHash)}`
                : "Supply"}
            </button>

            {txHash && (
              <Link
                className="text-sm"
                href={`https://goerli.etherscan.io/tx/${txHash}`}
              >
                View on Etherscan
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function RegisterCard() {
  const [loading, setLoading] = useState(false);
  const [tx, setTx] = useState(null);
  const { web3Provider } = useAccountAbstraction();

  const handleRegister = async (e: any) => {
    setLoading(true);
    let provider: any = web3Provider;
    let signer = provider.getSigner();
    let address = await signer.getAddress();
    let tx = await registerAccount(signer, address);
    setTx(tx.hash);
    console.log(tx);
    setLoading(false);
    e.preventDefault();
  };

  return (
    <section>
      <div className="bg-zinc-800 shadow sm:rounded-lg mt-2">
        <div className="px-4 py-5 sm:p-6 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-semibold leading-4 text-gray-100">
              Good, you have collaterals, now register to Peer Purse
            </h3>
            <div className="mt-3 text-md text-gray-500">
              <p>Click to add yourself as a lender on the platform</p>
            </div>
          </div>
          <div className="mt-5 sm:flex sm:items-center">
            <button
              onClick={handleRegister}
              className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto  "
            >
              {loading ? "Loading..." : tx ? `${shortAddress(tx)}` : "Register"}
            </button>

            {tx && (
              <Link
                className="text-sm"
                href={`https://goerli.etherscan.io/tx/${tx}`}
              >
                View on Etherscan
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function EnableXMTP() {
  const client = useClient();
  const [isEnabled, setIsEnabled] = useState(false);
  const { ownerAddress } = useAccountAbstraction();

  useEffect(() => {
    (async () => {
      if (client) {
        let address: any = ownerAddress;
        let data = await client.canMessage(address);
        console.log("XMTP Enabled:", data);
        if (data) {
          setIsEnabled(true);
        } else {
          setIsEnabled(false);
        }
      }
    })();
  }, [client]);

  return (
    <section>
      <div className="bg-zinc-800 shadow sm:rounded-lg ">
        <div className="px-4 py-5 sm:p-6 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-semibold leading-4 text-gray-100">
              {isEnabled ? (
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="ml-2">You are enabled to send messages</div>
                </div>
              ) : (
                "Enable XMTP"
              )}
            </h3>
            <div className="mt-3 text-md text-gray-500">
              <p>We use XMTP to enable chat with your borrowers.</p>
            </div>
          </div>
          {!isEnabled && (
            <form className="mt-5 sm:flex sm:items-center">
              <button className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto  ">
                Enable
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Onboarding() {
  const [accountDataLoading, setaccountDataLoading] = useState(true);
  const [data, setData] = useState<any>({});
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const { web3Provider, ownerAddress } = useAccountAbstraction();

  useEffect(() => {
    (async () => {
      let provider: any = web3Provider;
      let address: any = ownerAddress;
      console.log(address);
      await getUserAccountData(provider, address).then(async (_data: any) => {
        console.log("Data:", _data);
        setData(_data);
        setAlreadyRegistered(false);
        // await getAccounts(provider).then((a: any) => {
        //   console.log("Accounts:", a);
        //   if (a.includes(address)) {
        //   }
        // });
        setaccountDataLoading(false);
      });
    })();
  }, [ownerAddress, web3Provider]);

  return (
    <Layout>
      <main
        className={`min-h-screen flex-col items-center justify-between mt-24 mx-12 px-24 my-24`}
      >
        <div className="my-2 ">
          <h1 className="h1 font-bold text-5xl pt-12 text-zinc-200">
            Dashboard
          </h1>
          <p className="mt-2 mb-12 text-3xl text-zinc-500">
            This is your account details from the spark protocol liquidity.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl">
          <div className="flex text-zinc-50 items-center justify-between gap-x-4 border-b border-gray-900/5 bg-zinc-800  p-6">
            <div className="flex items-center">
              <Image
                height={48}
                width={48}
                src={`https://api.dicebear.com/7.x/identicon/png`}
                alt="images"
                className="h-12 w-12 flex-none rounded-lg bg-zinc-800 object-cover ring-1 ring-gray-900/10"
              />
              <div className="ml-5 text-xl font-medium leading-6">
                {ownerAddress}
              </div>
            </div>
            <div>
              Health Factor:{" "}
              <span className="bg-zinc-700 p-2 rounded-xl">
                {parseFloat(data.healthFactor) * (10 ^ 8)} HF
              </span>
            </div>
          </div>
          {accountDataLoading ? (
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
                    {JSON.stringify(parseFloat(data.totalDebtBase) * (10 ^ 8))}{" "}
                    DAI
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

        <div className="flex flex-col gap-y-4 my-5">
          {!alreadyRegistered && (
            <div>
              <ApproveCard />
              <SupplyCard />
              <RegisterCard />
              {/* {parseFloat(data.totalCollateralBase) === 0 ? (
                <SupplyCard />
              ) : (
                <RegisterCard />
              )} */}
            </div>
          )}

          <EnableXMTP />
        </div>
      </main>
    </Layout>
  );
}
