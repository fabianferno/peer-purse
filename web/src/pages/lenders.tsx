import Layout from "../components/Layout";
import Chat from "@/components/Chat";
import LendersList from "@/components/LendersList";

export default function Lenders() {
  return (
    <Layout>
      <main
        className={`min-h-screen flex-col items-center justify-between my-24 pt-10 px-24 mx-24`}
      >
        <LendersList />
      </main>
    </Layout>
  );
}
