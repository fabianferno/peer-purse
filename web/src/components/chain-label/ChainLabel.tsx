import { styled } from "@mui/material/styles";

import Chain from "../../model/chain";

type ChainLabelProps = {
  chain: Chain;
};

const ChainLabel = ({ chain }: ChainLabelProps) => {
  const { label, color } = chain;
  return <Label color={color}>{label}</Label>;
};

export default ChainLabel;

const Label = styled("span")(
  ({ theme, color }) => `
    border-radius: 4px;
    font-size: 12px;
    padding: 0px 12px; 
    background-color: ${color};
    color: ${theme.palette.getContrastText(color as string)};
    text-align: center;
    width: 100%;
    `
);
