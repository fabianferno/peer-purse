import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { Theme } from "@mui/material";
import LogoutIcon from "@mui/icons-material/LogoutRounded";

import AddressLabel from "../../components/address-label/AddressLabel";
import { useAccountAbstraction } from "../../store/accountAbstractionContext";

// TODO: rename this to connected owner?
function ConnectedWalletLabel() {
  const { isAuthenticated, ownerAddress, logoutWeb3Auth } =
    useAccountAbstraction();

  if (!isAuthenticated) {
    // TODO: ADD NO CONNECTED WALLET LABEL
    return null;
  }

  return (
    <div className="row flex items-center justify-between">
      <Stack direction="row" spacing={1.5}>
        <StyledImg
          src={"/assets/web3Auth_logo.png"}
          alt="connected Wallet logo"
          className="h-6 w-6"
        />

        <h2 className="text-sm">
          {ownerAddress && (
            <AddressLabel address={ownerAddress} showBlockExplorerLink />
          )}
          {/* logout button */}
          <Tooltip title="Logout">
            <span>
              <span className="text-zinc-500 text-xs">Logout</span>{" "}
              <LogoutIconButton onClick={logoutWeb3Auth}>
                <LogoutIcon fontSize="small" />
              </LogoutIconButton>
            </span>
          </Tooltip>
        </h2>
      </Stack>
    </div>
  );
}

export default ConnectedWalletLabel;

const StyledImg = styled("img")`
  border-radius: 50%;
`;

const LogoutIconButton = styled(IconButton)<{
  theme?: Theme;
}>(
  ({ theme }) => `
  border: 1px solid ${theme.palette.border.main};
`
);
