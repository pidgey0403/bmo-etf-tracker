import { fmt } from "../../utils/formatters";
import { ChartTooltipProps } from "./chart-tooltip.types";

export function ChartToolTipComponent({ active, payload }: ChartTooltipProps) {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-bmo-dark rounded-lg px-4 py-2.5 shadow-tooltip border-none">
            <div className="text-base font-semibold text-black font-mono">
                {fmt.format(payload[0].value)}
            </div>
        </div>
    );
}