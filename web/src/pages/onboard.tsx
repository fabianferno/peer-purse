import Layout from "../components/Layout";
import Chat from "@/components/Chat";

export default function Onboarding() {
  return (
    <Layout>
      <main
        className={`w-full min-h-screen flex-col items-center justify-between mt-24 px-24`}
      >
        <div className="flex flex-col lg:flex-row justify-center items-start p-4">
          {/* Left Section */}

          {/* Right Section - Chat Room and Leaderboard */}
          <div className=" flex flex-col">
            {/* Chat Room */}

            <h1 className="font-bold text-3xl">Register as lender</h1>
            {/* Form to register using an address /> */}
            <div className="flex flex-col mt-5">
              <label className="font-bold text-xl">Your address</label>
              <input className="border border-gray-400 rounded-lg p-2" />
              <button className="p-3 bg-emerald-700 rounded-xl mt-5">
                Register
              </button>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
