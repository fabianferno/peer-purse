import { ReactElement, useState } from "react";
import ConversationListView from "./ConversationListView";
import { useClient, useSetClient } from "../hooks/useClient";
import Link from "next/link";
import { useDisconnect } from "wagmi";

export default function HomeView(): ReactElement {
  const client = useClient()!;
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(client.address);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  const { disconnectAsync } = useDisconnect();
  const setClient = useSetClient();
  async function logout() {
    await disconnectAsync();
    indexedDB.deleteDatabase("DB");
    localStorage.removeItem("_insecurePrivateKey");
    setClient(null);
  }

  return (
    <div className="px-2 pt-14">
      <small className="flex justify-between">
        <span>Here are your conversations:</span>
        <Link href="new" className="text-blue-700">
          Make a new one
        </Link>
      </small>
      <ConversationListView />
    </div>
  );
}
