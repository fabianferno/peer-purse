import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import ChainLabel from "../../components/chain-label/ChainLabel";
import chains from "../../chains/chains";
import { useAccountAbstraction } from "../../store/accountAbstractionContext";

const ChainSelector = () => {
  const { chain, setChainId } = useAccountAbstraction();

  return (
    <div>
      <FormControl className="rounded-3xl">
        <Select
          aria-label="chain selector"
          id="switch-chain-selector"
          value={chain?.id}
          onChange={(event: SelectChangeEvent) =>
            setChainId(event.target.value as string)
          }
        >
          {chains.map((chain, index) => (
            <MenuItem
              key={index}
              value={chain.id}
              onClick={() => setChainId(chain.id)}
            >
              <div className="flex items-center justify-center">
                <ChainLabel chain={chain} />
              </div>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default ChainSelector;
