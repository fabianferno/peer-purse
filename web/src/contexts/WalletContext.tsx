import { PropsWithChildren, ReactElement, useEffect, useState } from "react";
import { useSetClient } from "../hooks/useClient";
import { Client } from "@xmtp/xmtp-js";
import { useAccountAbstraction } from "@/store/accountAbstractionContext";

function WalletSetter({
  setWaitingForSignatures,
  children,
}: PropsWithChildren<{
  setWaitingForSignatures: (state: boolean) => void;
}>): ReactElement {
  const { web3Provider, logoutWeb3Auth, chainId } = useAccountAbstraction();
  const [signer, setSigner] = useState<any>(null);
  const setClient = useSetClient();

  useEffect(() => {
    let provider: any = web3Provider;
    if (provider) {
      let safeSigner: any = provider.getSigner();
      setSigner(safeSigner);
      if (signer) {
        setWaitingForSignatures(true);
        (async () => {
          try {
            const client = await Client.create(signer, {
              env: "dev",
              // env: "production",
            });

            setClient(client);
            setWaitingForSignatures(false);
          } catch {
            // logoutWeb3Auth();
            setWaitingForSignatures(false);
          }
        })();
      }
    }
  }, [!!signer, web3Provider, chainId]);

  return <>{children}</>;
}

export default function WalletContext({
  children,
}: PropsWithChildren<unknown>): ReactElement {
  const [waitingForSignatures, setWaitingForSignatures] = useState(false);

  return (
    <WalletSetter setWaitingForSignatures={setWaitingForSignatures}>
      {waitingForSignatures ? (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12">
          <div className="mx-auto max-w-3xl"></div>
          <div className="bg-zinc-800 shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-4xl mb-4 font-semibold leading-6 text-white">
                Waiting for signatures…
              </h3>
              <p>
                Sign the messages you&apos;ve been prompted with in your wallet
                app to sign in to XMTP.
              </p>
            </div>
          </div>
        </div>
      ) : (
        children
      )}
    </WalletSetter>
  );
}
