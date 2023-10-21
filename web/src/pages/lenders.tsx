import Layout from "../components/Layout";
import Chat from "@/components/Chat";

export default function Lenders() {
  return (
    <Layout>
      <main
        className={`w-full min-h-screen flex-col items-center justify-between mt-24 px-24`}
      >
        <div className="flex flex-col lg:flex-row justify-center items-start p-4">
          {/* Left Section */}

          {/* Right Section - Chat Room and Leaderboard */}
          <div className="lg:w-1/3 flex flex-col">
            {/* Chat Room */}

            <Chat />

            {/* <RelayerKitDemo /> */}
          </div>
        </div>
      </main>
    </Layout>
  );
}
