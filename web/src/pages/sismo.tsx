import { Dropdown } from "react-day-picker";
import Layout from "../components/Layout";
import TestDropdown from "../components/Dropdown";
import { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
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
    impersonate: ["github:leosayous21"],
  },
};

export default function SismoApp() {
  const { response, responseBytes } = useSismoConnect({ config });
  const options = ["animal", "bat", "carrot"];
  const [data, setData] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [groupId, setGroupId] = useState("0xda1c3726426d5639f4c6352c2c976b87");

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
      // const result = await client.query({ query });
      // setData(result.data);
      // console.log(result.data.groups);
    })();
  }, []);
  return (
    <Layout>
      <main
        className={`w-full min-h-screen flex-col items-center justify-between mt-24 px-24`}
      >
        <p>Click the dropdown to choose from a list of groupIds</p>
        {/* <TestDropdown
          options={data}
          onSelectGroupId={(gId) => {
            setGroupId(gId);
          }}
        /> */}

        <SismoConnectButton
          config={config}
          overrideStyle={{
            background: "#333333",
            height: 50,
            width: 160,
            color: "white",
            borderColor: "#333333",
            margin: 10,
          }}
          auth={{ authType: AuthType.VAULT }}
          text="Prove."
          claim={{ groupId }}
          signature={{ message: "Verifying proof to unlock funds" }}
          onResponse={async (response: SismoConnectResponse) => {
            console.log("Verifying proof");
            console.log(groupId);
            console.log(response);
            fetch("/api/verifyproof", {
              method: "POST",
              body: JSON.stringify({ groupId: groupId, response: response }),
            })
              .then((response) => response.json())
              .then((result) => {
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
      </main>
    </Layout>
  );
}
