import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccountAbstraction } from "@/store/accountAbstractionContext";
import Image from "next/image";
import supplyAndRegisterAccount from "@/utils/calls/supplyAndRegisterAccount";
import registerAccount from "@/utils/calls/registerAccount";

function SupplyAndRegisterCard() {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { web3Provider } = useAccountAbstraction();

  const handleSupplyAndRegister = async (e: any) => {
    console.log("Amount:", amount);
    setLoading(true);
    let provider: any = web3Provider;
    let signer = provider.getSigner();
    let address = await signer.getAddress();
    let signature: any = [];
    let data = await supplyAndRegisterAccount(
      provider,
      address,
      String(amount),
      signature
    );
    console.log(data);
    setLoading(false);
    e.preventDefault();
  };

  return (
    <section>
      <div className="bg-zinc-800 shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-semibold leading-4 text-gray-100">
              Supply and Register to Peer Purse
            </h3>
            <div className="mt-3 text-md text-gray-500">
              <p>
                Set the amount you would like to supply to the protocol. Earn
                yield on your assets.
              </p>
            </div>
          </div>
          <form className="mt-5 sm:flex sm:items-center">
            <div className=" ">
              <label htmlFor="email" className="sr-only">
                Amount
              </label>
              <input
                type="number"
                name="number"
                id="number"
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg"
                placeholder="100 DAI"
              />
            </div>
            <button
              onClick={handleSupplyAndRegister}
              className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto "
            >
              {loading ? "Loading..." : "Supply & Register"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function RegisterCard() {
  const [loading, setLoading] = useState(false);
  const { web3Provider } = useAccountAbstraction();

  const handleRegister = async (e: any) => {
    setLoading(true);
    let provider: any = web3Provider;
    let signer = provider.getSigner();
    let address = await signer.getAddress();
    let data = await registerAccount(provider, address);
    console.log(data);
    setLoading(false);
    e.preventDefault();
  };

  return (
    <section>
      <div className="bg-zinc-800 shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-semibold leading-4 text-gray-100">
              Good, you have collaterals, register to Peer Purse
            </h3>
            <div className="mt-3 text-md text-gray-500">
              <p>Click to add yourself as a lender on the platform</p>
            </div>
          </div>
          <form className="mt-5 sm:flex sm:items-center">
            <button
              onClick={handleRegister}
              className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto  "
            >
              {loading ? "Loading..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function Onboarding() {
  const [accountDataLoading, setaccountDataLoading] = useState(true);
  const [data, setData] = useState<any>({});
  const { web3Provider, ownerAddress } = useAccountAbstraction();

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
      await pool.getUserAccountData(ownerAddress).then((data: any) => {
        setData(data);
        setaccountDataLoading(false);
      });
    })();
  }, [ownerAddress, data, web3Provider]);

  return (
    <Layout>
      <main
        className={`min-h-screen flex-col items-center justify-between mt-24 mx-12 px-24`}
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
                {parseFloat(data.healthFactor)}
              </span>
            </div>
          </div>
          {accountDataLoading ? (
            <div>accountDataLoading...</div>
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
                    {JSON.stringify(
                      parseFloat(data.currentLiquidationThreshold)
                    )}
                  </p>
                </dd>
              </div>
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Loan to Value</dt>
                <dd className="text-gray-300">
                  <p>{JSON.stringify(parseFloat(data.ltv))}</p>
                </dd>
              </div>
            </dl>
          )}
        </div>

        <div className="flex flex-col gap-y-4 my-5">
          {parseFloat(data.totalCollateralETH) === 0 ? (
            <SupplyAndRegisterCard />
          ) : (
            <RegisterCard />
          )}
        </div>
      </main>
    </Layout>
  );
}