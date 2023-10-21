import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import SendIcon from "@mui/icons-material/SendRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { utils } from "ethers";
import { useState } from "react";

import AddressLabel from "../components/address-label/AddressLabel";
import AuthenticateMessage from "../components/authenticate-message/AuthenticateMessage";
import GelatoTaskStatusLabel from "../components/gelato-task-status-label/GelatoTaskStatusLabel";
import SafeAccount from "../components/safe-account/SafeAccount";
import { useAccountAbstraction } from "../store/accountAbstractionContext";
import { GELATO_SNIPPET } from "../utils/snippets";

const transferAmount = 0.01;

const RelayerKitDemo = () => {
  const {
    chainId,
    chain,

    safeSelected,
    safeBalance,

    isRelayerLoading,
    relayTransaction,
    gelatoTaskId,

    isAuthenticated,
    loginWeb3Auth,
  } = useAccountAbstraction();

  const [transactionHash, setTransactionHash] = useState<string>("");

  // TODO: ADD PAY FEES USING USDC TOKEN

  const hasNativeFunds =
    !!safeBalance &&
    Number(utils.formatEther(safeBalance || "0")) > transferAmount;

  return (
    <>
      {!isAuthenticated ? (
        <AuthenticateMessage
          message="To use the Relay Kit you need to be authenticated"
          onConnect={loginWeb3Auth}
        />
      ) : (
        <Box display="flex" gap={3}>
          {/* Relay Transaction */}
          <div className="flex col items-start gap-2">
            <Typography fontWeight="700">Relayed transaction</Typography>

            {/* Gelato status label */}
            {gelatoTaskId && (
              <GelatoTaskStatusLabel
                gelatoTaskId={gelatoTaskId}
                chainId={chainId}
                setTransactionHash={setTransactionHash}
                transactionHash={transactionHash}
              />
            )}

            {isRelayerLoading && (
              <LinearProgress sx={{ alignSelf: "stretch" }} />
            )}

            {!isRelayerLoading && !gelatoTaskId && (
              <>
                <Typography fontSize="14px">
                  Check the status of your relayed transaction.
                </Typography>

                {/* send fake transaction to Gelato relayer */}
                <Button
                  startIcon={<SendIcon />}
                  variant="contained"
                  disabled={!hasNativeFunds}
                  onClick={relayTransaction}
                >
                  Send Transaction
                </Button>

                {!hasNativeFunds && (
                  <Typography color="error">
                    Insufficient funds. Send some funds to the Safe Account
                  </Typography>
                )}

                {!hasNativeFunds && chain?.faucetUrl && (
                  <Link href={chain.faucetUrl} target="_blank">
                    Request 0.5 {chain.token}.
                  </Link>
                )}
              </>
            )}

            {/* Transaction details */}
            <Stack gap={0.5} display="flex" flexDirection="column">
              <Typography>
                Transfer {transferAmount} {chain?.token}
              </Typography>

              {safeSelected && (
                <Stack gap={0.5} display="flex" flexDirection="row">
                  <AddressLabel
                    address={safeSelected}
                    showCopyIntoClipboardButton={false}
                  />

                  <ArrowRightAltRoundedIcon />

                  <AddressLabel
                    address={safeSelected}
                    showCopyIntoClipboardButton={false}
                  />
                </Stack>
              )}
            </Stack>
          </div>
        </Box>
      )}
    </>
  );
};

export default RelayerKitDemo;
