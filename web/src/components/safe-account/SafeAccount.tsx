import SafeInfo from "../../components/safe-info/SafeInfo";
import { BoxProps } from "@mui/material/Box";

import { ConnectedContainer } from "../../components/styles";
import { useAccountAbstraction } from "../../store/accountAbstractionContext";

function SafeAccount(props: BoxProps) {
  const { safeSelected, chainId } = useAccountAbstraction();

  return (
    <ConnectedContainer {...props}>
      <h2 className="font-bold">Safe Account</h2>

      <p className="text-sm mb-5">
        Your Safe account (Smart Contract) holds and protects your assets.
      </p>

      {/* Safe Info */}
      {safeSelected && (
        <SafeInfo safeAddress={safeSelected} chainId={chainId} />
      )}
    </ConnectedContainer>
  );
}

export default SafeAccount;
