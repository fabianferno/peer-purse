import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccountAbstraction } from "@/store/accountAbstractionContext";
import Image from "next/image";
import Chat from "@/components/Chat";

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
            {parseFloat(data.healthFactor)}
          </span>
        </div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="-my-2  flex bg-zinc-900  px-5 py-2  text-sm leading-6">
          <div className="bg-zinc-700 m-1 w-full p-2 rounded-xl gap-x-4">
            <dt className="text-zinc-200">Total Collateral Base</dt>
            <dd className="text-zinc-900 text-3xl font-bold">
              <p>{JSON.stringify(parseFloat(data.totalCollateralETH))}</p>
            </dd>
          </div>
          <div className="bg-zinc-700 m-1 w-full p-2 rounded-xl gap-x-4">
            <dt className="text-zinc-200">Total Debt</dt>
            <dd className="text-zinc-900 text-3xl font-bold">
              <p>{JSON.stringify(parseFloat(data.totalDebtETH))}</p>
            </dd>
          </div>
          <div className="bg-zinc-700 m-1 w-full p-2 rounded-xl gap-x-4">
            <dt className="text-zinc-200">Available Borrows</dt>
            <dd className="text-zinc-900 text-3xl font-bold">
              <p>{JSON.stringify(parseFloat(data.availableBorrowsETH))}</p>
            </dd>
          </div>
          <div className="bg-zinc-700 m-1 w-full p-2 rounded-xl gap-x-4">
            <dt className="text-zinc-200">Current Liquidation Threshold</dt>
            <dd className="text-zinc-900 text-3xl font-bold">
              <p>
                {JSON.stringify(parseFloat(data.currentLiquidationThreshold))}
              </p>
            </dd>
          </div>
          <div className="bg-zinc-700 m-1 w-full p-2 rounded-xl gap-x-4">
            <dt className="text-zinc-200">Loan to Value</dt>
            <dd className="text-zinc-900 text-3xl font-bold">
              <p>{JSON.stringify(parseFloat(data.ltv))}</p>
            </dd>
          </div>
        </div>
      )}
    </div>
  );
}
export default function Lenders() {
  const router = useRouter();
  const { lender } = router.query;

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
          </>
        ) : (
          <div>Loading...</div>
        )}
      </main>
    </Layout>
  );
}
