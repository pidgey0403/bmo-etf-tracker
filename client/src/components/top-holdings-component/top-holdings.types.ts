import { Holding } from "../../types/global.types";

export interface TopHoldingsProps {
    top5: Holding[];
}

export interface TopHoldingsTooltipProps {
    active?: boolean;
    payload?: { payload: Holding; value: number }[];
}