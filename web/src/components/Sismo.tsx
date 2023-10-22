import { Dropdown } from "react-day-picker";
import Layout from "./Layout";
import DropDown from "./Dropdown";
import { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useClient } from "@/hooks/useClient";
import { sendMessage } from "../model/messages";
import { ContentTypeText } from "@xmtp/xmtp-js";

import {
  SismoConnect,
  SismoConnectButton,
  AuthType,
  SismoConnectConfig,
  SismoConnectResponse,
  useSismoConnect,
} from "@sismo-core/sismo-connect-react";
import { ConstructionIcon } from "lucide-react";

const config: SismoConnectConfig = {
  appId: "0x440e420e700a9ea11ec789cc06ad9aaf",
  vault: {
    impersonate: [
      "github:leosayous21",
      "0x28C6c06298d514Db089934071355E5743bf21d60", // Binance
    ],
  },
};

export default function SismoApp() {
  const { response, responseBytes } = useSismoConnect({ config });
  const options = ["animal", "bat", "carrot"];
  const [data, setData] = useState<any>([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [group, setGroup] = useState<any>({});
  const xmtpClient: any = useClient();

  const client = new ApolloClient({
    uri: "https://api.sismo.io",
    cache: new InMemoryCache(),
  });
  const query = gql`
    query {
      groups {
        id
        description
        name
      }
    }
  `;

  useEffect(() => {
    (async function () {
      const result = await client.query({ query });
      setData(result.data);
      setGroup(result.data.groups[0]);
      console.log("Data groups: ", result.data.groups);
    })();
  }, []);

  return (
    <main
      className={`w-full min-h-screen flex-col items-center justify-between`}
    >
      <div className="flex justify-between items-center pt-5">
        <div className="bg-zinc-800 p-3 py-5 mb-5 w-full rounded-3xl ">
          <p className="text-sm text-zinc-400">
            You have selected to prove this group
          </p>
          <h4 className="font-bold text-3xl">{group.name}</h4>
          <p className="mt-3 text-zinc-400">{group.description}</p>
        </div>

        <div className="bg-zinc-800 h-auto p-3 py-8 mb-5 w-50 rounded-3xl ml-5">
          <SismoConnectButton
            config={config}
            overrideStyle={{
              background: "#27272a",
              height: 50,
              width: 160,
              color: "white",
              borderColor: "#27272a",
              margin: 10,
            }}
            auth={{ authType: AuthType.VAULT }}
            text="Prove."
            claim={{ groupId: group?.id }}
            signature={{ message: "Verifying proof to unlock funds" }}
            onResponse={async (response: SismoConnectResponse) => {
              console.log("Verifying proof");
              console.log(group?.id);
              console.log(response);
              fetch("/api/verifyproof", {
                method: "POST",
                body: JSON.stringify({
                  groupId: group?.id,
                  response: response,
                }),
              })
                .then((response) => {
                  console.log(response);
                  let conversationString: any =
                    localStorage.getItem("conversation");
                  let conversation = JSON.parse(conversationString);
                  sendMessage(
                    xmtpClient,
                    conversation,
                    JSON.stringify(response),
                    ContentTypeText
                  );
                })
                .then((result: any) => {
                  if (result.error) {
                    console.log("ERROR");
                    console.log(result.message);
                    setError(result.errors);
                  } else {
                    console.log("SUCCESS");
                    console.log(result);
                    setResult(result);
                  }
                })
                .catch((err) => {
                  setError("Error calling the API");
                });
            }}
            onResponseBytes={async (bytes: string) => {}}
          />
        </div>
      </div>

      <div className="px-2">
        <p>Click the dropdown to choose from a list of groupIds</p>
        {data?.groups && (
          <DropDown
            options={data?.groups}
            onSelectGroup={(group: any) => {
              setGroup(group);
            }}
          />
        )}
      </div>
    </main>
  );
}
