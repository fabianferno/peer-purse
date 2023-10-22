import Image from "next/image";
import Layout from "../components/Layout";
import OnRaaampKit from "../components/OnRampKit";

export default function Home() {
  return (
    <Layout>
      <main
        className={`flex min-h-screen flex-col items-center justify-between  `}
      >
        <div className="w-full m-24 p-24">
          <main>
            <OnRaaampKit />
          </main>
        </div>
      </main>
    </Layout>
  );
}
